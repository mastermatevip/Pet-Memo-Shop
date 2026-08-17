import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import CheckoutSuccessPage from "./CheckoutSuccessPage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: "Order Confirmed",
    description: "Your Pet Memo Shop order has been received.",
    path: "/checkout/success",
    locale,
    noIndex: true,
  });
}

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-16 text-center text-muted">Loading…</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}
