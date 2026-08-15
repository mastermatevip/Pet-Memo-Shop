import { getTranslations } from "next-intl/server";
import { FAQSection } from "@/components/shared/FAQSection";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqsPage" });
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/faqs",
    locale,
  });
}

export default async function FAQsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqsPage" });
  const faqs = Array.from({ length: 8 }, (_, i) => ({
    question: t(`items.${i}.q`),
    answer: t(`items.${i}.a`),
  }));

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 text-center mb-4">
        <h1 className="font-serif text-4xl text-text">{t("title")}</h1>
      </div>
      <FAQSection faqs={faqs} />
    </div>
  );
}
