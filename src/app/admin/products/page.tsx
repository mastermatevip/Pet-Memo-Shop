import Link from "next/link";
import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadProducts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = loadProducts();

  return (
    <AdminShell title="商品管理">
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
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-bg shrink-0">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
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
    </AdminShell>
  );
}
