import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CouponEditor } from "@/components/admin/CouponEditor";
import { getCouponByCode } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function AdminCouponEditPage({ params }: Props) {
  const { code } = await params;
  const coupon = getCouponByCode(decodeURIComponent(code));
  if (!coupon) notFound();

  return (
    <AdminShell title={`编辑优惠券 · ${coupon.code}`}>
      <CouponEditor initial={coupon} />
    </AdminShell>
  );
}
