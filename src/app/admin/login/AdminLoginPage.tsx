"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "密码错误");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg"
      >
        <p className="text-xs uppercase tracking-wider text-light">Pet Memo Shop</p>
        <h1 className="font-serif text-2xl mt-1 mb-6">管理后台登录</h1>

        <AdminField label="密码">
          <input
            type="password"
            className={adminInputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </AdminField>

        {error ? <p className="text-sm text-red-700 mt-3">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-btn text-btn-text py-3 text-sm font-medium hover:bg-btn-hover disabled:opacity-50"
        >
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
    </div>
  );
}
