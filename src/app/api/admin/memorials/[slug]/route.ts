import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import {
  deleteMemorialPage,
  getMemorialBySlug,
  saveMemorialPage,
  updateOrderMemorialSlugs,
  getOrderByNumberFromStore,
} from "@/lib/cms/store";
import type { MemorialPage } from "@/types";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const page = getMemorialBySlug(slug);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const existing = getMemorialBySlug(slug);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json()) as MemorialPage;
  if (body.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const page: MemorialPage = {
    ...body,
    updatedAt: now,
    publishedAt:
      body.status === "published"
        ? body.publishedAt ?? existing.publishedAt ?? now
        : body.publishedAt,
  };

  const saved = saveMemorialPage(page);

  if (saved.orderNumber) {
    const order = getOrderByNumberFromStore(saved.orderNumber);
    if (order) {
      const slugs = [...new Set([...(order.memorialSlugs ?? []), saved.slug])];
      updateOrderMemorialSlugs(saved.orderNumber, slugs);
    }
  }

  revalidatePath(`/memorial/${saved.slug}`);

  return NextResponse.json({ page: saved });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const ok = deleteMemorialPage(slug);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath(`/memorial/${slug}`);
  return NextResponse.json({ ok: true });
}
