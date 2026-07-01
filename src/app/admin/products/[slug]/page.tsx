import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { getProductBySlugFromStore } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductEditPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlugFromStore(slug);
  if (!product) notFound();

  return (
    <AdminShell title={`编辑商品：${product.title}`}>
      <ProductEditor initial={product} />
    </AdminShell>
  );
}
