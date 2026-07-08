import {
  homepageCategories,
  howItWorksSteps,
  personalizationOptions,
  nfcKeyPoints,
} from "@/data/homepage.static";
import { staticProducts } from "@/data/products.static";
import { blogCategories, blogPosts } from "@/data/blog.static";
import { seedOrders } from "@/data/orders.static";
import type { HomepageContent, HomepageFile, ProductsFile, BlogFile, OrdersFile, MembersFile } from "./types";

export function defaultHomepageContent(): HomepageContent {
  return {
    hero: {
      h1: "Honor Their Memory with a Personalized Pet Keepsake",
      subtitle:
        "Create a meaningful memorial gift for a beloved dog, cat, or companion. Personalized with photos, names, dates, and optional NFC digital memorial pages.",
      primaryCta: { label: "Shop Memorial Gifts", href: "/collections/pet-memorial-gifts" },
      secondaryCta: { label: "Create Digital Memorial", href: "/digital-pet-memorial" },
      image: {
        src: "/images/hero-memorial.jpg",
        alt: "personalized pet memorial frame with candle and flowers in warm natural light",
      },
    },
    sections: {
      categories: {
        title: "Shop by Category",
        subtitle: "Find the perfect memorial gift for your beloved companion.",
      },
      bestSellers: {
        title: "Best Selling Pet Memorial Gifts",
        viewAllLabel: "View All Best Sellers",
      },
      nfc: {
        title: "A Memorial Card That Opens Their Story",
        description:
          "Our NFC pet memorial cards allow families to keep photos, videos, stories, and loving messages in one digital memorial page. Simply tap the card with a smartphone to open the memory page.",
        image: {
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
          alt: "NFC pet memorial card opening a digital memory page on smartphone",
        },
        cta: { label: "Explore NFC Memorial Cards", href: "/collections/nfc-memorial-cards" },
        keyPoints: [...nfcKeyPoints],
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "Creating a personalized memorial gift is simple and thoughtful.",
      },
      personalization: {
        title: "Made Personal for Every Beloved Companion",
      },
      blog: {
        title: "Pet Memorial Guides & Sympathy Gift Ideas",
        viewAllLabel: "View All Guides",
      },
    },
    categories: [...homepageCategories],
    howItWorksSteps: [...howItWorksSteps],
    personalizationOptions: [...personalizationOptions],
  };
}

export function defaultHomepageFile(): HomepageFile {
  return {
    content: defaultHomepageContent(),
    updatedAt: new Date().toISOString(),
  };
}

export function defaultProductsFile(): ProductsFile {
  return {
    products: staticProducts.map((p) => ({ ...p })),
    updatedAt: new Date().toISOString(),
  };
}

export function defaultBlogFile(): BlogFile {
  return {
    categories: blogCategories.map((c) => ({ ...c })),
    posts: blogPosts.map((p) => ({ ...p, faqs: p.faqs.map((f) => ({ ...f })) })),
    updatedAt: new Date().toISOString(),
  };
}

export function defaultOrdersFile(): OrdersFile {
  return {
    orders: seedOrders.map((o) => ({
      ...o,
      items: o.items.map((item) => ({ ...item })),
    })),
    updatedAt: new Date().toISOString(),
  };
}

export function defaultMembersFile(): MembersFile {
  return {
    members: [],
    updatedAt: new Date().toISOString(),
  };
}
