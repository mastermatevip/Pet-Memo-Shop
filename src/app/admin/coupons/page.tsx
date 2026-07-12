import { AdminShell } from "@/components/admin/AdminShell";
import { CouponsPageClient } from "@/components/admin/CouponsPageClient";
import { loadCoupons } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminCouponsPage() {
  const coupons = [...loadCoupons()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <AdminShell title="优惠券">
      <CouponsPageClient initialCoupons={coupons} />
    </AdminShell>
  );
}
