import { AdminShell } from "@/components/admin/AdminShell";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { loadProducts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = loadProducts();

  return (
    <AdminShell title="商品管理">
      <AdminProductsTable products={products} />
    </AdminShell>
  );
}
