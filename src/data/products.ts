import "server-only";

import type { Product } from "@/types";
import { loadProducts } from "@/lib/cms/store";

export function getProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  const products = loadProducts();
  const direct = products.filter((p) => p.collection === collectionSlug);

  // Hub collections often have few direct products — include related categories so the page is shoppable.
  const hubSources: Record<string, string[]> = {
    "pet-memorial-gifts": [
      "pet-memorial-frames",
      "pet-memorial-jewelry",
      "pet-urns",
      "nfc-memorial-cards",
      "memorial-gift-boxes",
      "dog-memorial-gifts",
      "cat-memorial-gifts",
      "pet-memorial-plaques",
      "pet-loss-sympathy-gifts",
      "digital-pet-memorial-keepsakes",
    ],
    "dog-memorial-gifts": [
      "dog-memorial-gifts",
      "pet-memorial-frames",
      "pet-memorial-jewelry",
      "pet-urns",
      "nfc-memorial-cards",
      "memorial-gift-boxes",
      "pet-memorial-plaques",
    ],
    "cat-memorial-gifts": [
      "cat-memorial-gifts",
      "pet-memorial-frames",
      "pet-memorial-jewelry",
      "pet-urns",
      "nfc-memorial-cards",
      "memorial-gift-boxes",
      "pet-memorial-plaques",
    ],
  };

  const sources = hubSources[collectionSlug];
  if (!sources) return direct;

  const seen = new Set<string>();
  const merged: Product[] = [];
  for (const product of [
    ...direct,
    ...products.filter((p) => sources.includes(p.collection)),
  ]) {
    if (seen.has(product.slug)) continue;
    seen.add(product.slug);
    merged.push(product);
  }
  return merged;
}

export function getBestSellers(count = 8): Product[] {
  const products = loadProducts();
  const bestsellers = products.filter((p) => p.tags.includes("bestseller"));
  return bestsellers.length >= count ? bestsellers.slice(0, count) : products.slice(0, count);
}

export function getAllProductSlugs(): string[] {
  return loadProducts().map((p) => p.slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => getProductBySlug(s)).filter(Boolean) as Product[];
}
