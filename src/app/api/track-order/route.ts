import { NextResponse } from "next/server";
import { lookupOrder, toPublicOrder } from "@/data/orders";

export async function POST(request: Request) {
  const body = (await request.json()) as { orderNumber?: string; email?: string };

  const orderNumber = body.orderNumber?.trim();
  const email = body.email?.trim();

  if (!orderNumber || !email) {
    return NextResponse.json({ error: "Order number and email are required" }, { status: 400 });
  }

  const order = lookupOrder(orderNumber, email);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order: toPublicOrder(order) });
}
