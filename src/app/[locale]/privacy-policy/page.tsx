import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Pet Memo Shop privacy policy — how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">Privacy Policy</h1>
      <div className="prose-memorial space-y-6">
        <p>Last updated: December 2025</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide when placing an order, creating an account, or contacting us. This may include your name, email, shipping address, and pet personalization details.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information to process orders, create personalized products, send design proofs, and provide customer support. We do not sell your personal information.</p>
        <h2>Pet Photos</h2>
        <p>Photos uploaded for personalization are used solely for creating your memorial product and digital memorial page. They are stored securely and never shared with third parties.</p>
        <h2>Cookies</h2>
        <p>We use cookies to improve your browsing experience and analyze site traffic. You can manage cookie preferences in your browser settings.</p>
        <h2>Contact</h2>
        <p>For privacy-related questions, contact us at hello@petmemoshop.com.</p>
      </div>
    </div>
  );
}
