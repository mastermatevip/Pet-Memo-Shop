import { NextResponse } from "next/server";
import { addGuestbookEntry } from "@/lib/cms/store";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const body = (await request.json()) as { name?: string; message?: string };

  const name = body.name?.trim();
  const message = body.message?.trim();

  if (!name || !message || message.length > 2000 || name.length > 120) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = addGuestbookEntry(slug, { name, message });
  if (!updated) {
    return NextResponse.json({ error: "Guestbook unavailable" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
