import { ReviewsSection } from "@/components/shared/ReviewsSection";
import { buildMetadata } from "@/lib/seo";
import { reviews } from "@/data/reviews";

export const metadata = buildMetadata({
  title: "Customer Reviews",
  description: "Read stories from loving pet families who chose Pet Memo Shop memorial keepsakes.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
        <h1 className="font-serif text-4xl text-text">Customer Reviews</h1>
      </div>
      <ReviewsSection reviews={reviews} />
    </div>
  );
}
