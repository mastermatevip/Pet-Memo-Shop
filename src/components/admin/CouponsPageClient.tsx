"use client";

import Link from "next/link";
import type { Coupon } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

interface Props {
  initialCoupons: Coupon[];
}

function formatCouponValue(coupon: Coupon) {
  if (coupon.type === "percent") return `${coupon.value}% off`;
  return `${formatPrice(coupon.value)} off`;
}

export function CouponsPageClient({ initialCoupons }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-sm text-muted">共 {initialCoupons.length} 张优惠券。客户在结账页输入优惠码即可抵扣商品小计（礼盒不加折扣）。</p>
        <Link
          href="/admin/coupons/new"
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover"
        >
          新建优惠券
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">优惠码</th>
              <th className="px-4 py-3 font-medium">优惠</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">使用次数</th>
              <th className="px-4 py-3 font-medium">有效期</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {initialCoupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  暂无优惠券。点击「新建优惠券」创建第一张。
                </td>
              </tr>
            ) : (
              initialCoupons.map((coupon) => (
                <tr key={coupon.code} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p className="font-mono font-medium">{coupon.code}</p>
                    {coupon.note ? <p className="text-xs text-light mt-0.5">{coupon.note}</p> : null}
                  </td>
                  <td className="px-4 py-3 text-muted">{formatCouponValue(coupon)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        coupon.active
                          ? "inline-flex rounded-full bg-highlight px-2.5 py-0.5 text-xs font-medium text-muted"
                          : "inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700"
                      }
                    >
                      {coupon.active ? "启用" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {coupon.usedCount}
                    {coupon.maxUses != null ? ` / ${coupon.maxUses}` : ""}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {coupon.expiresAt ? formatDate(coupon.expiresAt) : "不限期"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/coupons/${encodeURIComponent(coupon.code)}`}
                      className="text-gold hover:underline"
                    >
                      编辑
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
