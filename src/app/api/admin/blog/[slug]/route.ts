import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadBlogPosts, saveBlogData, loadBlogCategories } from "@/lib/cms/store";
import type { BlogCategory, BlogPost } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePost(
  body: BlogPost,
  slug: string,
  categories: BlogCategory[],
  existing?: BlogPost
): BlogPost {
  const category =
    categories.find((c) => c.slug === body.categorySlug) ??
    categories.find((c) => c.slug === existing?.categorySlug) ??
    categories[0] ??
    ({ slug: "guides", name: "Guides", description: "" } satisfies BlogCategory);

  return {
    ...existing,
    ...body,
    slug,
    title: body.title.trim(),
    metaTitle: (body.metaTitle || body.title).trim(),
    metaDescription: (body.metaDescription || body.excerpt || existing?.metaDescription || "").trim(),
    excerpt: body.excerpt?.trim() || "",
    category: category.name,
    categorySlug: category.slug,
    publishedAt: body.publishedAt || existing?.publishedAt || new Date().toISOString().slice(0, 10),
    readTime: Math.max(1, Number(body.readTime) || existing?.readTime || 5),
    viewCount: Math.max(0, Number(body.viewCount ?? existing?.viewCount) || 0),
    status: body.status === "published" ? "published" : "draft",
    content: body.content ?? existing?.content ?? "",
    faqs: body.faqs ?? existing?.faqs ?? [],
    relatedProductSlugs: body.relatedProductSlugs ?? existing?.relatedProductSlugs ?? [],
    relatedCollectionSlugs:
      body.relatedCollectionSlugs ?? existing?.relatedCollectionSlugs ?? [],
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

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const post = loadBlogPosts().find((p) => p.slug === slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    post,
    categories: loadBlogCategories(),
  });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug: currentSlug } = await context.params;
  const body = (await request.json()) as BlogPost;
  const nextSlug = normalizeSlug(body.slug || "");

  if (!nextSlug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const categories = loadBlogCategories();
  const posts = loadBlogPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (nextSlug !== currentSlug && posts.some((p) => p.slug === nextSlug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const post = normalizePost(body, nextSlug, categories, posts[index]);
  posts[index] = post;
  saveBlogData(categories, posts);
  revalidateBlog(post, currentSlug);

  return NextResponse.json({ post });
}

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const body = (await request.json()) as { status?: BlogPost["status"] };

  const categories = loadBlogCategories();
  const posts = loadBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.status !== "published" && body.status !== "draft") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const post: BlogPost = {
    ...posts[index],
    status: body.status,
    publishedAt:
      body.status === "published" && !posts[index].publishedAt
        ? new Date().toISOString().slice(0, 10)
        : posts[index].publishedAt,
  };

  posts[index] = post;
  saveBlogData(categories, posts);
  revalidateBlog(post);

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const categories = loadBlogCategories();
  const posts = loadBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [removed] = posts.splice(index, 1);
  saveBlogData(categories, posts);
  revalidateBlog(removed);

  return NextResponse.json({ ok: true });
}
