"use client";

import { useState } from "react";

interface Props {
  slug: string;
}

export function MemorialGuestbookForm({ slug }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const res = await fetch(`/api/memorial/${encodeURIComponent(slug)}/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setName("");
    setMessage("");
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-xl bg-highlight p-6 text-center text-sm text-muted">
        Thank you for your message. It will appear after we review it.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Your message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold resize-none"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-600">Unable to send your message. Please try again.</p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Leave a Message"}
      </button>
    </form>
  );
}
