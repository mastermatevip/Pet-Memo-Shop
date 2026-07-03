import "server-only";

import type { Order } from "@/types";
import { loadOrders, getOrderByNumberFromStore } from "@/lib/cms/store";

export function getOrders(): Order[] {
  return loadOrders();
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return getOrderByNumberFromStore(orderNumber);
}

export function lookupOrder(orderNumber: string, email: string): Order | undefined {
  const normalizedNumber = orderNumber.trim().toUpperCase();
  const normalizedEmail = email.trim().toLowerCase();
  const order = getOrderByNumberFromStore(normalizedNumber);
  if (!order) return undefined;
  if (order.customerEmail.trim().toLowerCase() !== normalizedEmail) return undefined;
  return order;
}

export function toPublicOrder(order: Order) {
  return {
    orderNumber: order.orderNumber,
    orderStatus: order.orderStatus,
    shippingStatus: order.shippingStatus,
    carrier: order.carrier,
    trackingNumber: order.trackingNumber,
    items: order.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
    })),
    totalAmount: order.totalAmount,
    currency: order.currency,
    createdAt: order.createdAt,
    shippedAt: order.shippedAt,
    updatedAt: order.updatedAt,
  };
}
