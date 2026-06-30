import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import type { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
}

export function ReviewsSection({ reviews, title = "Stories from Loving Pet Families" }: ReviewsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl text-text text-center mb-10 md:mb-14">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
            >
              <StarRating rating={review.rating} showCount={false} />
              <p className="text-muted mt-4 mb-5 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text">{review.customerName}</p>
                  <p className="text-sm text-light">In memory of {review.petName}</p>
                </div>
                {review.verified && <Badge variant="accent">Verified</Badge>}
              </div>
              <p className="text-xs text-light mt-3">Purchased: {review.productPurchased}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
