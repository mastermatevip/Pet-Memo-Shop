import { NextResponse } from "next/server";
import type { CheckoutInput } from "@/lib/checkout/types";
import { validateCheckout } from "@/lib/checkout/validate";
import { createPayPalOrder } from "@/lib/paypal/api";
import { isPayPalConfigured } from "@/lib/paypal/config";

export async function POST(request: Request) {
  if (!isPayPalConfigured()) {
    return NextResponse.json({ error: "PayPal is not configured" }, { status: 503 });
  }

  try {
    const body = (await request.json()) as CheckoutInput;
    const validated = validateCheckout(body);
    const id = await createPayPalOrder(validated);
    return NextResponse.json({ id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create PayPal order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
