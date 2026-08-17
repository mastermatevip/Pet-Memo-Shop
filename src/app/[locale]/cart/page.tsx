import { buildMetadata } from "@/lib/seo";
import { CartPageClient } from "@/components/cart/CartPageClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: "Shopping Cart",
    description: "Review your Pet Memo Shop memorial gift cart.",
    path: "/cart",
    locale,
    noIndex: true,
  });
}

export default function CartPage() {
  return <CartPageClient />;
}
