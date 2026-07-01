import type {
  CategoryCard,
  HowItWorksStep,
  PersonalizationOption,
  Product,
  BlogCategory,
  BlogPost,
} from "@/types";

export interface HomepageHero {
  h1: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; alt: string };
}

export interface HomepageNfcSection {
  title: string;
  description: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  keyPoints: string[];
}

export interface SectionHeadingCopy {
  title: string;
  subtitle?: string;
}

export interface HomepageContent {
  hero: HomepageHero;
  sections: {
    categories: SectionHeadingCopy;
    bestSellers: SectionHeadingCopy & { viewAllLabel: string };
    nfc: HomepageNfcSection;
    howItWorks: SectionHeadingCopy;
    personalization: SectionHeadingCopy;
    blog: SectionHeadingCopy & { viewAllLabel: string };
  };
  categories: CategoryCard[];
  howItWorksSteps: HowItWorksStep[];
  personalizationOptions: PersonalizationOption[];
}

export interface ProductsFile {
  products: Product[];
  updatedAt: string;
}

export interface HomepageFile {
  content: HomepageContent;
  updatedAt: string;
}

export interface BlogFile {
  categories: BlogCategory[];
  posts: BlogPost[];
  updatedAt: string;
}
