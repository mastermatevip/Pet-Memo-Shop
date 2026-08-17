import type { MetadataRoute } from "next";
import { BRAND } from "@/config/brand";
import { locales, routing } from "@/i18n/routing";

const PRIVATE_PATHS = ["/account", "/cart", "/checkout", "/checkout/success", "/track-order"] as const;

function disallowPaths(): string[] {
  const paths: string[] = ["/admin", "/admin/", "/api/"];
  for (const path of PRIVATE_PATHS) {
    paths.push(path);
    paths.push(`${path}/`);
    for (const locale of locales) {
      if (locale === routing.defaultLocale) continue;
      paths.push(`/${locale}${path}`);
      paths.push(`/${locale}${path}/`);
    }
  }
  return paths;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowPaths(),
    },
    sitemap: `${BRAND.url}/sitemap.xml`,
  };
}
