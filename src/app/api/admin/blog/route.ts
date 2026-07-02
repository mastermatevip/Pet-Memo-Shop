import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadBlogCategories, loadBlogPosts, saveBlogData } from "@/lib/cms/store";
import type { BlogCategory, BlogPost } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json({
    categories: loadBlogCategories(),
    posts: loadBlogPosts(),
  });
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
