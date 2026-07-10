import { BRAND } from "@/config/brand";

export function getMemorialPublicUrl(slug: string): string {
  return `${BRAND.url}/memorial/${slug}`;
}
