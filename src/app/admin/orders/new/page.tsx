import { AdminShell } from "@/components/admin/AdminShell";
import { OrderEditor } from "@/components/admin/OrderEditor";
import { generateOrderNumber } from "@/lib/cms/store";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

function createBlankOrder(): Order {
  const now = new Date().toISOString();
  return {
    orderNumber: generateOrderNumber(),
    customerName: "",
    customerEmail: "",
    shippingAddress: "",
    items: [],
    orderStatus: "pending",
    shippingStatus: "not_shipped",
    totalAmount: 0,
    currency: "USD",
    createdAt: now,
    updatedAt: now,
  };
}

export default function AdminNewOrderPage() {
  return (
    <AdminShell title="新建订单">
      <OrderEditor initial={createBlankOrder()} isNew />
    </AdminShell>
  );
}
