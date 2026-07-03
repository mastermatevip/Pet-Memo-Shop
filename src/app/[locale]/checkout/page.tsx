import { buildMetadata } from "@/lib/seo";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Pet Memo Shop order securely with PayPal.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
