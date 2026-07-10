import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrderEditor } from "@/components/admin/OrderEditor";
import { OrderMemorialPanel } from "@/components/admin/OrderMemorialPanel";
import { getOrderByNumberFromStore, loadMemorialPages } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function AdminOrderEditPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = getOrderByNumberFromStore(decodeURIComponent(orderNumber));
  if (!order) notFound();

  const memorials = loadMemorialPages().filter(
    (page) =>
      page.orderNumber === order.orderNumber ||
      order.memorialSlugs?.includes(page.slug)
  );

  return (
    <AdminShell title={`编辑订单：${order.orderNumber}`}>
      <div className="space-y-8">
        <OrderMemorialPanel order={order} memorials={memorials} />
        <OrderEditor initial={order} />
      </div>
    </AdminShell>
  );
}
