import { buildMetadata } from "@/lib/seo";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: "Checkout",
    description: "Complete your Pet Memo Shop order securely with PayPal.",
    path: "/checkout",
    locale,
    noIndex: true,
  });
}

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
