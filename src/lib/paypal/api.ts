import "server-only";

import { getPayPalApiBase, getPayPalClientId, getPayPalClientSecret } from "./config";
import type { ValidatedCheckout } from "@/lib/checkout/types";
import { formatPayPalAmount } from "@/lib/checkout/validate";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const clientId = getPayPalClientId();
  const clientSecret = getPayPalClientSecret();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${getPayPalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };

  return data.access_token;
}

async function paypalFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${getPayPalApiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = (await res.json()) as T & { message?: string; details?: unknown };

  if (!res.ok) {
    throw new Error(data.message ?? `PayPal API error (${res.status})`);
  }

  return data;
}

export async function createPayPalOrder(checkout: ValidatedCheckout): Promise<string> {
  const itemTotal = checkout.itemsTotal + checkout.giftBoxAmount;

  const paypalItems = checkout.items.map((item) => ({
    name: item.title.slice(0, 127),
    unit_amount: {
      currency_code: checkout.currency,
      value: formatPayPalAmount(item.unitPrice),
    },
    quantity: String(item.quantity),
    sku: item.productSlug,
  }));

  if (checkout.giftBox) {
    paypalItems.push({
      name: "Premium Gift Box",
      unit_amount: {
        currency_code: checkout.currency,
        value: formatPayPalAmount(checkout.giftBoxAmount),
      },
      quantity: "1",
      sku: "gift-box",
    });
  }

  const breakdown: Record<string, { currency_code: string; value: string }> = {
    item_total: {
      currency_code: checkout.currency,
      value: formatPayPalAmount(itemTotal),
    },
  };

  if (checkout.discountAmount > 0) {
    breakdown.discount = {
      currency_code: checkout.currency,
      value: formatPayPalAmount(checkout.discountAmount),
    };
  }

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: checkout.currency,
          value: formatPayPalAmount(checkout.totalAmount),
          breakdown,
        },
        items: paypalItems,
      },
    ],
  };

  const data = await paypalFetch<{ id: string }>("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data.id;
}

export interface PayPalCaptureResult {
  captureId: string;
  payerEmail: string;
  payerName: string;
  amount: number;
  currency: string;
}

export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResult> {
  const data = await paypalFetch<{
    status: string;
    payer?: {
      email_address?: string;
      name?: { given_name?: string; surname?: string };
    };
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{
          id: string;
          amount?: { value?: string; currency_code?: string };
        }>;
      };
      shipping?: {
        name?: { full_name?: string };
        address?: {
          address_line_1?: string;
          address_line_2?: string;
          admin_area_2?: string;
          admin_area_1?: string;
          postal_code?: string;
          country_code?: string;
        };
      };
    }>;
  }>(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  if (data.status !== "COMPLETED") {
    throw new Error("Payment was not completed");
  }

  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  if (!capture?.id) {
    throw new Error("Missing PayPal capture ID");
  }

  const given = data.payer?.name?.given_name ?? "";
  const surname = data.payer?.name?.surname ?? "";
  const payerName = `${given} ${surname}`.trim();

  return {
    captureId: capture.id,
    payerEmail: data.payer?.email_address ?? "",
    payerName,
    amount: parseFloat(capture.amount?.value ?? "0"),
    currency: capture.amount?.currency_code ?? "USD",
  };
}
