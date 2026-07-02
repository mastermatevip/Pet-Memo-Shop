import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { locales, ogLocales, routing, type Locale } from "@/i18n/routing";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  locale?: string;
}

function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized || "/";
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  locale = routing.defaultLocale,
}: SEOProps): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${BRAND.url}${localePath(locale as Locale, normalizedPath)}`;
  const ogImage = image || `${BRAND.url}/og-default.jpg`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BRAND.url}${localePath(loc, normalizedPath)}`;
  }
  languages["x-default"] = `${BRAND.url}${localePath(routing.defaultLocale, normalizedPath)}`;

  return {
    title: title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`,
    description,
    metadataBase: new URL(BRAND.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: ogLocales[locale as Locale] ?? ogLocales.en,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
