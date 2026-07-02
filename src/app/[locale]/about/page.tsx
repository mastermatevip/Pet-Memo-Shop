import { createLocalizedPolicyPage } from "@/lib/localized-policy-page";

const { Page, generateMetadata } = createLocalizedPolicyPage({
  pageKey: "about",
  path: "/about",
  fallbackTitle: "About Pet Memo Shop",
  fallbackMetaDescription:
    "Learn about Pet Memo Shop — a premium pet memorial brand creating personalized keepsakes and digital memorial experiences.",
  fallbackSections: [
    {
      type: "p",
      text: "Pet Memo Shop was founded with a simple belief: every beloved companion deserves to be remembered with warmth, dignity, and love. We create personalized pet memorial gifts and digital keepsakes that help families honor the bond they shared.",
    },
    { type: "h2", text: "Our Mission" },
    {
      type: "p",
      text: "We believe memorial gifts should feel gentle, not somber. Our products are designed to celebrate the joy, loyalty, and quiet companionship that pets bring into our lives — not to mourn their absence, but to honor their memory.",
    },
    { type: "h2", text: "What Makes Us Different" },
    {
      type: "p",
      text: "Our signature NFC pet memorial cards connect physical keepsakes to digital memorial pages. With a simple tap, families can access photos, videos, stories, and messages — creating a living tribute that grows over time.",
    },
    { type: "h2", text: "Our Promise" },
    {
      type: "ul",
      items: [
        "Every personalized item includes a design proof before production",
        "Premium materials and careful craftsmanship",
        "Warm, respectful customer support",
        "Worldwide shipping with tracking",
      ],
    },
  ],
  fallbackCta: { label: "Explore Our Collection", href: "/collections/pet-memorial-gifts" },
});

export { generateMetadata };
export default Page;
