import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadCoupons, saveCoupons } from "@/lib/cms/store";
import type { Coupon } from "@/types";

interface RouteContext {
  params: Promise<{ code: string }>;
}

function normalizeCode(code: string) {
  return decodeURIComponent(code).trim().toUpperCase();
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { code: codeParam } = await context.params;
  const code = normalizeCode(codeParam);
  const coupon = loadCoupons().find((c) => c.code === code);

  if (!coupon) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ coupon });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { code: codeParam } = await context.params;
  const code = normalizeCode(codeParam);
  const updated = (await request.json()) as Partial<Coupon>;

  const coupons = loadCoupons();
  const index = coupons.findIndex((c) => c.code === code);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const existing = coupons[index];
  const type = updated.type === "percent" ? "percent" : "fixed";
  const value = Number(updated.value);
  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json({ error: "优惠值必须大于 0" }, { status: 400 });
  }
  if (type === "percent" && value > 100) {
    return NextResponse.json({ error: "百分比优惠不能超过 100" }, { status: 400 });
  }

  coupons[index] = {
    ...existing,
    type,
    value,
    active: updated.active !== false,
    minSubtotal:
      updated.minSubtotal == null || !Number.isFinite(Number(updated.minSubtotal))
        ? undefined
        : Math.max(0, Number(updated.minSubtotal)),
    maxUses:
      updated.maxUses == null || !Number.isFinite(Number(updated.maxUses))
        ? undefined
        : Math.max(0, Math.floor(Number(updated.maxUses))),
    expiresAt: updated.expiresAt?.trim() || undefined,
    note: updated.note?.trim() || undefined,
    updatedAt: new Date().toISOString(),
  };

  const file = saveCoupons(coupons);
  return NextResponse.json({ coupon: coupons[index], ...file });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { code: codeParam } = await context.params;
  const code = normalizeCode(codeParam);
  const coupons = loadCoupons();
  const next = coupons.filter((c) => c.code !== code);

  if (next.length === coupons.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const file = saveCoupons(next);
  return NextResponse.json({ ok: true, ...file });
}
