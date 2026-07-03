import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import CheckoutSuccessPage from "./CheckoutSuccessPage";

export const metadata = buildMetadata({
  title: "Order Confirmed",
  description: "Your Pet Memo Shop order has been received.",
  path: "/checkout/success",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-16 text-center text-muted">Loading…</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}
