"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="rounded-2xl border border-border bg-card p-8">
        <h1 className="font-serif text-3xl text-text mb-3">Thank you for your order</h1>
        <p className="text-muted mb-6">
          Your payment was received. We will send a design proof for confirmation before production.
        </p>
        {orderNumber ? (
          <p className="text-sm text-muted mb-6">
            Order number:{" "}
            <span className="font-mono font-medium text-text">{orderNumber}</span>
          </p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {orderNumber ? (
            <Link
              href="/track-order"
              className="rounded-full bg-btn text-btn-text px-6 py-3 text-sm font-medium hover:bg-btn-hover"
            >
              Track Your Order
            </Link>
          ) : null}
          <Link
            href="/"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted hover:border-gold hover:text-text"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
