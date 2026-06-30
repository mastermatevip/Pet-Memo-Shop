import { buildMetadata } from "@/lib/seo";

function PolicyLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">{title}</h1>
      <div className="prose-memorial space-y-6">{children}</div>
    </div>
  );
}

export const metadata = buildMetadata({
  title: "Shipping Policy",
  description: "Learn about Pet Memo Shop shipping options, delivery times, and international shipping.",
  path: "/shipping-policy",
});

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy">
      <p>We ship worldwide from our fulfillment centers. All orders include tracking.</p>
      <h2>Processing Time</h2>
      <p>Personalized items require 3–5 business days for production after design proof approval. Non-customized items ship within 1–2 business days.</p>
      <h2>Delivery Times</h2>
      <ul>
        <li>United States: 5–7 business days</li>
        <li>Canada & UK: 7–12 business days</li>
        <li>Europe & Australia: 10–15 business days</li>
        <li>Other international: 12–20 business days</li>
      </ul>
      <h2>Free Shipping</h2>
      <p>Free standard shipping is available on selected memorial gifts and orders over $75.</p>
    </PolicyLayout>
  );
}
