# PawAura — Pet Memorial E-Commerce Website

A premium pet memorial e-commerce website built with Next.js 16, TypeScript, and Tailwind CSS.

**Brand:** PawAura  
**Tagline:** Personalized Pet Memorial Gifts & Digital Keepsakes

## Features

- **Homepage** with 12 sections: hero, categories, best sellers, NFC showcase, how it works, personalization, reviews, blog, trust badges, newsletter
- **11 Collection Pages** with SEO content, FAQ, filters, and related categories
- **12 Product Pages** with gallery, personalization form, NFC module, specs, reviews
- **Digital Pet Memorial Landing Page** explaining NFC + QR code memorial pages
- **Blog** with 12 SEO articles across 7 categories
- **Mobile Responsive** warm, premium design
- **SEO-Friendly URLs** (lowercase, hyphens only)

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)

## Getting Started

```bash
cd pawaura
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── collections/[slug]/ # Collection pages
│   ├── products/[slug]/    # Product pages
│   ├── digital-pet-memorial/
│   ├── blog/
│   └── ...                 # Static pages
├── components/
│   ├── layout/             # Header, Footer, AnnouncementBar
│   ├── home/               # Homepage sections
│   ├── product/            # Product components
│   ├── collection/         # Collection components
│   ├── shared/             # FAQ, Reviews, TrustBadges, etc.
│   └── ui/                 # Button, Badge, StarRating
├── config/brand.ts         # Brand name, tagline (easy to replace)
├── data/                   # Products, collections, blog, reviews
├── lib/                    # Utils, SEO helpers
└── types/                  # TypeScript interfaces
```

## Brand Customization

To change the brand name globally, update `src/config/brand.ts`:

```typescript
export const BRAND = {
  name: "YourBrandName",
  tagline: "Your Tagline",
  // ...
};
```

## Key Differentiation

NFC Pet Memorial Cards + Digital Pet Memorial Pages — physical keepsakes that open digital pages with photos, videos, and stories via smartphone tap or QR code.

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## License

Private — All rights reserved.
