import "server-only";

import { getCouponByCode } from "@/lib/cms/store";
import type { Coupon } from "@/types";

export interface AppliedCoupon {
  coupon: Coupon;
  discountAmount: number;
}

/** Validate and compute discount against item subtotal (gift box not discounted). */
export function applyCouponToSubtotal(code: string | undefined, itemsTotal: number): AppliedCoupon | null {
  const trimmed = code?.trim();
  if (!trimmed) return null;

  const coupon = getCouponByCode(trimmed);
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  if (!coupon.active) {
    throw new Error("This coupon is no longer active");
  }

  if (coupon.expiresAt) {
    const expires = Date.parse(coupon.expiresAt);
    if (Number.isFinite(expires) && expires < Date.now()) {
      throw new Error("This coupon has expired");
    }
  }

  if (coupon.maxUses != null && coupon.usedCount >= coupon.maxUses) {
    throw new Error("This coupon has reached its usage limit");
  }

  if (coupon.minSubtotal != null && itemsTotal < coupon.minSubtotal) {
    throw new Error(`Minimum subtotal of $${coupon.minSubtotal.toFixed(2)} required for this coupon`);
  }

  let discount =
    coupon.type === "percent" ? (itemsTotal * coupon.value) / 100 : coupon.value;

  discount = Math.min(Math.max(0, discount), itemsTotal);
  discount = Math.round(discount * 100) / 100;

  if (discount <= 0) {
    throw new Error("This coupon does not apply to the current cart");
  }

  return { coupon, discountAmount: discount };
}
