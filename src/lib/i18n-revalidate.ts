import { revalidatePath } from "next/cache";
import { locales, routing } from "@/i18n/routing";

/**
 * Revalidate a storefront path for every locale after CMS save.
 * Default locale uses `localePrefix: "as-needed"` (served at `/`), but Next may also
 * cache the prefixed `/en` form — invalidate both so English homepage updates.
 */
export function revalidateLocalizedPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized === "/" ? "" : normalized;

  // Unprefixed (default locale public URL) + layout tree
  revalidatePath(normalized);
  revalidatePath(normalized, "layout");
  revalidatePath("/", "layout");

  for (const locale of locales) {
    const localePath = `/${locale}${suffix}`;
    revalidatePath(localePath);
    revalidatePath(localePath, "page");
    revalidatePath(`/${locale}`, "layout");
  }

  // Explicit default-locale prefixed path (as-needed still builds/caches this internally)
  if (routing.defaultLocale) {
    const enPath = `/${routing.defaultLocale}${suffix}`;
    revalidatePath(enPath);
    revalidatePath(enPath, "page");
  }
}
