export interface Collection {
  slug: string;
  name: string;
  /** SEO-optimized H1; falls back to name when omitted */
  h1?: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  relatedSlugs: string[];
  faqs: FAQ[];
  seoSections: {
    whatAre: string;
    whenToChoose: string;
    personalization: string;
    whyChoose: string;
  };
}

export interface Product {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  description: string;
  shortDescription: string;
  story: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  collection: string;
  rating: number;
  reviewCount: number;
  customizable: boolean;
  inStock: boolean;
  hasNfc: boolean;
  tags: string[];
  specifications: Record<string, string>;
  benefits: string[];
  faqs: FAQ[];
  relatedSlugs: string[];
}

export interface ProductImage {
  src: string;
  alt: string;
  type: "main" | "lifestyle" | "detail" | "size" | "material" | "packaging" | "nfc";
}

export interface Review {
  id: string;
  customerName: string;
  petName: string;
  rating: number;
  text: string;
  productPurchased: string;
  productSlug: string;
  verified: boolean;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  readTime: number;
  viewCount: number;
  content: string;
  faqs: FAQ[];
  relatedProductSlugs: string[];
  relatedCollectionSlugs: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}

export interface CategoryCard {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface PersonalizationOption {
  icon: string;
  label: string;
  description: string;
}
