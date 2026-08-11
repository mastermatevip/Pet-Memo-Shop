"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogCategory, BlogPost, FAQ } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { slugifyBlogTitle } from "@/lib/cms/blog-defaults";

interface Props {
  initial: BlogPost;
  categories: BlogCategory[];
  isNew?: boolean;
}

function faqsToText(faqs: FAQ[]) {
  return faqs.map((f) => `${f.question}|||${f.answer}`).join("\n");
}

function textToFaqs(text: string): FAQ[] {
  const faqs: FAQ[] = [];
  for (const line of text.split("\n")) {
    const idx = line.indexOf("|||");
    if (idx === -1) continue;
    const question = line.slice(0, idx).trim();
    const answer = line.slice(idx + 3).trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

export function BlogPostEditor({ initial, categories, isNew = false }: Props) {
  const router = useRouter();
  const [post, setPost] = useState(initial);
  const [originalSlug, setOriginalSlug] = useState(initial.slug);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    setPost(initial);
    setOriginalSlug(initial.slug);
    setSlugTouched(false);
  }, [initial, isNew]);

  function setField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((p) => ({ ...p, [key]: value }));
  }

  function setCategorySlug(categorySlug: string) {
    const category = categories.find((c) => c.slug === categorySlug);
    setPost((p) => ({
      ...p,
      categorySlug,
      category: category?.name ?? p.category,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const slug = slugifyBlogTitle(post.slug || post.title);
    if (!slug) {
      setErrorMessage("请填写文章 Slug");
      setStatus("error");
      return;
    }
    if (!post.title.trim()) {
      setErrorMessage("请填写文章标题");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setErrorMessage(undefined);

    const payload: BlogPost = { ...post, slug };

    const url = isNew
      ? "/api/admin/blog"
      : `/api/admin/blog/${encodeURIComponent(originalSlug)}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(
        data?.error === "Slug already exists"
          ? "该 Slug 已存在，请换一个"
          : data?.error || "保存失败"
      );
      setStatus("error");
      return;
    }

    const data = (await res.json()) as { post?: BlogPost };
    const saved = data.post ?? payload;
    setPost(saved);
    setOriginalSlug(saved.slug);
    setStatus("saved");

    if (isNew || saved.slug !== originalSlug) {
      router.replace(`/admin/blog/${saved.slug}`);
    } else {
      router.refresh();
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  async function handleDelete() {
    if (isNew) return;
    if (!window.confirm(`确定删除文章「${post.title}」？此操作不可恢复。`)) return;

    setStatus("saving");
    setErrorMessage(undefined);
    const res = await fetch(`/api/admin/blog/${encodeURIComponent(originalSlug)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setErrorMessage("删除失败");
      setStatus("error");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted space-y-3">
        {isNew ? <p>新建文章：填写标题与内容后保存。默认为草稿，发布后前台可见。</p> : null}
        <AdminField
          label="文章 URL Slug"
          hint="英文小写，用连字符分隔。修改后前台链接会同步更新。"
        >
          <input
            className={adminInputClass}
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setField("slug", slugifyBlogTitle(e.target.value));
            }}
            required
          />
        </AdminField>
        {!isNew ? (
          <p className="text-xs">
            浏览量：<span className="font-medium text-text">{post.viewCount ?? 0}</span>
            <span className="mx-2">·</span>
            前台：
            <code className="font-mono">/blog/{post.slug}</code>
          </p>
        ) : null}
      </div>

      <AdminField label="文章标题">
        <input
          className={adminInputClass}
          value={post.title}
          onChange={(e) => {
            const title = e.target.value;
            setField("title", title);
            if (isNew && !slugTouched) {
              setField("slug", slugifyBlogTitle(title));
            }
          }}
          required
        />
      </AdminField>

      <AdminField label="分类">
        <select
          className={adminInputClass}
          value={post.categorySlug}
          onChange={(e) => setCategorySlug(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="发布状态">
          <select
            className={adminInputClass}
            value={post.status}
            onChange={(e) => setField("status", e.target.value as BlogPost["status"])}
          >
            <option value="draft">草稿（前台不可见）</option>
            <option value="published">已发布</option>
          </select>
        </AdminField>
        <AdminField label="发布日期">
          <input
            type="date"
            className={adminInputClass}
            value={post.publishedAt}
            onChange={(e) => setField("publishedAt", e.target.value)}
          />
        </AdminField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="阅读时长（分钟）">
          <input
            type="number"
            min={1}
            className={adminInputClass}
            value={post.readTime}
            onChange={(e) => setField("readTime", parseInt(e.target.value, 10) || 1)}
          />
        </AdminField>
      </div>

      <AdminField label="摘要">
        <textarea
          className={adminTextareaClass}
          rows={3}
          value={post.excerpt}
          onChange={(e) => setField("excerpt", e.target.value)}
        />
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="SEO 标题">
          <input
            className={adminInputClass}
            value={post.metaTitle}
            onChange={(e) => setField("metaTitle", e.target.value)}
          />
        </AdminField>
        <AdminField label="SEO 描述">
          <textarea
            className={adminTextareaClass}
            value={post.metaDescription}
            onChange={(e) => setField("metaDescription", e.target.value)}
          />
        </AdminField>
      </div>

      <AdminField
        label="正文内容"
        hint="支持 Markdown 风格：## 标题、### 小标题、列表、表格、[文字](链接)"
      >
        <textarea
          className={`${adminTextareaClass} min-h-[320px] font-mono text-xs`}
          rows={20}
          value={post.content}
          onChange={(e) => setField("content", e.target.value)}
        />
      </AdminField>

      <AdminField label="FAQ" hint="每行一条，格式：问题|||答案">
        <textarea
          className={adminTextareaClass}
          rows={6}
          value={faqsToText(post.faqs)}
          onChange={(e) => setField("faqs", textToFaqs(e.target.value))}
        />
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="关联商品 Slug" hint="英文逗号分隔">
          <input
            className={adminInputClass}
            value={post.relatedProductSlugs.join(", ")}
            onChange={(e) =>
              setField(
                "relatedProductSlugs",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </AdminField>
        <AdminField label="关联合集 Slug" hint="英文逗号分隔">
          <input
            className={adminInputClass}
            value={post.relatedCollectionSlugs.join(", ")}
            onChange={(e) =>
              setField(
                "relatedCollectionSlugs",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </AdminField>
      </div>

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建文章" : "保存文章"}
        </button>
        {!isNew ? (
          <button
            type="button"
            onClick={() => void handleDelete()}
            className="rounded-full border border-red-300 text-red-700 px-5 py-2.5 text-sm font-medium hover:bg-red-50"
          >
            删除文章
          </button>
        ) : null}
        <SaveStatus status={status} message={status === "error" ? errorMessage : undefined} />
      </div>
    </form>
  );
}
