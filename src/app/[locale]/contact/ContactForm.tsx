"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";
import contentDe from "@/messages/content/de.json";
import contentEs from "@/messages/content/es.json";
import contentFr from "@/messages/content/fr.json";
import contentZh from "@/messages/content/zh.json";
import type { ContentBundle } from "@/lib/localized-content";

const bundles: Record<string, ContentBundle> = {
  zh: contentZh as ContentBundle,
  de: contentDe as ContentBundle,
  es: contentEs as ContentBundle,
  fr: contentFr as ContentBundle,
};

const fallback = {
  title: "Contact Us",
  intro:
    "We're here to help with orders, personalization questions, and anything else you need. Our team responds within 24 hours.",
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
  send: "Send Message",
  thanks: "Thank you for reaching out. We'll get back to you soon.",
  error: "We couldn't send your message. Please try WhatsApp or email us directly.",
  sending: "Sending...",
  subjects: [
    "Order Inquiry",
    "Personalization Help",
    "Shipping Question",
    "Returns & Refunds",
    "Wholesale Inquiry",
    "Other",
  ],
};

export default function ContactForm() {
  const locale = useLocale();
  const copy = bundles[locale]?.contact ?? fallback;
  const subjects = copy.subjects ?? fallback.subjects;
  const ui = { ...fallback, ...copy };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0] ?? "Other");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-3">{ui.title}</h1>
      <p className="text-muted mb-8 leading-relaxed">{ui.intro}</p>

      {status === "success" ? (
        <div className="p-8 bg-highlight rounded-2xl text-center">
          <p className="text-text font-medium">{ui.thanks}</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{ui.name}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{ui.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{ui.subject}</label>
            <select
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {subjects.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{ui.message}</label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
          </div>
          {status === "error" ? (
            <p className="text-sm text-red-600">{ui.error}</p>
          ) : null}
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? ui.sending : ui.send}
          </Button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t border-border space-y-2 text-muted">
        <p>
          WhatsApp:{" "}
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            {BRAND.whatsapp}
          </a>
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${BRAND.email}`} className="text-gold hover:underline">
            {BRAND.email}
          </a>
        </p>
      </div>
    </div>
  );
}
