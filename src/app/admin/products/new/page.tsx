import { AdminShell } from "@/components/admin/AdminShell";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { createBlankProduct } from "@/data/products.static";
import { getAllCollectionSlugs } from "@/data/collections";
import { loadProducts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminNewProductPage() {
  const products = loadProducts();
  const product = createBlankProduct(products.map((p) => p.slug));

  return (
    <AdminShell title="添加商品">
      <ProductEditor
        initial={product}
        isNew
        collectionOptions={getAllCollectionSlugs()}
      />
    </AdminShell>
  );
}
