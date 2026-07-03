"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import type { CheckoutInput } from "@/lib/checkout/types";
import { getPayPalClientId } from "@/lib/paypal/config";

interface Props {
  checkout: CheckoutInput;
  disabled?: boolean;
}

export function PayPalCheckoutButtons({ checkout, disabled = false }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const clientId = getPayPalClientId();

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        PayPal is not configured yet. Please set{" "}
        <code className="font-mono">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> and{" "}
        <code className="font-mono">PAYPAL_CLIENT_SECRET</code> in your environment.
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      {error ? (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      ) : null}

      <div className={disabled || processing ? "opacity-60 pointer-events-none" : ""}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill", label: "paypal" }}
          disabled={disabled || processing}
          createOrder={async () => {
            setError(null);
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(checkout),
            });

            const data = (await res.json()) as { id?: string; error?: string };
            if (!res.ok || !data.id) {
              throw new Error(data.error ?? "Unable to start PayPal checkout");
            }

            return data.id;
          }}
          onApprove={async (data) => {
            setProcessing(true);
            setError(null);

            try {
              const res = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderID: data.orderID,
                  checkout,
                }),
              });

              const result = (await res.json()) as { orderNumber?: string; error?: string };
              if (!res.ok || !result.orderNumber) {
                throw new Error(result.error ?? "Payment capture failed");
              }

              router.push(`/checkout/success?order=${encodeURIComponent(result.orderNumber)}`);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Payment failed");
              setProcessing(false);
            }
          }}
          onError={() => {
            setError("PayPal encountered an error. Please try again.");
            setProcessing(false);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
