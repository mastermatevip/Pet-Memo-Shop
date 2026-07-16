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
    /** Optional buying-guide block for hub collections */
    buyingGuide?: string;
    /** Optional popular gift-types block */
    popularTypes?: string;
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

export type BlogPostStatus = "draft" | "published";

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
  status: BlogPostStatus;
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

export type OrderStatus =
  | "pending"
  | "proof_sent"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ShippingStatus =
  | "not_shipped"
  | "processing"
  | "in_transit"
  | "delivered"
  | "exception";

export interface OrderLineItem {
  productSlug?: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  items: OrderLineItem[];
  orderStatus: OrderStatus;
  shippingStatus: ShippingStatus;
  carrier?: string;
  trackingNumber?: string;
  internalNotes?: string;
  totalAmount: number;
  currency: string;
  couponCode?: string;
  discountAmount?: number;
  createdAt: string;
  updatedAt: string;
  shippedAt?: string;
  /** Linked digital memorial page slugs */
  memorialSlugs?: string[];
}

export type CouponType = "percent" | "fixed";

export interface Coupon {
  code: string;
  type: CouponType;
  /** percent: 1–100; fixed: USD amount */
  value: number;
  active: boolean;
  minSubtotal?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type MemberStatus = "active" | "blocked";

export type MemberSource = "checkout" | "manual" | "import";

export interface Member {
  email: string;
  name: string;
  phone?: string;
  defaultShippingAddress?: string;
  status: MemberStatus;
  source: MemberSource;
  orderCount: number;
  totalSpent: number;
  currency: string;
  orderNumbers: string[];
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
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

export type MemorialPageStatus = "draft" | "published" | "archived";

export interface MemorialGalleryItem {
  url: string;
  alt?: string;
  type: "image" | "video";
}

export interface MemorialFamilyMessage {
  author: string;
  text: string;
}

export interface MemorialGuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

export interface MemorialPage {
  slug: string;
  orderNumber?: string;
  customerEmail: string;
  petName: string;
  petType?: string;
  birthDate?: string;
  memorialDate?: string;
  portraitUrl?: string;
  story?: string;
  gallery: MemorialGalleryItem[];
  familyMessages: MemorialFamilyMessage[];
  guestbookEnabled: boolean;
  guestbook: MemorialGuestbookEntry[];
  status: MemorialPageStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}
