import { BRAND } from "@/config/brand";
import { digitalMemorialFields } from "@/data/homepage.static";
import type {
  DigitalMemorialLandingContent,
  DigitalMemorialLandingFile,
} from "./digital-memorial-landing-types";

export function defaultDigitalMemorialLandingContent(): DigitalMemorialLandingContent {
  return {
    metaTitle: "Online Pet Memorial | Create a Digital Pet Memorial Page",
    metaDescription:
      "Create an online pet memorial page with photos, videos, and family messages. Access via premium carbon fiber NFC tag or QR code. Make a pet memorial online with Pet Memo Shop.",
    hero: {
      eyebrow: `${BRAND.name} Digital Memorial`,
      h1: "Create an Online Pet Memorial",
      subtitle:
        "Preserve your companion's story in a beautiful online pet memorial page. Share photos, videos, and loving messages — accessible anytime via NFC tap or QR code.",
      body: `Pair your digital page with our premium carbon fiber NFC memorial tag — a durable pet memorial tag you can wear, display, or keep beside their urn.`,
      primaryCta: {
        label: "Shop Carbon Fiber NFC Tag",
        href: "/products/carbon-fiber-nfc-memorial-tag",
      },
      secondaryCta: {
        label: "Create Digital Page",
        href: "/products/digital-memorial-page-standalone",
      },
      image: {
        src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
        alt: "online pet memorial page with photos and loving messages",
      },
    },
    whatIs: {
      title: "What Is a Digital Pet Memorial?",
      paragraphs: [
        "A digital pet memorial is an online page dedicated to honoring your beloved companion. Unlike a single photo frame, it holds their full story — photos, videos, dates, and messages from everyone who loved them.",
        `${BRAND.name} makes it simple to make a pet memorial online, then keep it close with a physical NFC tag or card that opens the page with one tap.`,
      ],
    },
    carbonFiber: {
      title: "Premium Carbon Fiber NFC Tag",
      subtitle:
        "Our signature digital memorial keepsake — durable, elegant, and always connected to their story.",
      image: {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
        alt: "carbon fiber NFC pet memorial tag engraved with pet name",
      },
      features: [
        "Real carbon fiber — lightweight, scratch-resistant, built to last",
        "Embedded NFC chip opens your online memorial instantly",
        "Laser-engraved with your pet's name and memorial dates",
        "QR code backup on every tag",
        "Wear as a pet memorial dog tag or display beside urn and frame",
        "Includes full digital memorial page setup",
      ],
      cta: {
        label: "View Carbon Fiber NFC Tag",
        href: "/products/carbon-fiber-nfc-memorial-tag",
      },
    },
    howItWorks: {
      title: "How NFC & QR Code Access Works",
      items: [
        {
          icon: "smartphone",
          title: "Tap or Scan",
          desc: "Tap your NFC memorial tag or scan the QR code to open the online page on any smartphone.",
        },
        {
          icon: "image",
          title: "Rich Media",
          desc: "Build a digital pet memorial with photos, videos, and a full gallery of cherished moments.",
        },
        {
          icon: "book",
          title: "Their Story",
          desc: "Write their story, share favorite memories, and add family messages to the memorial page.",
        },
        {
          icon: "message",
          title: "Guestbook",
          desc: "Optional guestbook so friends and family can leave messages on the online memorial.",
        },
      ],
    },
    included: {
      title: "What Can Be Included",
      subtitle: "Build a rich online tribute with everything that made your companion special.",
      fields: [...digitalMemorialFields],
    },
    example: {
      title: "Example Online Memorial Layout",
      petName: "Max",
      dates: "2012 – 2025 · Beloved Golden Retriever",
      quote:
        "Max brought sunshine into every room. His wagging tail and gentle eyes reminded us daily that love comes in the simplest forms.",
      portraitSrc:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
      gallerySrcs: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop",
      ],
    },
    orderSteps: {
      title: "How to Order",
      steps: [
        {
          step: 1,
          text: "Choose a carbon fiber NFC tag, memorial card, or standalone digital page",
        },
        { step: 2, text: "Upload your pet's photo and enter their name and dates" },
        { step: 3, text: "Build your online pet memorial with photos, videos, and story" },
        { step: 4, text: "Review and approve your design proof" },
        { step: 5, text: "Receive your keepsake and share the memorial page with family" },
      ],
    },
    pricing: {
      title: "Pricing Options",
      subtitle: "Start with a digital page only, or pair it with a physical NFC keepsake.",
      options: [
        {
          name: "Digital Page Only",
          price: "$19.99",
          desc: "Standalone online pet memorial with unique link and QR code. Create a pet memorial online in minutes.",
          href: "/products/digital-memorial-page-standalone",
          featured: false,
        },
        {
          name: "Carbon Fiber NFC Tag",
          price: "$69.99",
          desc: "Premium carbon fiber memorial tag with embedded NFC chip + full online pet memorial page. Our signature keepsake.",
          href: "/products/carbon-fiber-nfc-memorial-tag",
          featured: true,
        },
        {
          name: "NFC Memorial Card",
          price: "$34.99",
          desc: "Classic memorial card with NFC chip + digital page. A thoughtful entry-level physical and digital tribute.",
          href: "/products/nfc-pet-memorial-card",
          featured: false,
        },
      ],
    },
    faqs: [
      {
        question: "What is an online pet memorial?",
        answer:
          "An online pet memorial is a dedicated web page honoring your beloved companion. It preserves photos, videos, their story, dates, and messages from family — accessible anytime via link, QR code, or NFC tap.",
      },
      {
        question: "How do I create a pet memorial online?",
        answer:
          "Choose a standalone digital page or pair it with a carbon fiber NFC tag or memorial card. Upload your pet's photo, enter their details, and build your memorial with photos, videos, and story. We send a proof before your physical tag ships.",
      },
      {
        question: "What is the carbon fiber NFC memorial tag?",
        answer:
          "Our premium carbon fiber tag embeds an NFC chip linked to your pet's online memorial. Tap with a smartphone to open the page instantly. It's durable, lightweight, and can be worn or displayed beside an urn or photo frame.",
      },
      {
        question: "Can I update the memorial page after creation?",
        answer:
          "Yes. Add photos, update stories, and edit messages anytime — our team can update your page after you place the order.",
      },
      {
        question: "Do I need an app?",
        answer: "No app is required. The online pet memorial opens directly in your phone's web browser.",
      },
      {
        question: "Can family members contribute?",
        answer:
          "Yes. Invite family and friends to add photos and messages. The optional guestbook allows visitors to leave notes.",
      },
    ],
    finalCta: {
      title: "Keep Their Story Close",
      subtitle:
        "Create an online pet memorial that honors your beloved companion — with a premium carbon fiber NFC tag or a classic memorial card.",
      primaryCta: {
        label: "Shop Carbon Fiber NFC Tag",
        href: "/products/carbon-fiber-nfc-memorial-tag",
      },
      secondaryCta: {
        label: "View All NFC Keepsakes",
        href: "/collections/nfc-memorial-cards",
      },
    },
  };
}

export function defaultDigitalMemorialLandingFile(): DigitalMemorialLandingFile {
  return {
    content: defaultDigitalMemorialLandingContent(),
    updatedAt: new Date().toISOString(),
  };
}
