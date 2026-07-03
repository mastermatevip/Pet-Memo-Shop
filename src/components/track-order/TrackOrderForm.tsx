"use client";

import { useState } from "react";
import type { OrderStatus, ShippingStatus } from "@/types";
import {
  PUBLIC_ORDER_STATUS_LABELS,
  PUBLIC_SHIPPING_STATUS_LABELS,
} from "@/lib/orders/labels";

interface PublicOrder {
  orderNumber: string;
  orderStatus: OrderStatus;
  shippingStatus: ShippingStatus;
  carrier?: string;
  trackingNumber?: string;
  items: { title: string; quantity: number }[];
  totalAmount: number;
  currency: string;
  createdAt: string;
  shippedAt?: string;
  updatedAt: string;
}

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PublicOrder | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });

      if (!res.ok) {
        setError("We couldn't find an order matching that number and email.");
        return;
      }

      const data = (await res.json()) as { order: PublicOrder };
      setResult(data.order);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Order Number</label>
          <input
            type="text"
            placeholder="e.g. PA-100001"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-btn text-btn-text rounded-full font-medium hover:bg-btn-hover transition-colors disabled:opacity-60"
        >
          {loading ? "Looking up…" : "Track Order"}
        </button>
      </form>

      {error ? (
        <p className="mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 space-y-5">
          <div>
            <p className="text-sm text-light">Order</p>
            <p className="font-serif text-2xl text-text">{result.orderNumber}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-highlight px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-light">Order status</p>
              <p className="font-medium text-text mt-1">
                {PUBLIC_ORDER_STATUS_LABELS[result.orderStatus]}
              </p>
            </div>
            <div className="rounded-xl bg-highlight px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-light">Shipping</p>
              <p className="font-medium text-text mt-1">
                {PUBLIC_SHIPPING_STATUS_LABELS[result.shippingStatus]}
              </p>
            </div>
          </div>

          {result.carrier || result.trackingNumber ? (
            <div className="text-sm text-muted space-y-1">
              {result.carrier ? <p>Carrier: {result.carrier}</p> : null}
              {result.trackingNumber ? (
                <p>
                  Tracking: <span className="font-mono text-text">{result.trackingNumber}</span>
                </p>
              ) : null}
            </div>
          ) : null}

          <div>
            <p className="text-sm font-medium text-text mb-2">Items</p>
            <ul className="space-y-2 text-sm text-muted">
              {result.items.map((item, index) => (
                <li key={`${item.title}-${index}`}>
                  {item.quantity}× {item.title}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-muted">
            Total: <span className="font-medium text-text">${result.totalAmount.toFixed(2)}</span>{" "}
            {result.currency}
          </p>
        </div>
      ) : null}
    </div>
  );
}
