import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Pet Memo Shop terms of service for using our website and purchasing memorial gifts.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">Terms of Service</h1>
      <div className="prose-memorial space-y-6">
        <p>Last updated: December 2025</p>
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using the Pet Memo Shop website, you agree to these terms of service.</p>
        <h2>Products & Personalization</h2>
        <p>Personalized products are made to order based on the details you provide. You are responsible for reviewing and approving design proofs before production.</p>
        <h2>Pricing & Payment</h2>
        <p>All prices are listed in USD unless otherwise indicated. We reserve the right to update pricing at any time.</p>
        <h2>Intellectual Property</h2>
        <p>All website content, designs, and branding are the property of Pet Memo Shop. Pet photos you upload remain your property.</p>
        <h2>Limitation of Liability</h2>
        <p>Pet Memo Shop is not liable for indirect or consequential damages arising from the use of our products or website.</p>
      </div>
    </div>
  );
}
