import { notFound } from "next/navigation";
import { ProductPageContent } from "@/components/product/ProductPageContent";
import { buildMetadata } from "@/lib/seo";
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from "@/data/products";
import { localizeProduct, loadContentBundle } from "@/lib/localized-content";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const base = getProductBySlug(slug);
  if (!base) return {};

  const bundle = await loadContentBundle(locale);
  const product = localizeProduct(base, bundle);

  return buildMetadata({
    title: product.metaTitle ?? product.title,
    description: product.metaDescription ?? product.shortDescription,
    path: `/products/${slug}`,
    image: product.images[0]?.src,
    locale,
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const base = getProductBySlug(slug);
  if (!base) notFound();

  const bundle = await loadContentBundle(locale);
  const product = localizeProduct(base, bundle);
  const relatedProducts = getRelatedProducts(product.relatedSlugs).map((p) =>
    localizeProduct(p, bundle)
  );

  return <ProductPageContent product={product} relatedProducts={relatedProducts} />;
}
