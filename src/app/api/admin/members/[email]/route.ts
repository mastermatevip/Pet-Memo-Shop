import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadMembers, loadOrders, saveMembers } from "@/lib/cms/store";
import type { Member } from "@/types";
import { getMemberOrders, memberParamToEmail } from "@/lib/members/sync";

interface RouteContext {
  params: Promise<{ email: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { email: emailParam } = await context.params;
  const email = memberParamToEmail(emailParam);
  const member = loadMembers().find((m) => m.email === email);

  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const orders = getMemberOrders(member, loadOrders());
  return NextResponse.json({ member, orders });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { email: emailParam } = await context.params;
  const email = memberParamToEmail(emailParam);
  const updated = (await request.json()) as Member;

  if (memberParamToEmail(updated.email) !== email) {
    return NextResponse.json({ error: "Email mismatch" }, { status: 400 });
  }

  const members = loadMembers();
  const index = members.findIndex((m) => m.email === email);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  members[index] = {
    ...members[index],
    name: updated.name.trim(),
    phone: updated.phone?.trim() || undefined,
    defaultShippingAddress: updated.defaultShippingAddress?.trim() || undefined,
    status: updated.status === "blocked" ? "blocked" : "active",
    internalNotes: updated.internalNotes?.trim() || undefined,
    updatedAt: new Date().toISOString(),
  };

  const file = saveMembers(members);
  return NextResponse.json({ member: members[index], ...file });
}
