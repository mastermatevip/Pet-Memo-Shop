import "server-only";

import { BRAND } from "@/config/brand";
import { sendEmail } from "./send";
import { isEmailConfigured } from "./config";

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getContactInbox(): string {
  return process.env.CONTACT_INBOX?.trim() || BRAND.email;
}

export async function sendContactFormEmail(payload: ContactFormPayload): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error("SMTP is not configured");
  }

  const inbox = getContactInbox();
  const subject = `[Contact] ${payload.subject} — ${payload.name}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F8F3EA;font-family:Inter,Arial,sans-serif;color:#3A2E25;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F3EA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DED0BD;border-radius:12px;">
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;">New contact form message</h1>
              <p style="margin:0 0 8px;"><strong>From:</strong> ${escapeHtml(payload.name)}</p>
              <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
              <p style="margin:0 0 16px;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
              <div style="padding:16px;background:#F3E8D8;border-radius:8px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(payload.message)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `New contact form message

From: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}

${payload.message}`;

  await sendEmail({
    to: inbox,
    replyTo: payload.email,
    subject,
    html,
    text,
  });
}
