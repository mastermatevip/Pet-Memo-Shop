"use client";

import { useState } from "react";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useCart } from "@/components/cart/CartProvider";

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
  const { itemCount } = useCart();
  const [shopOpen, setShopOpen] = useState(false);

  const mainLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/digital-pet-memorial" as const, label: t("digitalMemorial") },
    { href: "/best-sellers" as const, label: t("bestSellers") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16 md:h-18">
          <BrandLogo variant="full" priority />

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={t("search")}
              className="p-2 text-text hover:text-gold transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              aria-label={t("account")}
              className="p-2 text-text hover:text-gold transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              aria-label={t("cart")}
              className="relative p-2 text-text hover:text-gold transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-gold text-btn-text text-[10px] rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Always-visible nav — do not use Tailwind `hidden` breakpoints here */}
        <nav className="site-header-nav flex flex-wrap items-center gap-x-4 gap-y-2 pb-3 pt-0 text-sm font-medium">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text hover:text-gold transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-text hover:text-gold transition-colors whitespace-nowrap"
              onClick={() => setShopOpen((open) => !open)}
            >
              {t("shop")}
              <ChevronDown className="w-4 h-4" />
            </button>
            {shopOpen ? (
              <div className="absolute left-0 top-full z-50 pt-2 w-64">
                <div className="bg-card rounded-xl shadow-lg border border-border py-2">
                  {collectionSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={`/collections/${slug}`}
                      className="block px-4 py-2.5 text-sm text-muted hover:bg-highlight hover:text-text transition-colors"
                      onClick={() => setShopOpen(false)}
                    >
                      {t(`collections.${slug}`)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
