"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-4xl text-text mb-3">Contact Us</h1>
      <p className="text-muted mb-8 leading-relaxed">
        We&apos;re here to help with orders, personalization questions, and anything else you need. Our team responds within 24 hours.
      </p>

      {submitted ? (
        <div className="p-8 bg-highlight rounded-2xl text-center">
          <p className="text-text font-medium">Thank you for reaching out. We&apos;ll get back to you soon.</p>
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
            <label className="block text-sm font-medium text-text mb-1.5">Name</label>
            <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Email</label>
            <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Subject</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold">
              <option>Order Inquiry</option>
              <option>Personalization Help</option>
              <option>Shipping Question</option>
              <option>Returns & Refunds</option>
              <option>Wholesale Inquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Message</label>
            <textarea rows={5} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
          </div>
          <Button type="submit" size="lg">Send Message</Button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t border-border space-y-2 text-muted">
        <p>Email: {BRAND.email}</p>
        <p>Phone: {BRAND.phone}</p>
      </div>
    </div>
  );
}
