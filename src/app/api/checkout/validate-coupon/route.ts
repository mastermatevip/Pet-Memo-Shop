import { NextResponse } from "next/server";
import { loadProducts } from "@/lib/cms/store";
import { applyCouponToSubtotal } from "@/lib/coupons/apply";
import { GIFT_BOX_PRICE } from "@/lib/checkout/constants";
import { BRAND } from "@/config/brand";

interface Body {
  code?: string;
  items?: Array<{ productSlug: string; quantity: number }>;
  giftBox?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const code = body.code?.trim();
    if (!code) {
      return NextResponse.json({ error: "Please enter a coupon code" }, { status: 400 });
    }

    const products = loadProducts();
    let itemsTotal = 0;

    for (const item of body.items ?? []) {
      const product = products.find((p) => p.slug === item.productSlug);
      if (!product) continue;
      const quantity = Math.min(10, Math.max(1, Math.floor(item.quantity) || 1));
      const unitPrice = product.salePrice ?? product.price;
      itemsTotal += quantity * unitPrice;
    }

    itemsTotal = Math.round(itemsTotal * 100) / 100;
    const applied = applyCouponToSubtotal(code, itemsTotal);
    if (!applied) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
    }

    const giftBoxAmount = body.giftBox ? GIFT_BOX_PRICE : 0;
    const totalAmount =
      Math.round((itemsTotal - applied.discountAmount + giftBoxAmount) * 100) / 100;

    return NextResponse.json({
      code: applied.coupon.code,
      type: applied.coupon.type,
      value: applied.coupon.value,
      discountAmount: applied.discountAmount,
      itemsTotal,
      giftBoxAmount,
      totalAmount,
      currency: BRAND.currency,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid coupon";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
