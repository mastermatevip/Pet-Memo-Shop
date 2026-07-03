export type PayPalMode = "sandbox" | "live";

export function getPayPalMode(): PayPalMode {
  return process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";
}

export function getPayPalApiBase(): string {
  return getPayPalMode() === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function getPayPalClientId(): string {
  return (
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim() ||
    process.env.PAYPAL_CLIENT_ID?.trim() ||
    ""
  );
}

export function getPayPalClientSecret(): string {
  return process.env.PAYPAL_CLIENT_SECRET?.trim() ?? "";
}

export function isPayPalConfigured(): boolean {
  return Boolean(getPayPalClientId() && getPayPalClientSecret());
}
