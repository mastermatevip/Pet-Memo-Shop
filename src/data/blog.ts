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

export function getAllBlogSlugs(): string[] {
  return getBlogPosts().map((p) => p.slug);
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return loadBlogCategories().find((c) => c.slug === slug);
}
