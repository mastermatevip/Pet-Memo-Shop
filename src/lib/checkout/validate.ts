import "server-only";

import { BRAND } from "@/config/brand";
import { loadProducts } from "@/lib/cms/store";
import type { CheckoutInput, ValidatedCheckout, ValidatedCheckoutLine } from "./types";

import { GIFT_BOX_PRICE } from "./constants";

export function validateCheckout(input: CheckoutInput): ValidatedCheckout {
  if (!input.items?.length) {
    throw new Error("Cart is empty");
  }

  if (!input.customerName?.trim()) {
    throw new Error("Customer name is required");
  }

  if (!input.customerEmail?.trim()) {
    throw new Error("Customer email is required");
  }

  if (!input.shippingAddress?.trim()) {
    throw new Error("Shipping address is required");
  }

  const products = loadProducts();
  const lines: ValidatedCheckoutLine[] = [];

  for (const item of input.items) {
    const product = products.find((p) => p.slug === item.productSlug);
    if (!product) {
      throw new Error(`Product not found: ${item.productSlug}`);
    }

    if (!product.inStock) {
      throw new Error(`${product.title} is currently out of stock`);
    }

    const quantity = Math.min(10, Math.max(1, Math.floor(item.quantity) || 1));
    const unitPrice = product.salePrice ?? product.price;

    lines.push({
      productSlug: product.slug,
      title: product.title,
      quantity,
      unitPrice,
    });
  }

  const itemsTotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const giftBox = Boolean(input.giftBox);
  const giftBoxAmount = giftBox ? GIFT_BOX_PRICE : 0;
  const totalAmount = Math.round((itemsTotal + giftBoxAmount) * 100) / 100;

  return {
    items: lines,
    totalAmount,
    currency: BRAND.currency,
    giftBox,
    giftBoxAmount,
  };
}

export function formatPayPalAmount(amount: number): string {
  return amount.toFixed(2);
}
