import { getLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { buildMetadata } from "@/lib/seo";
import { getBestSellers } from "@/data/products";
import { localizeProduct, loadContentBundle } from "@/lib/localized-content";

export const dynamic = "force-dynamic";

const fallback = {
  title: "Unique Pet Memorial Gifts",
  subtitle: "Our most loved memorial keepsakes, chosen by pet families around the world.",
  metaTitle: "Unique Pet Memorial Gifts | Best Sellers",
  metaDescription:
    "Shop unique pet memorial gifts and our best selling personalized keepsakes — NFC cards, jewelry, frames, urns, and sympathy gift boxes.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const bundle = await loadContentBundle(locale);
  const page = bundle?.bestSellersPage;

  return buildMetadata({
    title: page?.metaTitle ?? fallback.metaTitle,
    description: page?.metaDescription ?? fallback.metaDescription,
    path: "/best-sellers",
    locale,
  });
}

export default async function BestSellersPage() {
  const locale = await getLocale();
  const bundle = await loadContentBundle(locale);
  const page = bundle?.bestSellersPage;
  const products = getBestSellers(12).map((p) => localizeProduct(p, bundle));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <SectionHeading
        title={page?.title ?? fallback.title}
        subtitle={page?.subtitle ?? fallback.subtitle}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
