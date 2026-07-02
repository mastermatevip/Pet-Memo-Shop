"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({ className, variant = "desktop" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function onChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale as Locale });
  }

  if (variant === "mobile") {
    return (
      <label className={cn("flex items-center gap-2 py-2", className)}>
        <Globe className="w-4 h-4 text-gold shrink-0" />
        <select
          aria-label="Language"
          value={locale}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm text-text bg-card border border-border rounded-lg px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {locales.map((code) => (
            <option key={code} value={code}>
              {localeNames[code]}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1.5 shrink-0 rounded-full border border-border bg-card px-2.5 py-1.5 cursor-pointer hover:border-gold transition-colors",
        className
      )}
    >
      <Globe className="w-4 h-4 text-gold shrink-0" />
      <select
        aria-label="Language"
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm text-text bg-transparent border-none cursor-pointer focus:outline-none pr-1 max-w-[5.5rem] truncate"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
