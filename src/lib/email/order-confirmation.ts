import "server-only";

import { BRAND } from "@/config/brand";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import { sendEmail } from "./send";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;
}

function buildOrderConfirmationContent(order: Order) {
  const siteUrl = getSiteUrl();
  const trackUrl = `${siteUrl}/track-order`;
  const accountUrl = `${siteUrl}/account`;

  const itemRows = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #DED0BD;">${escapeHtml(item.title)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #DED0BD;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #DED0BD;text-align:right;">${formatPrice(item.unitPrice, order.currency)}</td>
        </tr>`
    )
    .join("");

  const itemLines = order.items
    .map(
      (item) =>
        `- ${item.title} x${item.quantity} — ${formatPrice(item.unitPrice * item.quantity, order.currency)}`
    )
    .join("\n");

  const subject = `Order Confirmation — ${order.orderNumber} | ${BRAND.name}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F8F3EA;font-family:Inter,Arial,sans-serif;color:#3A2E25;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F3EA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DED0BD;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 16px;">
              <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;color:#3A2E25;">Thank you for your order</h1>
              <p style="margin:0;color:#6B5B4F;font-size:15px;line-height:1.6;">
                Hi ${escapeHtml(order.customerName)}, we received your order and will begin preparing your memorial keepsake.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 16px;">
              <p style="margin:0 0 4px;font-size:13px;color:#6B5B4F;">Order number</p>
              <p style="margin:0;font-size:18px;font-weight:600;font-family:monospace;">${escapeHtml(order.orderNumber)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                <thead>
                  <tr>
                    <th align="left" style="padding:8px 0;border-bottom:2px solid #DED0BD;">Item</th>
                    <th align="center" style="padding:8px 0;border-bottom:2px solid #DED0BD;">Qty</th>
                    <th align="right" style="padding:8px 0;border-bottom:2px solid #DED0BD;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" align="right" style="padding:12px 0 0;font-weight:600;">Total</td>
                    <td align="right" style="padding:12px 0 0;font-weight:600;">${formatPrice(order.totalAmount, order.currency)}</td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 16px;">
              <p style="margin:0 0 4px;font-size:13px;color:#6B5B4F;">Shipping to</p>
              <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-line;">${escapeHtml(order.shippingAddress)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#3A2E25;">
                For personalized items, we will send a design proof for your review before production.
                You can track your order anytime using your order number and email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <a href="${trackUrl}" style="display:inline-block;background:#1F1A17;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;margin-right:8px;">Track Order</a>
              <a href="${accountUrl}" style="display:inline-block;color:#3A2E25;text-decoration:underline;font-size:14px;">My Account</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;background:#F3E8D8;border-top:1px solid #DED0BD;">
              <p style="margin:0;font-size:12px;color:#6B5B4F;line-height:1.6;">
                Questions? Reply to this email or contact us at
                <a href="mailto:${BRAND.email}" style="color:#3A2E25;">${BRAND.email}</a>
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#6B5B4F;">${BRAND.name} · ${siteUrl}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Thank you for your order, ${order.customerName}!

Order number: ${order.orderNumber}

Items:
${itemLines}

Total: ${formatPrice(order.totalAmount, order.currency)}

Shipping to:
${order.shippingAddress}

For personalized items, we will send a design proof for your review before production.

Track your order: ${trackUrl}
My account: ${accountUrl}

Questions? Contact us at ${BRAND.email}

${BRAND.name}
${siteUrl}`;

  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  if (!order.customerEmail?.trim()) return;

  const { subject, html, text } = buildOrderConfirmationContent(order);

  await sendEmail({
    to: order.customerEmail.trim(),
    subject,
    html,
    text,
  });
}

/** Fire-and-forget — never blocks order creation on email failure. */
export function queueOrderConfirmationEmail(order: Order): void {
  sendOrderConfirmationEmail(order).catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[email] Failed to send confirmation for ${order.orderNumber}:`, message);
  });
}
