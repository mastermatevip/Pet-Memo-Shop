import { NextResponse } from "next/server";
import type { CheckoutInput } from "@/lib/checkout/types";
import { validateCheckout } from "@/lib/checkout/validate";
import { createPaidOrder } from "@/lib/checkout/create-order";
import { capturePayPalOrder } from "@/lib/paypal/api";
import { isPayPalConfigured } from "@/lib/paypal/config";

export async function POST(request: Request) {
  if (!isPayPalConfigured()) {
    return NextResponse.json({ error: "PayPal is not configured" }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { orderID?: string; checkout?: CheckoutInput };

    if (!body.orderID || !body.checkout) {
      return NextResponse.json({ error: "Missing order ID or checkout data" }, { status: 400 });
    }

    const validated = validateCheckout(body.checkout);
    const capture = await capturePayPalOrder(body.orderID);

    if (capture.currency !== validated.currency) {
      return NextResponse.json({ error: "Currency mismatch" }, { status: 400 });
    }

    if (Math.abs(capture.amount - validated.totalAmount) > 0.01) {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 400 });
    }

    const order = createPaidOrder({ checkout: body.checkout, capture });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      order,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to capture payment";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
