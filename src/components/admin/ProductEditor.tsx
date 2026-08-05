"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { ProductImagesEditor } from "@/components/admin/ProductImagesEditor";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { slugify } from "@/lib/utils";

interface Props {
  initial: Product;
  isNew?: boolean;
  collectionOptions?: string[];
}

function productSlug(text: string) {
  return slugify(text).slice(0, 80) || "new-product";
}

export function ProductEditor({ initial, isNew = false, collectionOptions = [] }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState(initial);
  const [originalSlug, setOriginalSlug] = useState(initial.slug);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    // New-product page regenerates a blank `initial` on every refresh — don't wipe local edits/uploads.
    if (isNew) return;
    setProduct(initial);
    setOriginalSlug(initial.slug);
    setSlugTouched(false);
  }, [initial, isNew]);

  function setField<K extends keyof Product>(key: K, value: Product[K]) {
    setProduct((p) => ({ ...p, [key]: value }));
  }

  function normalizeImages(images: Product["images"]) {
    const filtered = images.filter((img) => img.src.trim());
    return filtered.length > 0 ? filtered : product.images.filter((img) => img.src.trim());
  }

  function specsToText(specs: Record<string, string>) {
    return Object.entries(specs)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }

  function textToSpecs(text: string) {
    const specs: Record<string, string> = {};
    for (const line of text.split("\n")) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (key) specs[key] = value;
    }
    return specs;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const images = normalizeImages(product.images);
    if (images.length === 0) {
      setErrorMessage("至少保留一张有效图片");
      setStatus("error");
      return;
    }

    const slug = productSlug(product.slug || product.title);

    if (!slug) {
      setErrorMessage("请填写商品 Slug");
      setStatus("error");
      return;
    }

    if (!product.title.trim()) {
      setErrorMessage("请填写商品标题");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setErrorMessage(undefined);

    const payload = {
      ...product,
      slug,
      images,
      published: product.published !== false,
      inStock: product.inStock !== false,
    };

    const url = isNew
      ? "/api/admin/products"
      : `/api/admin/products/${encodeURIComponent(originalSlug)}`;
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

    const data = (await res.json()) as { product?: Product };
    const saved = data.product ?? payload;
    setProduct(saved);
    setOriginalSlug(saved.slug);
    setStatus("saved");

    if (isNew || saved.slug !== originalSlug) {
      router.replace(`/admin/products/${saved.slug}`);
    } else {
      router.refresh();
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  async function handleDelete() {
    if (isNew) return;
    if (!window.confirm(`确定删除商品「${product.title}」？此操作不可恢复。`)) return;

    setStatus("saving");
    setErrorMessage(undefined);
    const res = await fetch(`/api/admin/products/${encodeURIComponent(originalSlug)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setErrorMessage("删除失败");
      setStatus("error");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted space-y-3">
        {isNew ? <p>新建商品：填写标题、Slug、分类与图片后保存。</p> : null}
        <AdminField
          label="商品 URL Slug"
          hint="英文小写，用连字符分隔。修改后前台商品链接会同步更新。"
        >
          <input
            className={adminInputClass}
            value={product.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setField("slug", productSlug(e.target.value));
            }}
            required
          />
        </AdminField>
        {!isNew ? (
          <p className="text-xs">
            前台链接：
            <code className="font-mono">/products/{product.slug}</code>
          </p>
        ) : null}
      </div>

      <AdminField label="商品标题">
        <input
          className={adminInputClass}
          value={product.title}
          onChange={(e) => {
            const title = e.target.value;
            setField("title", title);
            if (isNew && !slugTouched) {
              setField("slug", productSlug(title));
            }
          }}
          required
        />
      </AdminField>

      {collectionOptions.length > 0 ? (
        <AdminField label="所属分类">
          <select
            className={adminInputClass}
            value={product.collection}
            onChange={(e) => setField("collection", e.target.value)}
          >
            {collectionOptions.map((slug) => (
              <option key={slug} value={slug}>
                {slug}
              </option>
            ))}
          </select>
        </AdminField>
      ) : (
        <AdminField label="所属分类">
          <input
            className={adminInputClass}
            value={product.collection}
            onChange={(e) => setField("collection", e.target.value)}
          />
        </AdminField>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="上架状态" hint="下架后前台不可见，后台仍可编辑">
          <select
            className={adminInputClass}
            value={product.published === false ? "off" : "on"}
            onChange={(e) => setField("published", e.target.value === "on")}
          >
            <option value="on">已上架</option>
            <option value="off">已下架</option>
          </select>
        </AdminField>
        <AdminField label="库存状态" hint="缺货时前台仍可见，但无法加入购物车">
          <select
            className={adminInputClass}
            value={product.inStock ? "in" : "out"}
            onChange={(e) => setField("inStock", e.target.value === "in")}
          >
            <option value="in">有货</option>
            <option value="out">缺货</option>
          </select>
        </AdminField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="价格">
          <input
            type="number"
            step="0.01"
            className={adminInputClass}
            value={product.price}
            onChange={(e) => setField("price", parseFloat(e.target.value) || 0)}
          />
        </AdminField>
        <AdminField label="促销价（可选）">
          <input
            type="number"
            step="0.01"
            className={adminInputClass}
            value={product.salePrice ?? ""}
            onChange={(e) =>
              setField("salePrice", e.target.value ? parseFloat(e.target.value) : undefined)
            }
          />
        </AdminField>
      </div>

      <ProductImagesEditor
        productSlug={product.slug}
        images={product.images}
        onChange={(images) => setField("images", images)}
      />

      <AdminField label="短描述">
        <textarea
          className={adminTextareaClass}
          value={product.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
        />
      </AdminField>

      <AdminField label="详细描述">
        <textarea
          className={adminTextareaClass}
          rows={5}
          value={product.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </AdminField>

      <AdminField label="品牌故事">
        <textarea
          className={adminTextareaClass}
          rows={4}
          value={product.story}
          onChange={(e) => setField("story", e.target.value)}
        />
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="SEO 标题">
          <input
            className={adminInputClass}
            value={product.metaTitle ?? ""}
            onChange={(e) => setField("metaTitle", e.target.value || undefined)}
          />
        </AdminField>
        <AdminField label="SEO 描述">
          <textarea
            className={adminTextareaClass}
            value={product.metaDescription ?? ""}
            onChange={(e) => setField("metaDescription", e.target.value || undefined)}
          />
        </AdminField>
      </div>

      <AdminField label="标签" hint="英文逗号分隔">
        <input
          className={adminInputClass}
          value={product.tags.join(", ")}
          onChange={(e) =>
            setField(
              "tags",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
        />
      </AdminField>

      <AdminField label="规格参数" hint="每行一条，格式：键: 值">
        <textarea
          className={adminTextareaClass}
          rows={6}
          value={specsToText(product.specifications)}
          onChange={(e) => setField("specifications", textToSpecs(e.target.value))}
        />
      </AdminField>

      <AdminField label="卖点" hint="每行一条">
        <textarea
          className={adminTextareaClass}
          rows={5}
          value={product.benefits.join("\n")}
          onChange={(e) =>
            setField(
              "benefits",
              e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </AdminField>

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建商品" : "保存商品"}
        </button>
        {!isNew ? (
          <button
            type="button"
            onClick={() => void handleDelete()}
            className="rounded-full border border-red-300 text-red-700 px-5 py-2.5 text-sm font-medium hover:bg-red-50"
          >
            删除商品
          </button>
        ) : null}
        <SaveStatus status={status} message={status === "error" ? errorMessage : undefined} />
      </div>
    </form>
  );
}
