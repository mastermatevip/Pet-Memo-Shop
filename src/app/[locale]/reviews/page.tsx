import { getTranslations } from "next-intl/server";
import { ReviewsSection } from "@/components/shared/ReviewsSection";
import { buildMetadata } from "@/lib/seo";
import { reviews } from "@/data/reviews";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsPage" });
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/reviews",
    locale,
  });
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviewsPage" });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
        <h1 className="font-serif text-4xl text-text">{t("title")}</h1>
      </div>
      <ReviewsSection reviews={reviews} />
    </div>
  );
}
