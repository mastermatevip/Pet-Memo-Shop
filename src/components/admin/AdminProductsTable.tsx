"use client";

import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminImagePreview } from "@/components/admin/AdminImagePreview";
import { ProductImageDisplay } from "@/components/shared/ProductImageDisplay";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

export function AdminProductsTable({ products }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-highlight text-left">
          <tr>
            <th className="px-4 py-3 font-medium">商品</th>
            <th className="px-4 py-3 font-medium">价格</th>
            <th className="px-4 py-3 font-medium">分类</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/admin/products/${product.slug}`}
                  className="text-gold hover:underline"
                >
                  编辑
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
