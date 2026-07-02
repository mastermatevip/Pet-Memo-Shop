import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { BRAND } from "@/config/brand";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about Pet Memo Shop — a premium pet memorial brand creating personalized keepsakes and digital memorial experiences.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-6">About {BRAND.name}</h1>
      <div className="prose-memorial space-y-6">
        <p>
          {BRAND.name} was founded with a simple belief: every beloved companion deserves to be remembered with warmth, dignity, and love. We create personalized pet memorial gifts and digital keepsakes that help families honor the bond they shared.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe memorial gifts should feel gentle, not somber. Our products are designed to celebrate the joy, loyalty, and quiet companionship that pets bring into our lives — not to mourn their absence, but to honor their memory.
        </p>
        <h2>What Makes Us Different</h2>
        <p>
          Our signature NFC pet memorial cards connect physical keepsakes to digital memorial pages. With a simple tap, families can access photos, videos, stories, and messages — creating a living tribute that grows over time.
        </p>
        <h2>Our Promise</h2>
        <ul>
          <li>Every personalized item includes a design proof before production</li>
          <li>Premium materials and careful craftsmanship</li>
          <li>Warm, respectful customer support</li>
          <li>Worldwide shipping with tracking</li>
        </ul>
      </div>
      <div className="mt-10">
        <Button href="/collections/pet-memorial-gifts">Explore Our Collection</Button>
      </div>
    </div>
  );
}
