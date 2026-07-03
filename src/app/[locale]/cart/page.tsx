import { buildMetadata } from "@/lib/seo";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review your Pet Memo Shop memorial gift cart.",
  path: "/cart",
});

export default function CartPage() {
  return <CartPageClient />;
}
