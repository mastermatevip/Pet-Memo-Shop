import { NextResponse } from "next/server";
import { isEmailConfigured } from "@/lib/email/config";
import { sendContactFormEmail } from "@/lib/email/contact";

const MAX = {
  name: 120,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Contact email is not configured on the server." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Partial<Record<keyof typeof MAX, string>>;
  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const subject = data.subject?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await sendContactFormEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send message:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
