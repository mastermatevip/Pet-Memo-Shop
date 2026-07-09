import "server-only";

import nodemailer from "nodemailer";
import { getSmtpConfig, isEmailConfigured } from "./config";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn("[email] SMTP not configured — skipping email to", input.to);
    return;
  }

  const config = getSmtpConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transport.sendMail({
    from: config.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}
