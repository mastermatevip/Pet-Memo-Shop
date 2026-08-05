"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminImagePreview } from "@/components/admin/AdminImagePreview";
import { ProductImageDisplay } from "@/components/shared/ProductImageDisplay";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

function isPublished(product: Product) {
  return product.published !== false;
}

export function AdminProductsTable({ products: initial }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initial);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initial);
  }, [initial]);

  async function patchProduct(slug: string, patch: { published?: boolean; inStock?: boolean }) {
    setBusySlug(slug);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        setError("操作失败，请重试");
        return;
      }
      const data = (await res.json()) as { product: Product };
      setProducts((list) => list.map((p) => (p.slug === slug ? data.product : p)));
      router.refresh();
    } catch {
      setError("操作失败，请重试");
    } finally {
      setBusySlug(null);
    }
  }

  async function deleteProduct(product: Product) {
    if (!window.confirm(`确定删除商品「${product.title}」？此操作不可恢复。`)) return;

    setBusySlug(product.slug);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${encodeURIComponent(product.slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("删除失败，请重试");
        return;
      }
      setProducts((list) => list.filter((p) => p.slug !== product.slug));
      router.refresh();
    } catch {
      setError("删除失败，请重试");
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">商品</th>
              <th className="px-4 py-3 font-medium">价格</th>
              <th className="px-4 py-3 font-medium">分类</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const published = isPublished(product);
              const busy = busySlug === product.slug;
              return (
                <tr key={product.slug} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-bg shrink-0">
                        {product.images[0] ? (
                          <AdminImagePreview
                            src={product.images[0].src}
                            alt={product.images[0].alt || product.title}
                            className="relative block h-full w-full"
                          >
                            <ProductImageDisplay src={product.images[0].src} alt="" sizes="48px" />
                          </AdminImagePreview>
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-light">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted">{product.collection}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className={published ? "text-green-800" : "text-muted"}>
                        {published ? "已上架" : "已下架"}
                      </span>
                      <span className="text-xs text-light">
                        {product.inStock ? "有货" : "缺货"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void patchProduct(product.slug, { published: !published })
                        }
                        className="text-gold hover:underline disabled:opacity-50"
                      >
                        {published ? "下架" : "上架"}
                      </button>
                      <Link
                        href={`/admin/products/${product.slug}`}
                        className="text-gold hover:underline"
                      >
                        编辑
                      </Link>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void deleteProduct(product)}
                        className="text-red-700 hover:underline disabled:opacity-50"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
