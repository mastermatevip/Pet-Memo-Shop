import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { HomepageContent } from "@/lib/cms/types";
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
}

export interface BestSellersPageContent {
  title?: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ContentBundle {
  homepage?: HomepageContentBundle;
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
  };
}

export function getLocalizedPage(bundle: ContentBundle | null, key: string): PageContent | null {
  return bundle?.pages?.[key] ?? null;
}
