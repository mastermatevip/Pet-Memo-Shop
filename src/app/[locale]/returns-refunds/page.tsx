import { createLocalizedPolicyPage } from "@/lib/localized-policy-page";

const { Page, generateMetadata } = createLocalizedPolicyPage({
  pageKey: "returns",
  path: "/returns-refunds",
  fallbackTitle: "Returns & Refunds",
  fallbackMetaDescription:
    "Pet Memo Shop returns and refunds policy for personalized memorial gifts.",
  fallbackSections: [
    {
      type: "p",
      text: "We want you to feel confident in every memorial keepsake you receive. If something isn't right, we're here to help.",
    },
    { type: "h2", text: "Personalized Items" },
    {
      type: "p",
      text: "Because personalized memorial gifts are made to order, we cannot accept returns on customized items once production has begun — after you approve your design proof.",
    },
    { type: "h2", text: "Damaged or Defective Items" },
    {
      type: "p",
      text: "If your item arrives damaged or with a defect, contact us within 14 days with photos. We will replace or refund at no additional cost.",
    },
    { type: "h2", text: "How to Request a Return" },
    {
      type: "p",
      text: "Email us at hello@petmemoshop.com with your order number and a description of the issue. Our team responds within 24 hours.",
    },
  ],
});

export { generateMetadata };
export default Page;
