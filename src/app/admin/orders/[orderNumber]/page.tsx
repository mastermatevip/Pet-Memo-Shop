import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrderEditor } from "@/components/admin/OrderEditor";
import { getOrderByNumberFromStore } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function AdminOrderEditPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = getOrderByNumberFromStore(decodeURIComponent(orderNumber));
  if (!order) notFound();

  return (
    <AdminShell title={`编辑订单：${order.orderNumber}`}>
      <OrderEditor initial={order} />
    </AdminShell>
  );
}
