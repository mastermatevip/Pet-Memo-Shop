import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { HomepageContent } from "@/lib/cms/types";
import type { DigitalMemorialLandingContent } from "@/lib/cms/digital-memorial-landing-types";
import type { Collection, Product } from "@/types";

export interface PageSection {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface PageContent {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  sections: PageSection[];
  cta?: string;
}

export interface HomepageContentBundle {
  hero?: {
    h1?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
    imageAlt?: string;
  };
  sections?: {
    categories?: { title?: string; subtitle?: string };
    bestSellers?: { title?: string; viewAllLabel?: string };
    nfc?: {
      title?: string;
      description?: string;
      cta?: string;
      imageAlt?: string;
      keyPoints?: string[];
    };
    howItWorks?: { title?: string; subtitle?: string };
    personalization?: { title?: string };
    blog?: { title?: string; viewAllLabel?: string };
  };
  categories?: Record<string, { title?: string; description?: string; imageAlt?: string }>;
  howItWorksSteps?: Record<string, { title?: string; description?: string }>;
  personalizationOptions?: Record<string, { label?: string; description?: string }>;
}

export interface ProductContentBundle {
  title?: string;
  shortDescription?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  story?: string;
}

export interface CollectionContentBundle {
  name?: string;
  h1?: string;
  description?: string;
  intro?: string;
  metaTitle?: string;
  metaDescription?: string;
  imageAlt?: string;
  seoSections?: {
    whatAre?: string;
    whenToChoose?: string;
    personalization?: string;
    whyChoose?: string;
  };
  seoHeadings?: {
    whatAre?: string;
    whenToChoose?: string;
    personalization?: string;
    whyChoose?: string;
  };
  relatedCategories?: string;
  helpfulGuides?: string;
}

export interface BestSellersPageContent {
  title?: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContentBundle {
  homepage?: HomepageContentBundle;
  digitalMemorialLanding?: {
    metaTitle?: string;
    metaDescription?: string;
    hero?: {
      eyebrow?: string;
      h1?: string;
      subtitle?: string;
      body?: string;
      primaryCta?: string;
      secondaryCta?: string;
      imageAlt?: string;
    };
    whatIs?: { title?: string; paragraphs?: string[] };
    carbonFiber?: {
      title?: string;
      subtitle?: string;
      imageAlt?: string;
      features?: string[];
      cta?: string;
    };
    howItWorks?: {
      title?: string;
      items?: Array<{ title?: string; desc?: string }>;
    };
    included?: { title?: string; subtitle?: string; fields?: string[] };
    example?: never;
    sampleLinks?: {
      title?: string;
      subtitle?: string;
      linkLabel?: string;
      items?: Array<{ title?: string }>;
    };
    orderSteps?: { title?: string; steps?: string[] };
    pricing?: {
      title?: string;
      subtitle?: string;
      options?: Array<{ name?: string; price?: string; desc?: string }>;
    };
    faqs?: Array<{ question?: string; answer?: string }>;
    finalCta?: {
      title?: string;
      subtitle?: string;
      primaryCta?: string;
      secondaryCta?: string;
    };
  };
  products?: Record<string, ProductContentBundle>;
  collections?: Record<string, CollectionContentBundle>;
  pages?: Record<string, PageContent>;
  bestSellersPage?: BestSellersPageContent;
  contact?: {
    title?: string;
    intro?: string;
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    send?: string;
    thanks?: string;
    subjects?: string[];
  };
}

export async function loadContentBundle(locale: string): Promise<ContentBundle | null> {
  if (locale === routing.defaultLocale) return null;
  if (!routing.locales.includes(locale as Locale)) return null;

  try {
    const mod = await import(`@/messages/content/${locale}.json`);
    return mod.default as ContentBundle;
  } catch {
    return null;
  }
}

export function localizeHomepage(base: HomepageContent, bundle: ContentBundle | null): HomepageContent {
  if (!bundle?.homepage) return base;

  const hp = bundle.homepage;
  const sections = hp.sections ?? {};

  return {
    ...base,
    hero: {
      ...base.hero,
      h1: hp.hero?.h1 ?? base.hero.h1,
      subtitle: hp.hero?.subtitle ?? base.hero.subtitle,
      primaryCta: {
        ...base.hero.primaryCta,
        label: hp.hero?.primaryCta ?? base.hero.primaryCta.label,
      },
      secondaryCta: {
        ...base.hero.secondaryCta,
        label: hp.hero?.secondaryCta ?? base.hero.secondaryCta.label,
      },
      image: {
        ...base.hero.image,
        alt: hp.hero?.imageAlt ?? base.hero.image.alt,
      },
    },
    sections: {
      ...base.sections,
      categories: {
        ...base.sections.categories,
        title: sections.categories?.title ?? base.sections.categories.title,
        subtitle: sections.categories?.subtitle ?? base.sections.categories.subtitle,
      },
      bestSellers: {
        ...base.sections.bestSellers,
        title: sections.bestSellers?.title ?? base.sections.bestSellers.title,
        viewAllLabel: sections.bestSellers?.viewAllLabel ?? base.sections.bestSellers.viewAllLabel,
      },
      nfc: {
        ...base.sections.nfc,
        title: sections.nfc?.title ?? base.sections.nfc.title,
        description: sections.nfc?.description ?? base.sections.nfc.description,
        cta: {
          ...base.sections.nfc.cta,
          label: sections.nfc?.cta ?? base.sections.nfc.cta.label,
        },
        image: {
          ...base.sections.nfc.image,
          alt: sections.nfc?.imageAlt ?? base.sections.nfc.image.alt,
        },
        keyPoints: sections.nfc?.keyPoints ?? base.sections.nfc.keyPoints,
      },
      howItWorks: {
        ...base.sections.howItWorks,
        title: sections.howItWorks?.title ?? base.sections.howItWorks.title,
        subtitle: sections.howItWorks?.subtitle ?? base.sections.howItWorks.subtitle,
      },
      personalization: {
        ...base.sections.personalization,
        title: sections.personalization?.title ?? base.sections.personalization.title,
      },
      blog: {
        ...base.sections.blog,
        title: sections.blog?.title ?? base.sections.blog.title,
        viewAllLabel: sections.blog?.viewAllLabel ?? base.sections.blog.viewAllLabel,
      },
    },
    categories: base.categories.map((cat) => {
      const t = hp.categories?.[cat.slug];
      if (!t) return cat;
      return {
        ...cat,
        title: t.title ?? cat.title,
        description: t.description ?? cat.description,
        imageAlt: t.imageAlt ?? cat.imageAlt,
      };
    }),
    howItWorksSteps: base.howItWorksSteps.map((step) => {
      const t = hp.howItWorksSteps?.[String(step.step)];
      if (!t) return step;
      return {
        ...step,
        title: t.title ?? step.title,
        description: t.description ?? step.description,
      };
    }),
    personalizationOptions: base.personalizationOptions.map((option, index) => {
      const t = hp.personalizationOptions?.[String(index)];
      if (!t) return option;
      return {
        ...option,
        label: t.label ?? option.label,
        description: t.description ?? option.description,
      };
    }),
  };
}

export function localizeProduct(product: Product, bundle: ContentBundle | null): Product {
  const t = bundle?.products?.[product.slug];
  if (!t) return product;

  return {
    ...product,
    title: t.title ?? product.title,
    shortDescription: t.shortDescription ?? product.shortDescription,
    description: t.description ?? product.description,
    metaTitle: t.metaTitle ?? product.metaTitle,
    metaDescription: t.metaDescription ?? product.metaDescription,
    story: t.story ?? product.story,
  };
}

export function localizeCollection(collection: Collection, bundle: ContentBundle | null): Collection {
  const t = bundle?.collections?.[collection.slug];
  if (!t) return collection;

  return {
    ...collection,
    name: t.name ?? collection.name,
    h1: t.h1 ?? collection.h1,
    description: t.description ?? collection.description,
    intro: t.intro ?? collection.intro,
    metaTitle: t.metaTitle ?? collection.metaTitle,
    metaDescription: t.metaDescription ?? collection.metaDescription,
    imageAlt: t.imageAlt ?? collection.imageAlt,
    seoSections: {
      whatAre: t.seoSections?.whatAre ?? collection.seoSections.whatAre,
      whenToChoose: t.seoSections?.whenToChoose ?? collection.seoSections.whenToChoose,
      personalization: t.seoSections?.personalization ?? collection.seoSections.personalization,
      whyChoose: t.seoSections?.whyChoose ?? collection.seoSections.whyChoose,
    },
  };
}

export function getCollectionPageLabels(collection: Collection, bundle: ContentBundle | null) {
  const t = bundle?.collections?.[collection.slug];
  const name = t?.name ?? collection.name;

  return {
    whatAre: t?.seoHeadings?.whatAre ?? `What Are ${name}?`,
    whenToChoose: t?.seoHeadings?.whenToChoose ?? "When to Choose This Type of Pet Memorial Gift",
    personalization: t?.seoHeadings?.personalization ?? "Personalization Options",
    whyChoose: t?.seoHeadings?.whyChoose ?? "Why Families Choose Our Memorial Keepsakes",
    relatedCategories: t?.relatedCategories ?? "Related Categories",
    helpfulGuides: t?.helpfulGuides ?? "Helpful Guides",
  };
}

export function getLocalizedPage(bundle: ContentBundle | null, key: string): PageContent | null {
  return bundle?.pages?.[key] ?? null;
}

export function localizeDigitalMemorialLanding(
  base: DigitalMemorialLandingContent,
  bundle: ContentBundle | null
): DigitalMemorialLandingContent {
  const t = bundle?.digitalMemorialLanding;
  if (!t) return base;

  return {
    ...base,
    metaTitle: t.metaTitle ?? base.metaTitle,
    metaDescription: t.metaDescription ?? base.metaDescription,
    hero: {
      ...base.hero,
      eyebrow: t.hero?.eyebrow ?? base.hero.eyebrow,
      h1: t.hero?.h1 ?? base.hero.h1,
      subtitle: t.hero?.subtitle ?? base.hero.subtitle,
      body: t.hero?.body ?? base.hero.body,
      primaryCta: {
        ...base.hero.primaryCta,
        label: t.hero?.primaryCta ?? base.hero.primaryCta.label,
      },
      secondaryCta: {
        ...base.hero.secondaryCta,
        label: t.hero?.secondaryCta ?? base.hero.secondaryCta.label,
      },
      image: {
        ...base.hero.image,
        alt: t.hero?.imageAlt ?? base.hero.image.alt,
      },
    },
    whatIs: {
      title: t.whatIs?.title ?? base.whatIs.title,
      paragraphs: t.whatIs?.paragraphs ?? base.whatIs.paragraphs,
    },
    carbonFiber: {
      ...base.carbonFiber,
      title: t.carbonFiber?.title ?? base.carbonFiber.title,
      subtitle: t.carbonFiber?.subtitle ?? base.carbonFiber.subtitle,
      features: t.carbonFiber?.features ?? base.carbonFiber.features,
      cta: {
        ...base.carbonFiber.cta,
        label: t.carbonFiber?.cta ?? base.carbonFiber.cta.label,
      },
      image: {
        ...base.carbonFiber.image,
        alt: t.carbonFiber?.imageAlt ?? base.carbonFiber.image.alt,
      },
    },
    howItWorks: {
      title: t.howItWorks?.title ?? base.howItWorks.title,
      items: base.howItWorks.items.map((item, index) => ({
        ...item,
        title: t.howItWorks?.items?.[index]?.title ?? item.title,
        desc: t.howItWorks?.items?.[index]?.desc ?? item.desc,
      })),
    },
    included: {
      title: t.included?.title ?? base.included.title,
      subtitle: t.included?.subtitle ?? base.included.subtitle,
      fields: t.included?.fields ?? base.included.fields,
    },
    sampleLinks: {
      title: t.sampleLinks?.title ?? base.sampleLinks.title,
      subtitle: t.sampleLinks?.subtitle ?? base.sampleLinks.subtitle,
      linkLabel: t.sampleLinks?.linkLabel ?? base.sampleLinks.linkLabel,
      items: base.sampleLinks.items.map((item, index) => ({
        ...item,
        title: t.sampleLinks?.items?.[index]?.title ?? item.title,
      })),
    },
    orderSteps: {
      title: t.orderSteps?.title ?? base.orderSteps.title,
      steps: base.orderSteps.steps.map((step, index) => ({
        ...step,
        text: t.orderSteps?.steps?.[index] ?? step.text,
      })),
    },
    pricing: {
      title: t.pricing?.title ?? base.pricing.title,
      subtitle: t.pricing?.subtitle ?? base.pricing.subtitle,
      options: base.pricing.options.map((option, index) => ({
        ...option,
        name: t.pricing?.options?.[index]?.name ?? option.name,
        price: t.pricing?.options?.[index]?.price ?? option.price,
        desc: t.pricing?.options?.[index]?.desc ?? option.desc,
      })),
    },
    faqs: base.faqs.map((faq, index) => ({
      question: t.faqs?.[index]?.question ?? faq.question,
      answer: t.faqs?.[index]?.answer ?? faq.answer,
    })),
    finalCta: {
      ...base.finalCta,
      title: t.finalCta?.title ?? base.finalCta.title,
      subtitle: t.finalCta?.subtitle ?? base.finalCta.subtitle,
      primaryCta: {
        ...base.finalCta.primaryCta,
        label: t.finalCta?.primaryCta ?? base.finalCta.primaryCta.label,
      },
      secondaryCta: {
        ...base.finalCta.secondaryCta,
        label: t.finalCta?.secondaryCta ?? base.finalCta.secondaryCta.label,
      },
    },
  };
}
