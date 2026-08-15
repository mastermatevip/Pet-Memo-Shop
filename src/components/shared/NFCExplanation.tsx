import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Smartphone, QrCode, ImageIcon, BookOpen, MessageSquare } from "lucide-react";

export function NFCExplanation() {
  const t = useTranslations("nfcModule");

  const steps = [
    { key: "chip", icon: <Smartphone className="w-6 h-6" /> },
    { key: "tap", icon: <Smartphone className="w-6 h-6" /> },
    { key: "qr", icon: <QrCode className="w-6 h-6" /> },
    { key: "media", icon: <ImageIcon className="w-6 h-6" /> },
    { key: "update", icon: <BookOpen className="w-6 h-6" /> },
    { key: "guestbook", icon: <MessageSquare className="w-6 h-6" /> },
  ] as const;

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-3xl text-text text-center mb-3">{t("title")}</h2>
        <p className="text-center text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("introBefore")}{" "}
          <Link href="/blog/nfc-vs-qr-code-pet-memorial" className="text-gold hover:underline">
            {t("nfcVsQr")}
          </Link>
          {t("introMid")}{" "}
          <Link href="/blog/nfc-pet-memorial-cards-how-they-work" className="text-gold hover:underline">
            {t("cardsGuide")}
          </Link>
          {t("introAfter")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.key} className="text-center p-5 rounded-xl bg-bg">
              <div className="w-12 h-12 rounded-full bg-highlight text-gold flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <h3 className="font-medium text-text mb-2">{t(`steps.${step.key}.title`)}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(`steps.${step.key}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/digital-pet-memorial" className="text-gold hover:underline">
            {t("links.overview")}
          </Link>
          <Link href="/collections/nfc-memorial-cards" className="text-gold hover:underline">
            {t("links.shop")}
          </Link>
          <Link href="/blog/carbon-fiber-nfc-memorial-tag-guide" className="text-gold hover:underline">
            {t("links.carbonGuide")}
          </Link>
          <Link href="/blog/how-to-create-a-digital-pet-memorial-page" className="text-gold hover:underline">
            {t("links.createPage")}
          </Link>
        </div>
      </div>
    </section>
  );
}
