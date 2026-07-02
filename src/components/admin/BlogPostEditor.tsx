"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogCategory, BlogPost, FAQ } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";

interface Props {
  initial: BlogPost;
  categories: BlogCategory[];
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

export function BlogPostEditor({ initial, categories }: Props) {
  const router = useRouter();
  const [post, setPost] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    setPost(initial);
  }, [initial]);

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
    setStatus("saving");

    const res = await fetch(`/api/admin/blog/${post.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted">
        Slug：<code className="font-mono">{post.slug}</code>（只读）
        <span className="mx-2">·</span>
        浏览量：<span className="font-medium text-text">{post.viewCount ?? 0}</span>（自动统计）
      </div>

      <AdminField label="文章标题">
        <input
          className={adminInputClass}
          value={post.title}
          onChange={(e) => setField("title", e.target.value)}
        />
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
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
          保存文章
        </button>
        <SaveStatus status={status} />
      </div>
    </form>
  );
}
