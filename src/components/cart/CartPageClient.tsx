"use client";

import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-3xl text-text mb-3">Your cart is empty</h1>
        <p className="text-muted mb-8">Browse our memorial keepsakes to get started.</p>
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-8">Shopping Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.productSlug}
            className="rounded-2xl border border-border bg-card p-5 flex gap-4 justify-between"
          >
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.productSlug}`}
                className="font-medium text-text hover:text-gold-dark"
              >
                {item.title}
              </Link>
              <p className="text-sm text-muted mt-1">{formatPrice(item.unitPrice)} each</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productSlug, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-border"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-border"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.productSlug)}
                  className="text-sm text-light hover:text-gold ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="font-medium text-text">{formatPrice(item.unitPrice * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Subtotal</p>
          <p className="font-serif text-2xl text-text">{formatPrice(subtotal)}</p>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-btn text-btn-text px-6 py-3 text-sm font-medium hover:bg-btn-hover"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
