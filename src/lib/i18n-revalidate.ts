import { revalidatePath } from "next/cache";
import { locales, routing } from "@/i18n/routing";

/** Revalidate a storefront path for all locales after CMS save. */
export function revalidateLocalizedPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  revalidatePath(normalized);

  for (const locale of locales) {
    if (locale === routing.defaultLocale) continue;
    revalidatePath(`/${locale}${normalized === "/" ? "" : normalized}`);
  }
}
