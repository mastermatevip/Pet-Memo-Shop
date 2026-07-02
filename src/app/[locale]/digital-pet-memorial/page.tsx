import Image from "next/image";
import { Check, Smartphone, ImageIcon, BookOpen, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "@/components/shared/FAQSection";
import { Newsletter } from "@/components/shared/Newsletter";
import { digitalMemorialFields } from "@/data/homepage";
import { buildMetadata } from "@/lib/seo";
import { BRAND } from "@/config/brand";

export const metadata = buildMetadata({
  title: "Online Pet Memorial | Create a Digital Pet Memorial Page",
  description:
    "Create an online pet memorial page with photos, videos, and family messages. Access via premium carbon fiber NFC tag or QR code. Make a pet memorial online with Pet Memo Shop.",
  path: "/digital-pet-memorial",
});

const howItWorks = [
  { icon: <Smartphone className="w-6 h-6" />, title: "Tap or Scan", desc: "Tap your NFC memorial tag or scan the QR code to open the online page on any smartphone." },
  { icon: <ImageIcon className="w-6 h-6" />, title: "Rich Media", desc: "Build a digital pet memorial with photos, videos, and a full gallery of cherished moments." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Their Story", desc: "Write their story, share favorite memories, and add family messages to the memorial page." },
  { icon: <MessageSquare className="w-6 h-6" />, title: "Guestbook", desc: "Optional guestbook so friends and family can leave messages on the online memorial." },
];

const pricingOptions = [
  {
    name: "Digital Page Only",
    price: "$19.99",
    desc: "Standalone online pet memorial with unique link and QR code. Create a pet memorial online in minutes.",
    href: "/products/digital-memorial-page-standalone",
    featured: false,
  },
  {
    name: "Carbon Fiber NFC Tag",
    price: "$69.99",
    desc: "Premium carbon fiber memorial tag with embedded NFC chip + full online pet memorial page. Our signature keepsake.",
    href: "/products/carbon-fiber-nfc-memorial-tag",
    featured: true,
  },
  {
    name: "NFC Memorial Card",
    price: "$34.99",
    desc: "Classic memorial card with NFC chip + digital page. A thoughtful entry-level physical and digital tribute.",
    href: "/products/nfc-pet-memorial-card",
    featured: false,
  },
];

const faqs = [
  {
    question: "What is an online pet memorial?",
    answer:
      "An online pet memorial is a dedicated web page honoring your beloved companion. It preserves photos, videos, their story, dates, and messages from family — accessible anytime via link, QR code, or NFC tap.",
  },
  {
    question: "How do I create a pet memorial online?",
    answer:
      "Choose a standalone digital page or pair it with a carbon fiber NFC tag or memorial card. Upload your pet's photo, enter their details, and build your memorial with photos, videos, and story. We send a proof before your physical tag ships.",
  },
  {
    question: "What is the carbon fiber NFC memorial tag?",
    answer:
      "Our premium carbon fiber tag embeds an NFC chip linked to your pet's online memorial. Tap with a smartphone to open the page instantly. It's durable, lightweight, and can be worn or displayed beside an urn or photo frame.",
  },
  {
    question: "Can I update the memorial page after creation?",
    answer: "Yes. Add photos, update stories, and edit messages at any time through your account dashboard.",
  },
  {
    question: "Do I need an app?",
    answer: "No app is required. The online pet memorial opens directly in your phone's web browser.",
  },
  {
    question: "Can family members contribute?",
    answer: "Yes. Invite family and friends to add photos and messages. The optional guestbook allows visitors to leave notes.",
  },
];

export default function DigitalMemorialPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-highlight via-bg to-highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-sm font-medium uppercase tracking-wider mb-3">
                {BRAND.name} Digital Memorial
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-text leading-tight mb-6">
                Create an Online Pet Memorial
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-4">
                Preserve your companion&apos;s story in a beautiful online pet memorial page. Share photos, videos, and loving messages — accessible anytime via NFC tap or QR code.
              </p>
              <p className="text-muted text-base leading-relaxed mb-8">
                Pair your digital page with our premium <strong className="text-text font-medium">carbon fiber NFC memorial tag</strong> — a durable pet memorial tag you can wear, display, or keep beside their urn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/products/carbon-fiber-nfc-memorial-tag" size="lg">
                  Shop Carbon Fiber NFC Tag
                </Button>
                <Button href="/products/digital-memorial-page-standalone" variant="outline" size="lg">
                  Create Digital Page
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop"
                alt="online pet memorial page with photos and loving messages"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-text mb-6">What Is a Digital Pet Memorial?</h2>
          <p className="text-muted text-lg leading-relaxed mb-4">
            A digital pet memorial is an online page dedicated to honoring your beloved companion. Unlike a single photo frame, it holds their full story — photos, videos, dates, and messages from everyone who loved them.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            {BRAND.name} makes it simple to <strong className="text-text font-medium">make a pet memorial online</strong>, then keep it close with a physical NFC tag or card that opens the page with one tap.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Premium Carbon Fiber NFC Tag"
            subtitle="Our signature digital memorial keepsake — durable, elegant, and always connected to their story."
          />
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-highlight">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
                alt="carbon fiber NFC pet memorial tag engraved with pet name"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              {[
                "Real carbon fiber — lightweight, scratch-resistant, built to last",
                "Embedded NFC chip opens your online memorial instantly",
                "Laser-engraved with your pet's name and memorial dates",
                "QR code backup on every tag",
                "Wear as a pet memorial dog tag or display beside urn and frame",
                "Includes full digital memorial page setup",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted">{item}</span>
                </div>
              ))}
              <Button href="/products/carbon-fiber-nfc-memorial-tag" className="mt-4">
                View Carbon Fiber NFC Tag
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How NFC & QR Code Access Works" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.title} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-highlight text-gold flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-medium text-text mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Can Be Included" subtitle="Build a rich online tribute with everything that made your companion special." />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {digitalMemorialFields.map((field) => (
              <div key={field} className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm text-muted">{field}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Example Online Memorial Layout" />
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            <div className="bg-highlight p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-bg-secondary mx-auto mb-4 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop"
                  alt="example pet photo on online memorial page"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-text">Max</h3>
              <p className="text-light text-sm mt-1">2012 – 2025 · Beloved Golden Retriever</p>
            </div>
            <div className="p-8">
              <p className="text-muted leading-relaxed italic text-center mb-6">
                &ldquo;Max brought sunshine into every room. His wagging tail and gentle eyes reminded us daily that love comes in the simplest forms.&rdquo;
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-highlight relative overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-${i === 1 ? "1587300003388-59208cc962cb" : i === 2 ? "1548199973-03cce0bbc87b" : "1601758228041-f3b2795255f1"}?w=200&h=200&fit=crop`}
                      alt={`memorial photo ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How to Order" />
          <div className="space-y-6">
            {[
              { step: 1, text: "Choose a carbon fiber NFC tag, memorial card, or standalone digital page" },
              { step: 2, text: "Upload your pet's photo and enter their name and dates" },
              { step: 3, text: "Build your online pet memorial with photos, videos, and story" },
              { step: 4, text: "Review and approve your design proof" },
              { step: 5, text: "Receive your keepsake and share the memorial page with family" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-btn text-btn-text flex items-center justify-center font-serif flex-shrink-0">
                  {item.step}
                </div>
                <p className="text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Pricing Options" subtitle="Start with a digital page only, or pair it with a physical NFC keepsake." />
          <div className="grid md:grid-cols-3 gap-6">
            {pricingOptions.map((option) => (
              <div
                key={option.name}
                className={`rounded-2xl p-6 border text-center relative ${
                  option.featured
                    ? "bg-btn text-btn-text border-btn shadow-lg scale-[1.02]"
                    : "bg-card border-border"
                }`}
              >
                {option.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gold text-btn-text text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3" /> Signature
                  </span>
                )}
                <h3 className={`font-serif text-xl mb-2 ${option.featured ? "text-btn-text" : "text-text"}`}>
                  {option.name}
                </h3>
                <p className="text-2xl font-semibold text-gold mb-3">{option.price}</p>
                <p className={`text-sm leading-relaxed mb-5 ${option.featured ? "text-highlight" : "text-muted"}`}>
                  {option.desc}
                </p>
                <Button
                  href={option.href}
                  variant={option.featured ? "secondary" : "primary"}
                  size="sm"
                  className="w-full"
                >
                  View Product
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      <section className="py-16 bg-btn text-btn-text text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl mb-4">Keep Their Story Close</h2>
          <p className="text-highlight mb-8 leading-relaxed">
            Create an online pet memorial that honors your beloved companion — with a premium carbon fiber NFC tag or a classic memorial card.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/products/carbon-fiber-nfc-memorial-tag" variant="secondary" size="lg">
              Shop Carbon Fiber NFC Tag
            </Button>
            <Button href="/collections/nfc-memorial-cards" variant="outline" size="lg" className="border-footer-border text-btn-text hover:bg-btn-hover">
              View All NFC Keepsakes
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
