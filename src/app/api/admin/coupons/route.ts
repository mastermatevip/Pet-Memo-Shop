import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadCoupons, saveCoupons } from "@/lib/cms/store";
import type { Coupon } from "@/types";

function buildCoupon(body: Partial<Coupon>, existing?: Coupon): Coupon | { error: string } {
  const code = (body.code ?? existing?.code ?? "").trim().toUpperCase();
  if (!code) return { error: "优惠码不能为空" };
  if (!/^[A-Z0-9_-]{2,32}$/.test(code)) {
    return { error: "优惠码仅支持 2–32 位字母、数字、下划线或连字符" };
  }

  const type = body.type === "percent" ? "percent" : "fixed";
  const value = Number(body.value);
  if (!Number.isFinite(value) || value <= 0) {
    return { error: "优惠值必须大于 0" };
  }
  if (type === "percent" && value > 100) {
    return { error: "百分比优惠不能超过 100" };
  }

  const now = new Date().toISOString();
  const minSubtotal =
    body.minSubtotal == null || !Number.isFinite(Number(body.minSubtotal))
      ? undefined
      : Math.max(0, Number(body.minSubtotal));
  const maxUses =
    body.maxUses == null || !Number.isFinite(Number(body.maxUses))
      ? undefined
      : Math.max(0, Math.floor(Number(body.maxUses)));

  return {
    code,
    type,
    value,
    active: body.active !== false,
    minSubtotal,
    maxUses,
    usedCount: existing?.usedCount ?? Math.max(0, Math.floor(Number(body.usedCount) || 0)),
    expiresAt: body.expiresAt?.trim() || undefined,
    note: body.note?.trim() || undefined,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const coupons = [...loadCoupons()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json({ coupons });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as Partial<Coupon>;
  const built = buildCoupon(body);
  if ("error" in built) {
    return NextResponse.json({ error: built.error }, { status: 400 });
  }

  const coupons = loadCoupons();
  if (coupons.some((c) => c.code === built.code)) {
    return NextResponse.json({ error: "优惠码已存在" }, { status: 409 });
  }

  coupons.push(built);
  const file = saveCoupons(coupons);
  return NextResponse.json({ coupon: built, ...file });
}
