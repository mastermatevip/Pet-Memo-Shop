import "server-only";

import type { BlogCategory, BlogPost } from "@/types";
import { isBlogPostPublished } from "@/lib/blog";
import {
  loadBlogCategories,
  loadBlogPosts,
} from "@/lib/cms/store";

export function getBlogCategories(): BlogCategory[] {
  return loadBlogCategories();
}

export function getBlogPosts(): BlogPost[] {
  return loadBlogPosts().filter(isBlogPostPublished);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return getBlogPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return [...getBlogPosts()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count);
}

/** Featured SEO guides that should surface first on hub collection pages. */
const COLLECTION_FEATURED_GUIDES: Record<string, string[]> = {
  "pet-memorial-gifts": [
    "personalized-pet-memorial-gifts-buying-guide",
    "dog-memorial-gifts-ideas-to-honor-a-beloved-dog",
    "cat-memorial-gifts-gentle-ways-to-remember",
    "how-to-choose-a-pet-memorial-gift",
  ],
  "dog-memorial-gifts": [
    "dog-memorial-gifts-ideas-to-honor-a-beloved-dog",
    "dog-memorial-gifts-for-ashes-urns-and-tributes",
    "personalized-pet-memorial-gifts-buying-guide",
    "best-dog-memorial-gifts-for-a-grieving-friend",
  ],
  "cat-memorial-gifts": [
    "cat-memorial-gifts-gentle-ways-to-remember",
    "sympathy-cat-memorial-gifts-for-a-grieving-friend",
    "personalized-pet-memorial-gifts-buying-guide",
    "best-cat-memorial-gifts-to-remember-a-beloved-cat",
  ],
};

/** Posts that explicitly relate to a collection, with featured guides prioritized. */
export function getBlogPostsForCollection(collectionSlug: string, count = 4): BlogPost[] {
  const posts = getBlogPosts();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const featuredSlugs = COLLECTION_FEATURED_GUIDES[collectionSlug] ?? [];
  const featured = featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is BlogPost => Boolean(p));

  if (featured.length >= count) return featured.slice(0, count);

  const used = new Set(featured.map((p) => p.slug));
  const related = posts
    .filter((p) => !used.has(p.slug) && p.relatedCollectionSlugs?.includes(collectionSlug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const merged = [...featured, ...related];
  if (merged.length >= count) return merged.slice(0, count);

  const usedAll = new Set(merged.map((p) => p.slug));
  const extras = posts
    .filter((p) => !usedAll.has(p.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return [...merged, ...extras].slice(0, count);
}

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return loadBlogCategories().find((c) => c.slug === slug);
}
