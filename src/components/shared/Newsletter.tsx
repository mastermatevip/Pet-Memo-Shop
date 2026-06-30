"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-20 bg-highlight">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-text mb-3">
          Gentle Ideas for Remembering a Beloved Pet
        </h2>
        <p className="text-muted text-lg mb-8 leading-relaxed">
          Receive memorial gift ideas, pet remembrance guides, and thoughtful ways to honor a companion.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            setEmail("");
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-3 rounded-full border border-border bg-card text-text placeholder:text-light focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
