import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadMembers, loadOrders, saveMembers } from "@/lib/cms/store";
import type { Member } from "@/types";
import { syncAllMembersFromOrders } from "@/lib/members/sync";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const members = [...loadMembers()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json({ members });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const url = new URL(request.url);
  if (url.searchParams.get("action") === "sync") {
    const members = syncAllMembersFromOrders(loadOrders());
    return NextResponse.json({ members, synced: members.length });
  }

  const body = (await request.json()) as Partial<Member>;
  const now = new Date().toISOString();
  const email = body.email?.trim().toLowerCase();

  if (!email || !body.name?.trim()) {
    return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
  }

  const members = loadMembers();
  if (members.some((m) => m.email === email)) {
    return NextResponse.json({ error: "Member already exists" }, { status: 409 });
  }

  const member: Member = {
    email,
    name: body.name.trim(),
    phone: body.phone?.trim() || undefined,
    defaultShippingAddress: body.defaultShippingAddress?.trim() || undefined,
    status: body.status === "blocked" ? "blocked" : "active",
    source: "manual",
    orderCount: 0,
    totalSpent: 0,
    currency: body.currency ?? "USD",
    orderNumbers: [],
    internalNotes: body.internalNotes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  members.push(member);
  const file = saveMembers(members);
  return NextResponse.json({ member, ...file });
}
