import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { loadProducts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = loadProducts();

  return (
    <AdminShell title="商品管理">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">共 {products.length} 个商品</p>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover"
        >
          添加商品
        </Link>
      </div>
      <AdminProductsTable products={products} />
    </AdminShell>
  );
}
