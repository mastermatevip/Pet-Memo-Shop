import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadBlogPosts, saveBlogData, loadBlogCategories } from "@/lib/cms/store";
import type { BlogPost } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

interface RouteContext {
  params: Promise<{ slug: string }>;
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

  const { slug } = await context.params;
  const updated = (await request.json()) as BlogPost;

  if (updated.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }

  const posts = loadBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  posts[index] = updated;
  const file = saveBlogData(loadBlogCategories(), posts);

  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/blog");
  revalidateLocalizedPath(`/blog/${slug}`);
  revalidateLocalizedPath(`/blog/category/${updated.categorySlug}`);

  return NextResponse.json(file);
}
