"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { ProductImagesEditor } from "@/components/admin/ProductImagesEditor";
import { SaveStatus } from "@/components/admin/SaveStatus";

interface Props {
  initial: Product;
}

export function ProductEditor({ initial }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

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
      setStatus("error");
      return;
    }

    setStatus("saving");

    const payload = { ...product, images };

    const res = await fetch(`/api/admin/products/${product.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setProduct(payload);
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted">
        Slug：<code className="font-mono">{product.slug}</code>（只读）
      </div>

      <AdminField label="商品标题">
        <input
          className={adminInputClass}
          value={product.title}
          onChange={(e) => setField("title", e.target.value)}
        />
      </AdminField>

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
          保存商品
        </button>
        <SaveStatus
          status={status}
          message={status === "error" && normalizeImages(product.images).length === 0 ? "至少保留一张有效图片" : undefined}
        />
      </div>
    </form>
  );
}
