import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { generateOrderNumber, loadOrders, saveOrders } from "@/lib/cms/store";
import { queueOrderConfirmationEmail } from "@/lib/email/order-confirmation";
import { upsertMemberFromOrder } from "@/lib/members/sync";
import type { Order } from "@/types";

interface CreateOrderBody extends Partial<Order> {
  sendConfirmationEmail?: boolean;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const orders = [...loadOrders()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as CreateOrderBody;
  const now = new Date().toISOString();

  const order: Order = {
    orderNumber: body.orderNumber?.trim().toUpperCase() || generateOrderNumber(),
    customerName: body.customerName?.trim() ?? "",
    customerEmail: body.customerEmail?.trim() ?? "",
    customerPhone: body.customerPhone?.trim() || undefined,
    shippingAddress: body.shippingAddress?.trim() ?? "",
    items: body.items ?? [],
    orderStatus: body.orderStatus ?? "pending",
    shippingStatus: body.shippingStatus ?? "not_shipped",
    carrier: body.carrier?.trim() || undefined,
    trackingNumber: body.trackingNumber?.trim() || undefined,
    internalNotes: body.internalNotes?.trim() || undefined,
    totalAmount: body.totalAmount ?? 0,
    currency: body.currency ?? "USD",
    createdAt: body.createdAt ?? now,
    updatedAt: now,
    shippedAt: body.shippedAt,
  };

  if (!order.customerName || !order.customerEmail || !order.shippingAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const orders = loadOrders();
  if (orders.some((o) => o.orderNumber === order.orderNumber)) {
    return NextResponse.json({ error: "Order number already exists" }, { status: 409 });
  }

  orders.push(order);
  const file = saveOrders(orders);
  upsertMemberFromOrder(order);

  if (body.sendConfirmationEmail !== false) {
    queueOrderConfirmationEmail(order);
  }

  return NextResponse.json({ order, ...file });
}
