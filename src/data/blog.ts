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

/** Posts that explicitly relate to a collection, falling back to latest guides. */
export function getBlogPostsForCollection(collectionSlug: string, count = 4): BlogPost[] {
  const posts = getBlogPosts();
  const related = posts.filter((p) => p.relatedCollectionSlugs?.includes(collectionSlug));
  if (related.length >= count) {
    return related
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, count);
  }

  const relatedSlugs = new Set(related.map((p) => p.slug));
  const extras = posts
    .filter((p) => !relatedSlugs.has(p.slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return [...related, ...extras].slice(0, count);
}

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return loadBlogCategories().find((c) => c.slug === slug);
}
