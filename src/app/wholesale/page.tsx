import { buildMetadata } from "@/lib/seo";
import { BRAND } from "@/config/brand";

export const metadata = buildMetadata({
  title: "Wholesale",
  description: `Wholesale and bulk ordering for ${BRAND.name} pet memorial gifts.`,
  path: "/wholesale",
});

export default function WholesalePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-6">Wholesale & Bulk Orders</h1>
      <div className="prose-memorial space-y-6">
        <p>We partner with pet stores, veterinary clinics, crematoriums, and gift retailers to offer our memorial keepsakes at wholesale pricing.</p>
        <h2>Wholesale Benefits</h2>
        <ul>
          <li>Competitive wholesale pricing</li>
          <li>Custom branding options</li>
          <li>Dedicated account manager</li>
          <li>Marketing materials provided</li>
        </ul>
        <h2>Get Started</h2>
        <p>Contact us at hello@petmemoshop.com with your business details and estimated order volume. Our team will respond within 2 business days.</p>
      </div>
    </div>
  );
}
