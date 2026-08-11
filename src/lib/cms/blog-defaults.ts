import type { BlogCategory, BlogPost } from "@/types";
import { slugify } from "@/lib/utils";

export function createBlankBlogPost(
  existingSlugs: Iterable<string>,
  categories: BlogCategory[]
): BlogPost {
  const used = new Set(existingSlugs);
  let slug = "new-blog-post";
  let n = 2;
  while (used.has(slug)) {
    slug = `new-blog-post-${n++}`;
  }

  const category = categories[0] ?? {
    slug: "guides",
    name: "Guides",
    description: "",
  };

  const today = new Date().toISOString().slice(0, 10);

  return {
    slug,
    title: "New Blog Post",
    metaTitle: "New Blog Post",
    metaDescription: "",
    excerpt: "",
    category: category.name,
    categorySlug: category.slug,
    publishedAt: today,
    readTime: 5,
    viewCount: 0,
    status: "draft",
    content: "## Introduction\n\nWrite your memorial guide here.\n",
    faqs: [],
    relatedProductSlugs: [],
    relatedCollectionSlugs: [],
  };
}

export function slugifyBlogTitle(title: string): string {
  return slugify(title).slice(0, 80) || "new-blog-post";
}
