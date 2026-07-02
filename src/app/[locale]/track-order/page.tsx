import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track Your Order",
  description: "Track your Pet Memo Shop memorial gift order status and delivery.",
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-3 text-center">Track Your Order</h1>
      <p className="text-muted text-center mb-8">Enter your order number and email to check your delivery status.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Order Number</label>
          <input type="text" placeholder="e.g. PA-12345" className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Email</label>
          <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <button type="submit" className="w-full py-3 bg-btn text-btn-text rounded-full font-medium hover:bg-btn-hover transition-colors">
          Track Order
        </button>
      </form>
    </div>
  );
}
