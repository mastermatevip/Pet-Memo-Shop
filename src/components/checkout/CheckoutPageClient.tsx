"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { PayPalCheckoutButtons } from "@/components/checkout/PayPalCheckoutButtons";
import { GIFT_BOX_PRICE } from "@/lib/checkout/constants";
import { formatPrice } from "@/lib/utils";
import type { CheckoutInput } from "@/lib/checkout/types";

export function CheckoutPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [personalizationNotes, setPersonalizationNotes] = useState("");
  const [giftBox, setGiftBox] = useState(false);

  const giftBoxAmount = giftBox ? GIFT_BOX_PRICE : 0;
  const total = subtotal + giftBoxAmount;

  const checkout = useMemo<CheckoutInput>(
    () => ({
      items: items.map((item) => ({
        productSlug: item.productSlug,
        quantity: item.quantity,
      })),
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      personalizationNotes,
      giftBox,
    }),
    [
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      personalizationNotes,
      giftBox,
    ]
  );

  const formValid =
    items.length > 0 &&
    customerName.trim() &&
    customerEmail.trim() &&
    shippingAddress.trim();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-text mb-3">Your cart is empty</h1>
        <p className="text-muted mb-8">Add a memorial keepsake before checking out.</p>
        <Link
          href="/collections/pet-memorial-gifts"
          className="inline-flex rounded-full bg-btn text-btn-text px-6 py-3 text-sm font-medium hover:bg-btn-hover"
        >
          Shop Memorial Gifts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-medium text-text">Contact & Shipping</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Full Name *</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Shipping Address *</label>
              <textarea
                rows={4}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                placeholder="Street address&#10;City, State ZIP&#10;Country"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-medium text-text">Personalization</h2>
            <p className="text-sm text-muted">
              Tell us your pet&apos;s name, memorial dates, engraving details, or any special requests.
              We will send a design proof before production.
            </p>
            <textarea
              rows={5}
              value={personalizationNotes}
              onChange={(e) => setPersonalizationNotes(e.target.value)}
              placeholder="Pet name, dates, message, font/color preferences..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={giftBox}
                onChange={(e) => setGiftBox(e.target.checked)}
                className="w-4 h-4 rounded border-border text-gold focus:ring-gold"
              />
              <span className="text-sm text-muted">
                Add premium gift box (+{formatPrice(GIFT_BOX_PRICE)})
              </span>
            </label>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-medium text-text mb-4">Pay with PayPal</h2>
            {!formValid ? (
              <p className="text-sm text-muted mb-4">
                Please complete your name, email, and shipping address before paying.
              </p>
            ) : null}
            <PayPalCheckoutButtons checkout={checkout} disabled={!formValid} />
          </section>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 sticky top-24 space-y-4">
            <h2 className="font-serif text-xl text-text">Order Summary</h2>

            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productSlug} className="flex gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text line-clamp-2">{item.title}</p>
                    <p className="text-sm text-muted mt-1">{formatPrice(item.unitPrice)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productSlug, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-border text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-border text-sm"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productSlug)}
                        className="text-xs text-light hover:text-gold ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-text">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {giftBox ? (
                <div className="flex justify-between text-muted">
                  <span>Gift box</span>
                  <span>{formatPrice(giftBoxAmount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between font-semibold text-text text-base pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
