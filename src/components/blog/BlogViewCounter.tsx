"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogViewCounterProps {
  slug: string;
  initialCount: number;
  className?: string;
}

export function BlogViewCounter({ slug, initialCount, className }: BlogViewCounterProps) {
  const t = useTranslations("common");
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    const storageKey = `blog-view-${slug}`;
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "1");

    fetch(`/api/blog/${encodeURIComponent(slug)}/view`, { method: "POST" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { viewCount?: number } | null) => {
        if (typeof data?.viewCount === "number") {
          setCount(data.viewCount);
        }
      })
      .catch(() => {
        sessionStorage.removeItem(storageKey);
      });
  }, [slug]);

  return (
    <span className={className}>
      <Eye className="inline w-3.5 h-3.5 mr-1 -mt-0.5" aria-hidden="true" />
      {t("viewCount", { count })}
    </span>
  );
}
