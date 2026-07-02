import { buildMetadata } from "@/lib/seo";
import { BRAND } from "@/config/brand";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact ${BRAND.name} for order inquiries, personalization help, and customer support.`,
  path: "/contact",
});

export { default } from "./ContactForm";
