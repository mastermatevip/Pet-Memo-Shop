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
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-3">{copy.title ?? fallback.title}</h1>
      <p className="text-muted mb-8 leading-relaxed">{copy.intro ?? fallback.intro}</p>

      {submitted ? (
        <div className="p-8 bg-highlight rounded-2xl text-center">
          <p className="text-text font-medium">{copy.thanks ?? fallback.thanks}</p>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{copy.name}</label>
            <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{copy.email}</label>
            <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{copy.subject}</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold">
              {(copy.subjects ?? fallback.subjects).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">{copy.message}</label>
            <textarea rows={5} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
          </div>
          <Button type="submit" size="lg">{copy.send ?? fallback.send}</Button>
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
