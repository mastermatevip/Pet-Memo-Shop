import { buildMetadata } from "@/lib/seo";
import { TrackOrderForm } from "@/components/track-order/TrackOrderForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildMetadata({
    title: "Track Your Order",
    description: "Track your Pet Memo Shop memorial gift order status and delivery.",
    path: "/track-order",
    locale,
    noIndex: true,
  });
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-3 text-center">Track Your Order</h1>
      <p className="text-muted text-center mb-8">
        Enter your order number and email to check your delivery status.
      </p>
      <TrackOrderForm />
    </div>
  );
}
