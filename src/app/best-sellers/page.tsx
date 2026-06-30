import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { buildMetadata } from "@/lib/seo";
import { getBestSellers } from "@/data/products";

export const metadata = buildMetadata({
  title: "Unique Pet Memorial Gifts | Best Sellers",
  description:
    "Shop unique pet memorial gifts and our best selling personalized keepsakes — NFC cards, jewelry, frames, urns, and sympathy gift boxes.",
  path: "/best-sellers",
});

export default function BestSellersPage() {
  const products = getBestSellers(12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <SectionHeading
        title="Unique Pet Memorial Gifts"
        subtitle="Our most loved memorial keepsakes, chosen by pet families around the world."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
