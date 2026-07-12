import { AdminShell } from "@/components/admin/AdminShell";
import { CouponEditor } from "@/components/admin/CouponEditor";
import type { Coupon } from "@/types";

export const dynamic = "force-dynamic";

function createBlankCoupon(): Coupon {
  const now = new Date().toISOString();
  return {
    code: "",
    type: "percent",
    value: 10,
    active: true,
    usedCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

export default function AdminNewCouponPage() {
  return (
    <AdminShell title="新建优惠券">
      <CouponEditor initial={createBlankCoupon()} isNew />
    </AdminShell>
  );
}
