import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Returns & Refunds",
  description: "Pet Memo Shop returns and refunds policy for personalized and non-customized memorial gifts.",
  path: "/returns-refunds",
});

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">Returns & Refunds</h1>
      <div className="prose-memorial space-y-6">
        <h2>Customized Products</h2>
        <p>Personalized and customized memorial gifts cannot be returned unless the item arrives damaged or with incorrect personalization. Please contact us within 14 days of delivery with photos of the issue.</p>
        <h2>Non-Customized Products</h2>
        <p>Non-customized items may be returned within 30 days in original, unused condition. Return shipping is the responsibility of the customer unless the item is defective.</p>
        <h2>Damaged Items</h2>
        <p>If your item arrives damaged, please contact us within 14 days with photos. We will arrange a replacement or full refund at no additional cost.</p>
        <h2>How to Start a Return</h2>
        <p>Email us at hello@petmemoshop.com with your order number and reason for return. Our team will guide you through the process.</p>
      </div>
    </div>
  );
}
