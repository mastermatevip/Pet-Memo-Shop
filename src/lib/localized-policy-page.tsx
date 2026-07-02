import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { LocalizedPageBody } from "@/components/shared/LocalizedPageBody";
import { buildMetadata } from "@/lib/seo";
import { getLocalizedPage, loadContentBundle } from "@/lib/localized-content";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
  pageKey: string;
  path: string;
  fallbackTitle: string;
  fallbackMetaDescription: string;
  fallbackSections: import("@/lib/localized-content").PageSection[];
  fallbackCta?: { label: string; href: string };
}

export function createLocalizedPolicyPage({
  pageKey,
  path,
  fallbackTitle,
  fallbackMetaDescription,
  fallbackSections,
  fallbackCta,
}: Props) {
  async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const bundle = await loadContentBundle(locale);
    const page = getLocalizedPage(bundle, pageKey);

    return buildMetadata({
      title: page?.metaTitle ?? page?.title ?? fallbackTitle,
      description: page?.metaDescription ?? fallbackMetaDescription,
      path,
      locale,
    });
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as Locale)) notFound();

    const bundle = await loadContentBundle(locale);
    const page = getLocalizedPage(bundle, pageKey);
    const title = page?.title ?? fallbackTitle;
    const sections = page?.sections ?? fallbackSections;
    const cta = page?.cta
      ? { label: page.cta, href: fallbackCta?.href ?? "/collections/pet-memorial-gifts" }
      : fallbackCta;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="font-serif text-4xl text-text mb-6">{title}</h1>
        <LocalizedPageBody sections={sections} />
        {cta ? (
          <div className="mt-10">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        ) : null}
      </div>
    );
  }

  return { Page, generateMetadata };
}
