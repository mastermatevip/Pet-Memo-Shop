import { notFound } from "next/navigation";
import { ProductPageContent } from "@/components/product/ProductPageContent";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getAllProductSlugs } from "@/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.metaTitle ?? product.title,
    description: product.metaDescription ?? product.shortDescription,
    path: `/products/${slug}`,
    image: product.images[0].src,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductPageContent product={product} />;
}
