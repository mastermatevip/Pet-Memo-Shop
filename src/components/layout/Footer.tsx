import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BRAND, PAYMENT_METHODS } from "@/config/brand";
import { BrandLogo } from "@/components/layout/BrandLogo";

const collectionSlugs = [
  "pet-memorial-gifts",
  "dog-memorial-gifts",
  "cat-memorial-gifts",
  "pet-memorial-jewelry",
  "pet-urns",
  "nfc-memorial-cards",
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const customerSupport = [
    { href: "/contact" as const, label: t("links.contact") },
    { href: "/track-order" as const, label: t("links.trackOrder") },
    { href: "/shipping-policy" as const, label: t("links.shipping") },
    { href: "/returns-refunds" as const, label: t("links.returns") },
    { href: "/faqs" as const, label: t("links.faqs") },
  ];

  const infoLinks = [
    { href: "/about" as const, label: t("links.about") },
    { href: "/blog" as const, label: t("links.blog") },
    { href: "/reviews" as const, label: t("links.reviews") },
    { href: "/wholesale" as const, label: t("links.wholesale") },
    { href: "/privacy-policy" as const, label: t("links.privacy") },
    { href: "/terms-of-service" as const, label: t("links.terms") },
  ];

  return (
    <footer className="bg-btn text-footer-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="inline-block bg-bg rounded-xl p-2 mb-3">
              <BrandLogo variant="icon" href="/" />
            </div>
            <p className="text-footer-muted text-sm leading-relaxed mb-4">{t("tagline")}</p>
            <div className="flex gap-4">
              {[
                { href: "https://instagram.com/petmemoshop", label: "Instagram", text: "IG" },
                { href: "https://facebook.com/petmemoshop", label: "Facebook", text: "FB" },
                { href: "https://pinterest.com/petmemoshop", label: "Pinterest", text: "P" },
                { href: "https://tiktok.com/@petmemoshop", label: "TikTok", text: "T" },
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
            <h4 className="text-btn-text font-medium mb-4">{t("customerSupport")}</h4>
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
            <h4 className="text-btn-text font-medium mb-4">{t("shop")}</h4>
            <ul className="space-y-2.5">
              {collectionSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/collections/${slug}`}
                    className="text-footer-muted hover:text-btn-text text-sm transition-colors"
                  >
                    {tNav(`collections.${slug}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-btn-text font-medium mb-4">{t("information")}</h4>
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
            &copy; {new Date().getFullYear()} {BRAND.name}. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
