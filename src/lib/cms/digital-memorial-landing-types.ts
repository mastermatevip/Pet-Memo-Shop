import type { FAQ } from "@/types";

export interface LandingCta {
  label: string;
  href: string;
}

export interface LandingImage {
  src: string;
  alt: string;
}

export type DigitalMemorialHowIcon = "smartphone" | "image" | "book" | "message";

export interface DigitalMemorialHowItem {
  icon: DigitalMemorialHowIcon;
  title: string;
  desc: string;
}

export interface DigitalMemorialPricingOption {
  name: string;
  price: string;
  desc: string;
  href: string;
  featured: boolean;
}

export interface DigitalMemorialOrderStep {
  step: number;
  text: string;
}

export interface DigitalMemorialLandingContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    h1: string;
    subtitle: string;
    body: string;
    primaryCta: LandingCta;
    secondaryCta: LandingCta;
    image: LandingImage;
  };
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  carbonFiber: {
    title: string;
    subtitle: string;
    image: LandingImage;
    features: string[];
    cta: LandingCta;
  };
  howItWorks: {
    title: string;
    items: DigitalMemorialHowItem[];
  };
  included: {
    title: string;
    subtitle: string;
    fields: string[];
  };
  example: {
    title: string;
    petName: string;
    dates: string;
    quote: string;
    portraitSrc: string;
    gallerySrcs: string[];
  };
  orderSteps: {
    title: string;
    steps: DigitalMemorialOrderStep[];
  };
  pricing: {
    title: string;
    subtitle: string;
    options: DigitalMemorialPricingOption[];
  };
  faqs: FAQ[];
  finalCta: {
    title: string;
    subtitle: string;
    primaryCta: LandingCta;
    secondaryCta: LandingCta;
  };
}

export interface DigitalMemorialLandingFile {
  content: DigitalMemorialLandingContent;
  updatedAt: string;
}
