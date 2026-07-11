"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { normalizeImageSrc } from "@/lib/images";

interface AdminImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
  children: React.ReactNode;
}

export function AdminImagePreview({ src, alt = "", className, children }: AdminImagePreviewProps) {
  const [open, setOpen] = useState(false);
  const normalized = normalizeImageSrc(src);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!normalized) return null;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        title="点击放大"
        className={className ?? "cursor-zoom-in"}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "图片预览"}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setOpen(false)}
            aria-label="关闭"
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={normalized}
            alt={alt}
            className="max-h-[90vh] max-w-[min(90vw,1200px)] object-contain rounded-lg shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
