import Link from "next/link";
import { BRAND, SOCIAL_LINKS, PAYMENT_METHODS } from "@/config/brand";
import { BrandLogo } from "@/components/layout/BrandLogo";

const customerSupport = [
  { href: "/contact", label: "Contact Us" },
  { href: "/track-order", label: "Track Your Order" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns-refunds", label: "Returns & Refunds" },
  { href: "/faqs", label: "FAQs" },
];

const shopLinks = [
  { href: "/collections/pet-memorial-gifts", label: "Pet Memorial Gifts" },
  { href: "/collections/dog-memorial-gifts", label: "Dog Memorial Gifts" },
  { href: "/collections/cat-memorial-gifts", label: "Cat Memorial Gifts" },
  { href: "/collections/pet-memorial-jewelry", label: "Pet Memorial Jewelry" },
  { href: "/collections/pet-urns", label: "Pet Urns" },
  { href: "/collections/nfc-memorial-cards", label: "NFC Memorial Tags" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-btn text-footer-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="inline-block bg-bg rounded-xl p-2 mb-3">
              <BrandLogo variant="icon" href="/" />
            </div>
            <p className="text-footer-muted text-sm leading-relaxed mb-4">{BRAND.tagline}</p>
            <div className="flex gap-4">
              {[
                { href: SOCIAL_LINKS.instagram, label: "Instagram", text: "IG" },
                { href: SOCIAL_LINKS.facebook, label: "Facebook", text: "FB" },
                { href: SOCIAL_LINKS.pinterest, label: "Pinterest", text: "P" },
                { href: SOCIAL_LINKS.tiktok, label: "TikTok", text: "T" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-footer-muted hover:text-btn-text transition-colors text-sm font-bold"
                >
                  {social.text}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-btn-text font-medium mb-4">Customer Support</h4>
            <ul className="space-y-2.5">
              {customerSupport.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-footer-muted hover:text-btn-text text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-btn-text font-medium mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-footer-muted hover:text-btn-text text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-btn-text font-medium mb-4">Information</h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-footer-muted hover:text-btn-text text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-footer-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="px-3 py-1 bg-btn-hover rounded text-xs text-footer-muted"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-footer-muted text-sm">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
