import { Check, Smartphone, ImageIcon, BookOpen, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "@/components/shared/FAQSection";
import { Newsletter } from "@/components/shared/Newsletter";
import { SiteImage } from "@/components/shared/SiteImage";
import type {
  DigitalMemorialHowIcon,
  DigitalMemorialLandingContent,
} from "@/lib/cms/digital-memorial-landing-types";

const howIcons: Record<DigitalMemorialHowIcon, React.ReactNode> = {
  smartphone: <Smartphone className="w-6 h-6" />,
  image: <ImageIcon className="w-6 h-6" />,
  book: <BookOpen className="w-6 h-6" />,
  message: <MessageSquare className="w-6 h-6" />,
};

interface Props {
  content: DigitalMemorialLandingContent;
}

export function DigitalMemorialLandingPage({ content }: Props) {
  const {
    hero,
    whatIs,
    carbonFiber,
    howItWorks,
    included,
    example,
    orderSteps,
    pricing,
    faqs,
    finalCta,
  } = content;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-highlight via-bg to-highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold text-sm font-medium uppercase tracking-wider mb-3">
                {hero.eyebrow}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-text leading-tight mb-6">
                {hero.h1}
              </h1>
              <p className="text-muted text-lg leading-relaxed mb-4">{hero.subtitle}</p>
              <p className="text-muted text-base leading-relaxed mb-8">{hero.body}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={hero.primaryCta.href} size="lg">
                  {hero.primaryCta.label}
                </Button>
                <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <SiteImage
                src={hero.image.src}
                alt={hero.image.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-text mb-6">{whatIs.title}</h2>
          {whatIs.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-muted text-lg leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={carbonFiber.title} subtitle={carbonFiber.subtitle} />
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-highlight">
              <SiteImage
                src={carbonFiber.image.src}
                alt={carbonFiber.image.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              {carbonFiber.features.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted">{item}</span>
                </div>
              ))}
              <Button href={carbonFiber.cta.href} className="mt-4">
                {carbonFiber.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={howItWorks.title} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.items.map((item) => (
              <div key={item.title} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-full bg-highlight text-gold flex items-center justify-center mx-auto mb-4">
                  {howIcons[item.icon] ?? howIcons.smartphone}
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
          <SectionHeading title={included.title} subtitle={included.subtitle} />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {included.fields.map((field) => (
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
          <SectionHeading title={example.title} />
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            <div className="bg-highlight p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-bg-secondary mx-auto mb-4 overflow-hidden relative">
                <SiteImage src={example.portraitSrc} alt={example.petName} />
              </div>
              <h3 className="font-serif text-2xl text-text">{example.petName}</h3>
              <p className="text-light text-sm mt-1">{example.dates}</p>
            </div>
            <div className="p-8">
              <p className="text-muted leading-relaxed italic text-center mb-6">
                &ldquo;{example.quote}&rdquo;
              </p>
              <div className="grid grid-cols-3 gap-2">
                {example.gallerySrcs.map((src, index) => (
                  <div key={`${src}-${index}`} className="aspect-square rounded-lg bg-highlight relative overflow-hidden">
                    <SiteImage src={src} alt={`${example.petName} memorial photo ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={orderSteps.title} />
          <div className="space-y-6">
            {orderSteps.steps.map((item) => (
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
          <SectionHeading title={pricing.title} subtitle={pricing.subtitle} />
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.options.map((option) => (
              <div
                key={option.name}
                className={`rounded-2xl p-6 border text-center relative ${
                  option.featured
                    ? "bg-btn text-btn-text border-btn shadow-lg scale-[1.02]"
                    : "bg-card border-border"
                }`}
              >
                {option.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-gold text-btn-text text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3" /> Signature
                  </span>
                ) : null}
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
          <h2 className="font-serif text-3xl mb-4">{finalCta.title}</h2>
          <p className="text-highlight mb-8 leading-relaxed">{finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={finalCta.primaryCta.href} variant="secondary" size="lg">
              {finalCta.primaryCta.label}
            </Button>
            <Button
              href={finalCta.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-footer-border text-btn-text hover:bg-btn-hover"
            >
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
