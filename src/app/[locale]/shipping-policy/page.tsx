import { createLocalizedPolicyPage } from "@/lib/localized-policy-page";

const { Page, generateMetadata } = createLocalizedPolicyPage({
  pageKey: "shipping",
  path: "/shipping-policy",
  fallbackTitle: "Shipping Policy",
  fallbackMetaDescription:
    "Learn about Pet Memo Shop shipping options, delivery times, and international shipping.",
  fallbackSections: [
    {
      type: "p",
      text: "We ship worldwide from our fulfillment centers. All orders include tracking.",
    },
    { type: "h2", text: "Processing Time" },
    {
      type: "p",
      text: "Personalized items require 3–5 business days for production after design proof approval. Non-customized items ship within 1–2 business days.",
    },
    { type: "h2", text: "Delivery Times" },
    {
      type: "ul",
      items: [
        "United States: 5–7 business days",
        "Canada & UK: 7–12 business days",
        "Europe & Australia: 10–15 business days",
        "Other international: 12–20 business days",
      ],
    },
    { type: "h2", text: "Free Shipping" },
    {
      type: "p",
      text: "Free standard shipping is available on selected memorial gifts and orders over $75.",
    },
  ],
});

export { generateMetadata };
export default Page;
