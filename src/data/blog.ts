import "server-only";

import type { BlogCategory, BlogPost } from "@/types";
import {
  loadBlogCategories,
  loadBlogPosts,
} from "@/lib/cms/store";

export function getBlogCategories(): BlogCategory[] {
  return loadBlogCategories();
}

export function getBlogPosts(): BlogPost[] {
  return loadBlogPosts();
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return loadBlogPosts().find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return loadBlogPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return [...loadBlogPosts()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count);
}

export function getAllBlogSlugs(): string[] {
  return loadBlogPosts().map((p) => p.slug);
}

export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return loadBlogCategories().find((c) => c.slug === slug);
}
