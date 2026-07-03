import type { MetadataRoute } from "next";
import { BRAND } from "@/config/brand";
import { locales, routing, type Locale } from "@/i18n/routing";
import { getAllProductSlugs } from "@/data/products";
import { getAllCollectionSlugs } from "@/data/collections";
import { getAllBlogSlugs, getBlogCategories } from "@/data/blog";

const STATIC_PATHS = [
  "/",
  "/about",
  "/best-sellers",
  "/blog",
  "/contact",
  "/digital-pet-memorial",
  "/faqs",
  "/privacy-policy",
  "/returns-refunds",
  "/reviews",
  "/shipping-policy",
  "/terms-of-service",
  "/track-order",
  "/wholesale",
] as const;

function localizedUrl(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return `${BRAND.url}${normalized === "/" ? "" : normalized}`;
  }
  return `${BRAND.url}/${locale}${normalized === "/" ? "" : normalized}`;
}

function entry(
  path: string,
  options: { changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {}
): MetadataRoute.Sitemap {
  const { changeFrequency = "weekly", priority = 0.7 } = options;

  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, localizedUrl(loc, path)])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    urls.push(...entry(path, { priority: path === "/" ? 1 : 0.7 }));
  }

  for (const slug of getAllCollectionSlugs()) {
    urls.push(...entry(`/collections/${slug}`, { changeFrequency: "weekly", priority: 0.8 }));
  }

  for (const slug of getAllProductSlugs()) {
    urls.push(...entry(`/products/${slug}`, { changeFrequency: "weekly", priority: 0.9 }));
  }

  for (const slug of getAllBlogSlugs()) {
    urls.push(...entry(`/blog/${slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  }

  for (const category of getBlogCategories()) {
    urls.push(...entry(`/blog/category/${category.slug}`, { changeFrequency: "weekly", priority: 0.5 }));
  }

  return urls;
}
