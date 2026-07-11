import { BRAND } from "@/config/brand";

const SITE_HOSTS = new Set([
  new URL(BRAND.url).hostname,
  "www.petmemoshop.com",
  "localhost",
  "127.0.0.1",
]);

/** Normalize admin-entered URLs so same-site paths work with next/image. */
export function normalizeImageSrc(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) return trimmed;

  // Admin sometimes copies browser devtools URL — unwrap back to the real path.
  if (trimmed.includes("/_next/image")) {
    try {
      const url = new URL(trimmed, `${BRAND.url}/`);
      const inner = url.searchParams.get("url");
      if (inner) {
        return normalizeImageSrc(decodeURIComponent(inner));
      }
    } catch {
      /* fall through */
    }
  }

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const url = new URL(trimmed);
      if (SITE_HOSTS.has(url.hostname)) {
        if (url.pathname.startsWith("/_next/image")) {
          const inner = url.searchParams.get("url");
          if (inner) return normalizeImageSrc(decodeURIComponent(inner));
        }
        return `${url.pathname}${url.search}`;
      }
      return trimmed;
    }
  } catch {
    return trimmed;
  }

  if (trimmed.startsWith("/")) return trimmed;
  if (trimmed.startsWith("uploads/")) return `/${trimmed}`;
  if (trimmed.startsWith("images/")) return `/${trimmed}`;
  if (trimmed.startsWith("brand/")) return `/${trimmed}`;

  return trimmed;
}

/** Uploaded media on the persistent volume or app routes. */
export function isLocalUpload(src: string): boolean {
  return normalizeImageSrc(src).startsWith("/uploads/");
}

/** Git-tracked public assets and uploads — serve directly, skip remote optimizer. */
export function isSiteStaticImage(src: string): boolean {
  const normalized = normalizeImageSrc(src);
  return (
    normalized.startsWith("/uploads/") ||
    normalized.startsWith("/images/") ||
    normalized.startsWith("/brand/")
  );
}
