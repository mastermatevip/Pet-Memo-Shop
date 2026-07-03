"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CartToastProps {
  message: string | null;
  onClear: () => void;
}

export function CartToast({ message, onClear }: CartToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      onClear();
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] rounded-full bg-btn text-btn-text px-5 py-3 text-sm font-medium shadow-lg transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}
      role="status"
    >
      {message}
    </div>
  );
}
