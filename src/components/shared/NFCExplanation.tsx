import { Link } from "@/i18n/navigation";
import { Smartphone, QrCode, ImageIcon, Video, BookOpen, MessageSquare } from "lucide-react";

export function NFCExplanation() {
  const steps = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "NFC Chip Inside",
      desc: "A small NFC chip is embedded in the card or tag during production — no battery required.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Tap with Smartphone",
      desc: "Hold a compatible phone near the keepsake. No app download is required on modern phones.",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Backup",
      desc: "Every keepsake includes a QR code so anyone can open the same memorial page with a camera.",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Photos & Videos",
      desc: "The digital page can include a photo gallery, video links, name, dates, and their story.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Update Anytime",
      desc: "You can update photos and memorial text later — the physical NFC/QR link stays the same.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Optional Guestbook",
      desc: "Friends and family can leave messages on the private digital memorial page.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-3xl text-text text-center mb-3">
          How the NFC Memorial Keepsake Works
        </h2>
        <p className="text-center text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Tap or scan to open a private digital tribute. Learn the difference between{" "}
          <Link href="/blog/nfc-vs-qr-code-pet-memorial" className="text-gold hover:underline">
            NFC and QR codes
          </Link>
          , or start with our{" "}
          <Link href="/blog/nfc-pet-memorial-cards-how-they-work" className="text-gold hover:underline">
            NFC memorial cards guide
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="text-center p-5 rounded-xl bg-bg">
              <div className="w-12 h-12 rounded-full bg-highlight text-gold flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <h3 className="font-medium text-text mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/digital-pet-memorial" className="text-gold hover:underline">
            Digital Pet Memorial overview
          </Link>
          <Link href="/collections/nfc-memorial-cards" className="text-gold hover:underline">
            Shop NFC memorial tags
          </Link>
          <Link href="/blog/carbon-fiber-nfc-memorial-tag-guide" className="text-gold hover:underline">
            Carbon fiber tag guide
          </Link>
          <Link href="/blog/how-to-create-a-digital-pet-memorial-page" className="text-gold hover:underline">
            Create a digital tribute page
          </Link>
        </div>
      </div>
    </section>
  );
}
