import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadOrders } from "@/lib/cms/store";
import { formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABELS, SHIPPING_STATUS_LABELS } from "@/lib/orders/labels";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const orders = [...loadOrders()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <AdminShell title="订单管理">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">共 {orders.length} 个订单</p>
        <Link
          href="/admin/orders/new"
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover"
        >
          新建订单
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">订单号</th>
              <th className="px-4 py-3 font-medium">客户</th>
              <th className="px-4 py-3 font-medium">订单状态</th>
              <th className="px-4 py-3 font-medium">物流状态</th>
              <th className="px-4 py-3 font-medium">金额</th>
              <th className="px-4 py-3 font-medium">更新时间</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderNumber} className="border-t border-border">
                <td className="px-4 py-3 font-mono">{order.orderNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-xs text-light">{order.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-muted">{ORDER_STATUS_LABELS[order.orderStatus]}</td>
                <td className="px-4 py-3 text-muted">
                  {SHIPPING_STATUS_LABELS[order.shippingStatus]}
                </td>
                <td className="px-4 py-3 text-muted">
                  ${order.totalAmount.toFixed(2)} {order.currency}
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(order.updatedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
                    className="text-gold hover:underline"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
