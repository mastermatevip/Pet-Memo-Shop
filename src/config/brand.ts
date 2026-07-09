export const BRAND = {
  name: "Pet Memo Shop",
  tagline: "Personalized Pet Memorial Gifts & Digital Keepsakes",
  description:
    "Create meaningful memorial gifts for beloved dogs, cats, and companions. Personalized with photos, names, dates, and optional NFC digital memorial pages.",
  url: "https://petmemoshop.com",
  email: "hello@petmemoshop.com",
  whatsapp: "+86 17376752271",
  whatsappUrl: "https://wa.me/8617376752271",
  freeShippingThreshold: 75,
  currency: "USD",
  locale: "en-US",
  logoFull: "/brand/logo-full.png",
  logoIcon: "/brand/logo-icon.png",
  logoAlt: "Pet Memo Shop — paw print with heart memorial logo",
} as const;

/** Warm premium palette — also defined in src/app/globals.css */
export const COLORS = {
  background: "#F8F3EA",
  backgroundSecondary: "#E7D8C5",
  text: "#3A2E25",
  button: "#1F1A17",
  buttonText: "#FFFFFF",
  gold: "#C8A96A",
  border: "#DED0BD",
  card: "#FFFFFF",
  highlight: "#F3E8D8",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/petmemoshop",
  pinterest: "https://pinterest.com/petmemoshop",
  facebook: "https://facebook.com/petmemoshop",
  tiktok: "https://tiktok.com/@petmemoshop",
} as const;

export const ANNOUNCEMENTS = [
  "Free Shipping on Selected Memorial Gifts",
  "Personalized Keepsakes Made with Love",
  "New: Carbon Fiber NFC Memorial Tags — Tap to Open Their Story",
] as const;

export const TRUST_BADGES = [
  { icon: "shield", label: "Secure Checkout" },
  { icon: "globe", label: "Worldwide Shipping" },
  { icon: "heart", label: "Personalized with Care" },
  { icon: "eye", label: "Proof Before Production" },
  { icon: "package", label: "Tracking Number Provided" },
  { icon: "message", label: "Friendly Customer Support" },
] as const;

export const PAYMENT_METHODS = [
  "PayPal",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
] as const;
