import ContactForm from "./ContactForm";
import { buildMetadata } from "@/lib/seo";
import { loadContentBundle } from "@/lib/localized-content";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const bundle = await loadContentBundle(locale);
  const contact = bundle?.contact;

  return buildMetadata({
    title: contact?.title ?? "Contact Us",
    description: contact?.intro ?? "Contact Pet Memo Shop for order inquiries and support.",
    path: "/contact",
    locale,
  });
}

export default function ContactPage() {
  return <ContactForm />;
}
