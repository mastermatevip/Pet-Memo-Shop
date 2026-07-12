import { getLocale } from "next-intl/server";
import { DigitalMemorialLandingPage } from "@/components/digital-memorial/DigitalMemorialLandingPage";
import { loadDigitalMemorialLanding } from "@/lib/cms/store";
import { buildMetadata } from "@/lib/seo";
import {
  loadContentBundle,
  localizeDigitalMemorialLanding,
} from "@/lib/localized-content";
import { routing, type Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const bundle = await loadContentBundle(locale);
  const content = localizeDigitalMemorialLanding(loadDigitalMemorialLanding(), bundle);

  return buildMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/digital-pet-memorial",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return null;

  const activeLocale = (await getLocale()) || locale;
  const bundle = await loadContentBundle(activeLocale);
  const content = localizeDigitalMemorialLanding(loadDigitalMemorialLanding(), bundle);

  return <DigitalMemorialLandingPage content={content} />;
}
