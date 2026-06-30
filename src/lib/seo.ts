import type { Metadata } from "next";
import { BRAND } from "@/config/brand";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SEOProps): Metadata {
  const url = `${BRAND.url}${path}`;
  const ogImage = image || `${BRAND.url}/og-default.jpg`;

  return {
    title: title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`,
    description,
    metadataBase: new URL(BRAND.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: BRAND.locale,
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
