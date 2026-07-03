import "server-only";

import { generateOrderNumber, loadOrders, saveOrders } from "@/lib/cms/store";
import type { Order } from "@/types";
import type { CheckoutInput } from "./types";
import { validateCheckout } from "./validate";
import type { PayPalCaptureResult } from "@/lib/paypal/api";

interface CreatePaidOrderInput {
  checkout: CheckoutInput;
  capture: PayPalCaptureResult;
}

export function createPaidOrder({ checkout, capture }: CreatePaidOrderInput): Order {
  const validated = validateCheckout(checkout);
  const now = new Date().toISOString();

  const noteParts = [
    checkout.personalizationNotes?.trim(),
    validated.giftBox ? "Premium gift box requested." : undefined,
    `PayPal capture: ${capture.captureId}`,
  ].filter(Boolean);

  const order: Order = {
    orderNumber: generateOrderNumber(),
    customerName: checkout.customerName.trim(),
    customerEmail: checkout.customerEmail.trim().toLowerCase(),
    customerPhone: checkout.customerPhone?.trim() || undefined,
    shippingAddress: checkout.shippingAddress.trim(),
    items: validated.items.map((item) => ({
      productSlug: item.productSlug,
      title: item.title,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    orderStatus: "pending",
    shippingStatus: "not_shipped",
    internalNotes: noteParts.join("\n"),
    totalAmount: validated.totalAmount,
    currency: validated.currency,
    createdAt: now,
    updatedAt: now,
  };

  if (capture.payerEmail && !order.customerEmail) {
    order.customerEmail = capture.payerEmail.toLowerCase();
  }

  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);

  return order;
}
