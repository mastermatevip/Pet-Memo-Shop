import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadOrders, saveOrders } from "@/lib/cms/store";
import type { Order } from "@/types";

interface RouteContext {
  params: Promise<{ orderNumber: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { orderNumber } = await context.params;
  const normalized = decodeURIComponent(orderNumber).trim().toUpperCase();
  const order = loadOrders().find((o) => o.orderNumber === normalized);

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { orderNumber } = await context.params;
  const normalized = decodeURIComponent(orderNumber).trim().toUpperCase();
  const updated = (await request.json()) as Order;

  if (updated.orderNumber.trim().toUpperCase() !== normalized) {
    return NextResponse.json({ error: "Order number mismatch" }, { status: 400 });
  }

  const orders = loadOrders();
  const index = orders.findIndex((o) => o.orderNumber === normalized);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  orders[index] = {
    ...updated,
    orderNumber: normalized,
    updatedAt: new Date().toISOString(),
  };

  const file = saveOrders(orders);
  return NextResponse.json({ order: orders[index], ...file });
}
