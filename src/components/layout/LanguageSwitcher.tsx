"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, localeShortNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({ className, variant = "desktop" }: LanguageSwitcherProps) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function select(nextLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  if (variant === "mobile") {
    return (
      <div className={cn("space-y-2 py-2", className)}>
        <p className="text-xs uppercase tracking-wider text-light font-medium">{t("label")}</p>
        <div className="grid grid-cols-2 gap-2">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => select(code)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm text-left transition-colors",
                code === locale
                  ? "border-gold bg-highlight text-text font-medium"
                  : "border-border bg-card text-muted hover:border-gold hover:text-text"
              )}
            >
              {localeNames[code]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        aria-label={t("switchTo")}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-3 py-1.5 text-sm font-medium text-text shadow-sm hover:border-gold hover:bg-highlight transition-colors"
      >
        <Globe className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
        <span className="sm:hidden">{localeShortNames[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 text-muted transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 top-full z-[60] mt-2 min-w-[10.5rem] overflow-hidden rounded-xl border border-border bg-card py-1 shadow-lg"
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => select(code)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left transition-colors",
                  code === locale
                    ? "bg-highlight text-text font-medium"
                    : "text-muted hover:bg-highlight hover:text-text"
                )}
              >
                <span className="w-8 text-xs font-semibold uppercase text-gold">{localeShortNames[code]}</span>
                <span>{localeNames[code]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
