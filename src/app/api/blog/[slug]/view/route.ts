import { NextResponse } from "next/server";
import { incrementBlogPostViewCount } from "@/lib/cms/store";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = incrementBlogPostViewCount(slug);

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ viewCount: post.viewCount });
}
