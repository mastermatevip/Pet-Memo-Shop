import { randomBytes } from "crypto";

export function slugifyPetName(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return base || "companion";
}

export function generateMemorialSlug(petName: string, existingSlugs: Set<string>): string {
  const base = slugifyPetName(petName);
  let slug = base;
  let attempt = 0;

  while (existingSlugs.has(slug)) {
    attempt += 1;
    slug = `${base}-${randomBytes(3).toString("hex")}`;
    if (attempt > 10) {
      slug = `${base}-${Date.now().toString(36)}`;
      break;
    }
  }

  return slug;
}
