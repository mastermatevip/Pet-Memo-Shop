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
  return loadProducts().filter((p) => p.collection === collectionSlug);
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
