import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadBlogCategories, loadBlogPosts, saveBlogData } from "@/lib/cms/store";
import type { BlogCategory, BlogPost } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePost(body: BlogPost, slug: string, categories: BlogCategory[]): BlogPost {
  const category =
    categories.find((c) => c.slug === body.categorySlug) ??
    categories[0] ??
    ({ slug: "guides", name: "Guides", description: "" } satisfies BlogCategory);

  return {
    ...body,
    slug,
    title: body.title.trim(),
    metaTitle: (body.metaTitle || body.title).trim(),
    metaDescription: (body.metaDescription || body.excerpt || "").trim(),
    excerpt: body.excerpt?.trim() || "",
    category: category.name,
    categorySlug: category.slug,
    publishedAt: body.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: Math.max(1, Number(body.readTime) || 5),
    viewCount: Math.max(0, Number(body.viewCount) || 0),
    status: body.status === "published" ? "published" : "draft",
    content: body.content ?? "",
    faqs: body.faqs ?? [],
    relatedProductSlugs: body.relatedProductSlugs ?? [],
    relatedCollectionSlugs: body.relatedCollectionSlugs ?? [],
  };
}

function revalidateBlog(post: BlogPost, previousSlug?: string) {
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/blog");
  revalidateLocalizedPath(`/blog/${post.slug}`);
  if (previousSlug && previousSlug !== post.slug) {
    revalidateLocalizedPath(`/blog/${previousSlug}`);
  }
  revalidateLocalizedPath(`/blog/category/${post.categorySlug}`);
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json({
    categories: loadBlogCategories(),
    posts: loadBlogPosts(),
  });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as BlogPost;
  const slug = normalizeSlug(body.slug || body.title || "");
  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const categories = loadBlogCategories();
  const posts = loadBlogPosts();
  if (posts.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const post = normalizePost(body, slug, categories);
  posts.unshift(post);
  saveBlogData(categories, posts);
  revalidateBlog(post);

  return NextResponse.json({ post });
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as {
    categories: BlogCategory[];
    posts: BlogPost[];
  };

  if (!Array.isArray(body.categories) || !Array.isArray(body.posts)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const file = saveBlogData(body.categories, body.posts);
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/blog");

  return NextResponse.json(file);
}
