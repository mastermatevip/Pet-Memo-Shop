"use client";

import { Link } from "@/i18n/navigation";
import { Package, Mail, User } from "lucide-react";
import { useTranslations } from "next-intl";

export function AccountPageClient() {
  const t = useTranslations("account");

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-highlight text-gold mb-4">
          <User className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-4xl text-text mb-3">{t("title")}</h1>
        <p className="text-muted leading-relaxed">{t("intro")}</p>
      </div>

      <div className="space-y-4">
        <Link
          href="/track-order"
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-gold transition-colors"
        >
          <Package className="w-6 h-6 text-gold shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-text">{t("trackOrder")}</p>
            <p className="text-sm text-muted mt-1">{t("trackOrderDesc")}</p>
          </div>
        </Link>

        <Link
          href="/contact"
          className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-gold transition-colors"
        >
          <Mail className="w-6 h-6 text-gold shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-text">{t("contactSupport")}</p>
            <p className="text-sm text-muted mt-1">{t("contactSupportDesc")}</p>
          </div>
        </Link>
      </div>

      <p className="text-xs text-light text-center mt-8">{t("adminNote")}</p>
    </div>
  );
}
