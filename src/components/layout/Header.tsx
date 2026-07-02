"use client";

import { useState } from "react";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";

const collectionSlugs = [
  "pet-memorial-gifts",
  "dog-memorial-gifts",
  "cat-memorial-gifts",
  "pet-memorial-jewelry",
  "pet-urns",
  "nfc-memorial-cards",
  "memorial-gift-boxes",
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const mainLinks = [
    { href: "/digital-pet-memorial" as const, label: t("digitalMemorial") },
    { href: "/best-sellers" as const, label: t("bestSellers") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <BrandLogo variant="full" priority />

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-muted hover:text-text transition-colors text-sm font-medium">
              {t("home")}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 text-muted hover:text-text transition-colors text-sm font-medium">
                {t("shop")}
                <ChevronDown className="w-4 h-4" />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-card rounded-xl shadow-lg border border-border py-2">
                    {collectionSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/collections/${slug}`}
                        className="block px-4 py-2.5 text-sm text-muted hover:bg-highlight hover:text-text transition-colors"
                      >
                        {t(`collections.${slug}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-text transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />
            <button aria-label={t("search")} className="p-2 text-muted hover:text-text transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label={t("account")} className="hidden sm:block p-2 text-muted hover:text-text transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button aria-label={t("cart")} className="relative p-2 text-muted hover:text-text transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-btn-text text-[10px] rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <select
              aria-label={t("currency")}
              className="hidden md:block text-sm text-muted bg-transparent border-none cursor-pointer focus:outline-none"
              defaultValue="USD"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <button
              aria-label={t("menu")}
              className="lg:hidden p-2 text-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-card border-t border-border",
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        )}
      >
        <nav className="px-4 py-4 space-y-1">
          <Link href="/" className="block py-2.5 text-text font-medium" onClick={() => setMobileOpen(false)}>
            {t("home")}
          </Link>
          <p className="pt-3 pb-1 text-xs uppercase tracking-wider text-light font-medium">{t("shop")}</p>
          {collectionSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/collections/${slug}`}
              className="block py-2 pl-3 text-muted"
              onClick={() => setMobileOpen(false)}
            >
              {t(`collections.${slug}`)}
            </Link>
          ))}
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-text font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border mt-2">
            <LanguageSwitcher variant="mobile" />
          </div>
        </nav>
      </div>
    </header>
  );
}
