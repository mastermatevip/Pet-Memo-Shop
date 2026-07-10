import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadMemorialPages, getMemorialSlugs, saveMemorialPage, getMemorialBySlug } from "@/lib/cms/store";
import { createMemorialForOrder } from "@/lib/memorial/provision";
import { generateMemorialSlug } from "@/lib/memorial/slug";
import type { MemorialPage } from "@/types";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json({ pages: loadMemorialPages() });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as Partial<MemorialPage> & {
    orderNumber?: string;
    petName?: string;
    customerEmail?: string;
  };

  if (body.orderNumber?.trim()) {
    const page = createMemorialForOrder(body.orderNumber.trim(), body.petName?.trim());
    if (!page) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ page });
  }

  if (body.slug && body.petName && body.customerEmail) {
    const existing = getMemorialBySlug(body.slug);
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    const now = new Date().toISOString();
    const page: MemorialPage = {
      slug: body.slug,
      orderNumber: body.orderNumber,
      customerEmail: body.customerEmail,
      petName: body.petName,
      petType: body.petType,
      birthDate: body.birthDate,
      memorialDate: body.memorialDate,
      portraitUrl: body.portraitUrl,
      story: body.story,
      gallery: body.gallery ?? [],
      familyMessages: body.familyMessages ?? [],
      guestbookEnabled: body.guestbookEnabled ?? true,
      guestbook: body.guestbook ?? [],
      status: body.status ?? "draft",
      publishedAt: body.publishedAt,
      createdAt: body.createdAt ?? now,
      updatedAt: now,
    };
    saveMemorialPage(page);
    return NextResponse.json({ page: getMemorialBySlug(page.slug) });
  }

  const petName = body.petName?.trim();
  const customerEmail = body.customerEmail?.trim();
  if (!petName || !customerEmail) {
    return NextResponse.json({ error: "petName and customerEmail required" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const page: MemorialPage = {
    slug: generateMemorialSlug(petName, new Set(getMemorialSlugs())),
    customerEmail,
    petName,
    gallery: [],
    familyMessages: [],
    guestbookEnabled: true,
    guestbook: [],
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  saveMemorialPage(page);
  return NextResponse.json({ page });
}
