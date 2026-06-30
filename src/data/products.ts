import type { Product } from "@/types";

const defaultBenefits = [
  "A meaningful way to remember a beloved pet",
  "Personalized with name, photo, and dates",
  "A thoughtful sympathy gift for pet loss",
  "Suitable for home display",
  "Designed with care and respect",
];

const defaultFaqs = [
  {
    question: "Can I preview the design before production?",
    answer:
      "Yes. We send a design proof for your review and approval before any personalized item goes into production.",
  },
  {
    question: "How long does personalization take?",
    answer:
      "Production typically takes 3–5 business days after you approve your design proof. Shipping times depend on your location.",
  },
  {
    question: "Can I upload my pet's photo?",
    answer:
      "Absolutely. You can upload your pet's photo during the personalization step at checkout.",
  },
  {
    question: "Can I change the text after ordering?",
    answer:
      "You can request changes before approving your design proof. Once approved and in production, changes may not be possible.",
  },
  {
    question: "Is this suitable as a sympathy gift?",
    answer:
      "Yes. Our memorial keepsakes are thoughtfully designed as gentle sympathy gifts for friends and family grieving a pet.",
  },
];

const defaultSpecs = {
  Material: "Premium quality materials",
  Size: "See product details",
  Weight: "Lightweight for easy display",
  Color: "Natural warm tones",
  "Personalization method": "Laser engraving / UV printing",
  "Package includes": "Memorial keepsake, care guide",
  "Production time": "3–5 business days after proof approval",
  "Shipping time": "5–10 business days (varies by location)",
  "Care instructions": "Wipe gently with a soft, dry cloth",
};

function makeProduct(p: Partial<Product> & Pick<Product, "slug" | "title" | "collection" | "price">): Product {
  return {
    description: p.shortDescription || "",
    shortDescription: p.shortDescription || "",
    story: p.story || "",
    salePrice: undefined,
    images: p.images || [
      {
        src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop",
        alt: p.title,
        type: "main",
      },
    ],
    rating: p.rating ?? 4.8,
    reviewCount: p.reviewCount ?? 24,
    customizable: p.customizable ?? true,
    inStock: p.inStock ?? true,
    hasNfc: p.hasNfc ?? false,
    tags: p.tags ?? [],
    specifications: { ...defaultSpecs, ...p.specifications },
    benefits: p.benefits ?? defaultBenefits,
    faqs: p.faqs ?? defaultFaqs,
    relatedSlugs: p.relatedSlugs ?? [],
    ...p,
  };
}

export const products: Product[] = [
  makeProduct({
    slug: "personalized-pet-memorial-frame",
    title: "Personalized Pet Memorial Frame",
    metaTitle: "Pet Memorial Frame | Personalized Photo Frame",
    metaDescription:
      "Personalized pet memorial frame with name and date engraving. Display your favorite photo as a warm home tribute for your beloved dog or cat.",
    shortDescription:
      "A warm, elegant photo frame engraved with your pet's name and dates. A gentle home tribute to keep their memory close.",
    story:
      "Some bonds leave a quiet warmth that stays with us. This memorial frame was created to hold that warmth — a place for your favorite photo and the name of the companion who shared your days. Display it on a shelf, bedside table, or wherever their memory feels most at home.",
    price: 49.99,
    collection: "pet-memorial-frames",
    images: [
      { src: "https://images.unsplash.com/photo-1513364777864-211d5172054?w=800&h=800&fit=crop", alt: "personalized dog memorial frame with photo and name", type: "main" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop", alt: "pet memorial frame lifestyle on shelf with candle", type: "lifestyle" },
      { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop", alt: "memorial frame engraving detail with pet name", type: "detail" },
      { src: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=800&h=800&fit=crop", alt: "memorial frame size comparison guide", type: "size" },
      { src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop", alt: "wooden memorial frame material close-up", type: "material" },
      { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop", alt: "memorial frame premium gift packaging", type: "packaging" },
    ],
    specifications: { Material: "Solid wood with glass front", Size: '8" x 10" (holds 5" x 7" photo)', Weight: "1.2 lbs" },
    relatedSlugs: ["carbon-fiber-nfc-memorial-tag", "engraved-pet-memorial-plaque", "memorial-sympathy-gift-box", "wooden-pet-cremation-urn"],
    tags: ["bestseller", "frame"],
  }),
  makeProduct({
    slug: "nfc-pet-memorial-card",
    title: "NFC Pet Memorial Card",
    metaTitle: "NFC Pet Memorial Card | Digital Memory Keepsake",
    metaDescription:
      "NFC pet memorial card opens a digital page with photos, videos, and stories. Tap with a smartphone or scan the QR code. A unique physical and digital tribute.",
    shortDescription:
      "A physical memorial card with an embedded NFC chip. Tap with a smartphone to open a digital page filled with photos, videos, and stories.",
    story:
      "Some stories are too rich for a single photo. Our NFC memorial card bridges the physical and digital — a beautiful keepsake you can hold, that opens a world of memories with a gentle tap. Share their story with family, revisit favorite moments, and keep their memory alive in a way that grows with you.",
    price: 39.99,
    salePrice: 34.99,
    collection: "nfc-memorial-cards",
    hasNfc: true,
    rating: 5,
    reviewCount: 47,
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop", alt: "NFC pet memorial card opening a digital memory page", type: "main" },
      { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=800&fit=crop", alt: "smartphone tapping NFC memorial card", type: "nfc" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop", alt: "NFC memorial card beside photo frame and urn", type: "lifestyle" },
      { src: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=800&h=800&fit=crop", alt: "NFC card engraving detail with pet name", type: "detail" },
      { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop", alt: "NFC memorial card premium packaging", type: "packaging" },
    ],
    benefits: [...defaultBenefits, "Optional digital memorial experience"],
    faqs: [
      ...defaultFaqs,
      {
        question: "How does the NFC memorial page work?",
        answer:
          "The card contains an NFC chip. Tap it with a compatible smartphone to open your pet's digital memorial page. A QR code backup is also printed on the card.",
      },
    ],
    specifications: { Material: "Premium PVC with embedded NFC chip", Size: '3.5" x 2.25" (standard card size)', Weight: "0.5 oz" },
    relatedSlugs: ["carbon-fiber-nfc-memorial-tag", "digital-memorial-page-standalone", "engraved-pet-memorial-plaque", "personalized-pet-memorial-frame"],
    tags: ["bestseller", "nfc", "featured"],
  }),
  makeProduct({
    slug: "carbon-fiber-nfc-memorial-tag",
    title: "Carbon Fiber NFC Memorial Tag",
    metaTitle: "Digital Pet Memorial Tag | Carbon Fiber NFC Keepsake",
    metaDescription:
      "Premium carbon fiber NFC memorial tag opens an online pet memorial with photos and videos. Tap with a smartphone or scan the QR code. Engraved pet memorial tag for dogs and cats.",
    shortDescription:
      "A premium carbon fiber memorial tag with embedded NFC chip. Tap to open your pet's online memorial page — or scan the QR code backup. Laser-engraved with name and dates.",
    story:
      "Some tributes deserve to last forever. Our carbon fiber NFC memorial tag combines aerospace-grade material with quiet technology — a pet memorial tag you can wear, display beside an urn, or attach to a keepsake box. One gentle tap opens a rich online memorial filled with photos, videos, and the story only you can tell. Durable, lightweight, and deeply personal.",
    price: 79.99,
    salePrice: 69.99,
    collection: "nfc-memorial-cards",
    hasNfc: true,
    rating: 5,
    reviewCount: 31,
    images: [
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop", alt: "carbon fiber NFC pet memorial tag with engraved name", type: "main" },
      { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=800&fit=crop", alt: "smartphone tapping carbon fiber NFC memorial tag", type: "nfc" },
      { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop", alt: "pet memorial tag displayed beside urn and frame", type: "lifestyle" },
      { src: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=800&h=800&fit=crop", alt: "laser engraving detail on carbon fiber memorial tag", type: "detail" },
      { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop", alt: "carbon fiber NFC memorial tag premium gift box", type: "packaging" },
    ],
    benefits: [
      "Premium carbon fiber — lightweight, durable, and elegant",
      "Tap to open a full online pet memorial page",
      "Laser-engraved with your pet's name and dates",
      "QR code backup for any smartphone",
      "Wearable tag or display beside urn and frame",
      "Includes digital memorial page setup",
    ],
    faqs: [
      ...defaultFaqs,
      {
        question: "How does the carbon fiber NFC tag work?",
        answer:
          "The tag contains an embedded NFC chip programmed to your pet's online memorial page. Tap it with a compatible smartphone to open the page instantly. A QR code is laser-marked on the back as a backup.",
      },
      {
        question: "Can I wear or display the memorial tag?",
        answer:
          "Yes. Attach it to a chain as a pet memorial dog tag necklace, display it beside an urn or photo frame, or keep it in a keepsake box. The carbon fiber construction is built for daily handling.",
      },
      {
        question: "What is included with the digital memorial page?",
        answer:
          "Your online pet memorial includes a photo gallery, video links, your pet's story, memorial dates, family messages, and an optional guestbook. You can update content anytime.",
      },
    ],
    specifications: {
      Material: "Real carbon fiber with embedded NFC chip",
      Size: '1.25" x 2" tag (standard dog tag size)',
      Weight: "0.3 oz",
      Color: "Matte black carbon weave",
      "Personalization method": "Laser engraving + digital page setup",
      "Package includes": "Memorial tag, chain ring, digital page, care guide",
    },
    relatedSlugs: ["nfc-pet-memorial-card", "digital-memorial-page-standalone", "dog-memorial-keepsake-box", "engraved-pet-memorial-plaque"],
    tags: ["bestseller", "nfc", "featured", "premium", "tag"],
  }),
  makeProduct({
    slug: "engraved-pet-memorial-pendant",
    title: "Engraved Pet Memorial Pendant",
    metaTitle: "Pet Memorial Pendant | Engraved Necklace",
    metaDescription:
      "Pet memorial pendant engraved with your pet's name and paw print. A wearable sterling silver necklace to keep their memory close every day.",
    shortDescription:
      "A delicate pendant engraved with your pet's name and paw print. A wearable keepsake to keep their memory close every day.",
    story:
      "There are days when you reach for something familiar — a gentle reminder that love doesn't fade. This pendant was designed for those moments. Wear it close, feel their presence, and carry the name of your beloved companion with grace.",
    price: 59.99,
    collection: "pet-memorial-jewelry",
    images: [
      { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop", alt: "custom cat memorial necklace with engraved pendant", type: "main" },
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop", alt: "pet memorial pendant lifestyle worn close", type: "lifestyle" },
      { src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop", alt: "pendant engraving detail with paw print", type: "detail" },
    ],
    specifications: { Material: "Sterling silver", Size: "18mm pendant on 18\" chain", Weight: "0.3 oz" },
    relatedSlugs: ["pet-memorial-photo-locket", "memorial-sympathy-gift-box", "personalized-pet-memorial-frame", "nfc-pet-memorial-card"],
    tags: ["bestseller", "jewelry"],
  }),
  makeProduct({
    slug: "wooden-pet-cremation-urn",
    title: "Wooden Pet Cremation Urn",
    metaTitle: "Pet Memorial Urn | Wooden Cremation Urn",
    metaDescription:
      "Wooden pet memorial urn with personalized nameplate. A warm, dignified cremation urn for dogs and cats with optional photo and NFC card.",
    shortDescription:
      "A beautifully crafted wooden urn with a personalized nameplate. A warm, dignified resting place for your beloved companion.",
    story:
      "Home is where love lives on. This wooden urn was crafted to hold not just ashes, but the essence of a life well-loved. The natural grain of the wood, the carefully engraved nameplate — every detail speaks of respect, warmth, and the quiet beauty of remembrance.",
    price: 89.99,
    collection: "pet-urns",
    images: [
      { src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop", alt: "wooden pet cremation urn with personalized nameplate", type: "main" },
      { src: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=800&h=800&fit=crop", alt: "pet urn on shelf beside memorial frame", type: "lifestyle" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop", alt: "urn nameplate engraving detail", type: "detail" },
    ],
    specifications: { Material: "Solid walnut wood", Size: '6" x 4" x 4" (50 cubic inches)', Weight: "2.5 lbs", Color: "Natural walnut" },
    relatedSlugs: ["ceramic-pet-cremation-urn", "engraved-pet-memorial-plaque", "nfc-pet-memorial-card", "personalized-pet-memorial-frame"],
    tags: ["bestseller", "urn"],
  }),
  makeProduct({
    slug: "memorial-sympathy-gift-box",
    title: "Memorial Sympathy Gift Box",
    metaTitle: "Unique Pet Memorial Gifts | Sympathy Gift Box",
    metaDescription:
      "Unique pet memorial gift box with personalized frame, candle, and sympathy card. A thoughtful gift for someone grieving the loss of a beloved pet.",
    shortDescription:
      "A curated gift set with a personalized memorial frame, candle, and sympathy card. A thoughtful way to comfort someone who lost a pet.",
    story:
      "When words aren't enough, a gentle gesture can speak volumes. This gift box brings together a personalized frame, a soft candle, and a heartfelt sympathy card — everything needed to offer comfort and honor a beloved companion's memory.",
    price: 79.99,
    collection: "memorial-gift-boxes",
    images: [
      { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop", alt: "memorial gift box with personalized pet keepsake and candle", type: "main" },
      { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop", alt: "sympathy gift box contents laid out", type: "lifestyle" },
    ],
    specifications: { "Package includes": "Mini memorial frame, soy candle, sympathy card, gift box", Size: '10" x 8" x 3" gift box' },
    relatedSlugs: ["personalized-pet-memorial-frame", "engraved-pet-memorial-pendant", "nfc-pet-memorial-card", "pet-loss-candle-set"],
    tags: ["bestseller", "gift-box", "sympathy"],
  }),
  makeProduct({
    slug: "engraved-pet-memorial-plaque",
    title: "Engraved Pet Memorial Plaque",
    metaTitle: "Pet Memorial Plaque | Engraved Personalized Plaque",
    metaDescription:
      "Personalized pet memorial plaque engraved with name, dates, and message. Slate plaque for shelf or garden display with optional NFC integration.",
    shortDescription:
      "A slate memorial plaque engraved with your pet's name, dates, and a loving message. Perfect for shelf or garden display.",
    story:
      "Some tributes belong in the open — where sunlight touches the words and memories feel alive. This engraved plaque captures your pet's name and the dates that matter, creating a lasting marker of the love you shared.",
    price: 44.99,
    collection: "pet-memorial-plaques",
    images: [
      { src: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=800&h=800&fit=crop", alt: "engraved pet memorial plaque with name and dates", type: "main" },
      { src: "https://images.unsplash.com/photo-1513364777864-211d5172054?w=800&h=800&fit=crop", alt: "memorial plaque displayed on garden shelf", type: "lifestyle" },
    ],
    specifications: { Material: "Natural slate", Size: '8" x 6"', Weight: "1.8 lbs" },
    relatedSlugs: ["personalized-pet-memorial-frame", "wooden-pet-cremation-urn", "nfc-pet-memorial-card", "dog-memorial-keepsake-box"],
    tags: ["plaque"],
  }),
  makeProduct({
    slug: "dog-memorial-keepsake-box",
    title: "Dog Memorial Keepsake Box",
    metaTitle: "Pet Memory Box | Dog Memorial Keepsake Box",
    metaDescription:
      "Personalized pet memory box for storing collars, tags, and photos. Engraved wooden dog memorial keepsake box with velvet lining.",
    shortDescription:
      "A wooden keepsake box engraved with your dog's name. Store collars, tags, photos, and treasured mementos in one special place.",
    story:
      "Every collar tells a story. Every tag holds a memory. This keepsake box was made to gather those small, precious things — the tangible pieces of a life shared — and keep them safe in a place of honor.",
    price: 54.99,
    collection: "dog-memorial-gifts",
    images: [
      { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop", alt: "dog memorial keepsake box with collar and tags inside", type: "main" },
      { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop", alt: "personalized dog keepsake box on shelf", type: "lifestyle" },
    ],
    specifications: { Material: "Solid oak wood with velvet lining", Size: '9" x 6" x 4"' },
    relatedSlugs: ["personalized-pet-memorial-frame", "engraved-pet-memorial-plaque", "wooden-pet-cremation-urn", "nfc-pet-memorial-card"],
    tags: ["dog"],
  }),
  makeProduct({
    slug: "cat-memorial-photo-ornament",
    title: "Cat Memorial Photo Ornament",
    shortDescription:
      "A ceramic photo ornament featuring your cat's portrait and name. A gentle tribute for holiday display or year-round remembrance.",
    story:
      "For the quiet companions who filled our homes with warmth, this ornament holds their portrait and name in a delicate ceramic form — a small, beautiful reminder that they are still part of the family.",
    price: 34.99,
    collection: "cat-memorial-gifts",
    images: [
      { src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop", alt: "cat memorial photo ornament with personalized portrait", type: "main" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop", alt: "cat memorial ornament hanging display", type: "lifestyle" },
    ],
    specifications: { Material: "Ceramic with ribbon hanger", Size: '3" diameter' },
    relatedSlugs: ["personalized-pet-memorial-frame", "engraved-pet-memorial-pendant", "memorial-sympathy-gift-box", "nfc-pet-memorial-card"],
    tags: ["cat"],
  }),
  makeProduct({
    slug: "ceramic-pet-cremation-urn",
    title: "Ceramic Pet Cremation Urn",
    shortDescription:
      "An elegant ceramic urn with a personalized nameplate. Soft white glaze with gentle gold accents for a serene home tribute.",
    story:
      "Simplicity can hold the deepest meaning. This ceramic urn, with its soft glaze and personalized nameplate, offers a serene resting place — a quiet, beautiful vessel for a companion who brought so much light.",
    price: 74.99,
    collection: "pet-urns",
    images: [
      { src: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=800&fit=crop", alt: "ceramic pet cremation urn with gold nameplate", type: "main" },
    ],
    specifications: { Material: "Glazed ceramic", Size: '5" x 5" x 5" (40 cubic inches)', Color: "Soft white with gold accents" },
    relatedSlugs: ["wooden-pet-cremation-urn", "engraved-pet-memorial-plaque", "personalized-pet-memorial-frame", "nfc-pet-memorial-card"],
    tags: ["urn"],
  }),
  makeProduct({
    slug: "pet-memorial-photo-locket",
    title: "Pet Memorial Photo Locket",
    metaTitle: "Pet Memorial Necklace | Photo Locket",
    metaDescription:
      "Pet memorial necklace with photo locket inside. Sterling silver locket engraved with your pet's name — a deeply personal wearable keepsake.",
    shortDescription:
      "A sterling silver locket that holds your pet's photo inside. Engraved with their name on the front for a deeply personal keepsake.",
    story:
      "Some memories belong close to the heart — literally. Open this locket to find your pet's photo waiting inside, with their name gracefully engraved on the front. A private, intimate tribute you can carry everywhere.",
    price: 69.99,
    collection: "pet-memorial-jewelry",
    images: [
      { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop", alt: "pet memorial photo locket with engraved name", type: "main" },
    ],
    specifications: { Material: "Sterling silver", Size: "20mm locket on 20\" chain" },
    relatedSlugs: ["engraved-pet-memorial-pendant", "memorial-sympathy-gift-box", "personalized-pet-memorial-frame", "nfc-pet-memorial-card"],
    tags: ["jewelry"],
  }),
  makeProduct({
    slug: "digital-memorial-page-standalone",
    title: "Digital Pet Memorial Page",
    metaTitle: "Digital Pet Memorial Page | Online Memory Tribute",
    metaDescription:
      "Create a digital pet memorial page with photos, videos, story, and family messages. Shareable via unique link and QR code.",
    shortDescription:
      "A standalone digital memorial page with photos, videos, story, and family messages. Accessible via unique link and QR code.",
    story:
      "Not every tribute needs to be held in the hand. Sometimes the most meaningful memorial is one that can be shared — a digital page where family and friends can visit, contribute memories, and keep your pet's story alive together.",
    price: 19.99,
    collection: "digital-pet-memorial-keepsakes",
    hasNfc: false,
    customizable: true,
    images: [
      { src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=800&fit=crop", alt: "digital pet memorial page with photos and loving messages", type: "main" },
    ],
    benefits: [...defaultBenefits, "Shareable digital memorial experience", "Family and friends can contribute memories"],
    relatedSlugs: ["nfc-pet-memorial-card", "personalized-pet-memorial-frame", "engraved-pet-memorial-plaque", "memorial-sympathy-gift-box"],
    tags: ["digital"],
  }),
  makeProduct({
    slug: "pet-loss-candle-set",
    title: "Pet Loss Remembrance Candle Set",
    shortDescription:
      "A set of three soy candles with gentle scents and memorial labels. A soft, comforting sympathy gift for pet loss.",
    story:
      "Light carries memory in a quiet way. These hand-poured soy candles, each labeled with a gentle remembrance message, offer a soft glow and calming scent — a simple, beautiful gesture of comfort.",
    price: 29.99,
    collection: "pet-loss-sympathy-gifts",
    customizable: false,
    images: [
      { src: "https://images.unsplash.com/photo-1602607890784-1a62a1a0a2c2?w=800&h=800&fit=crop", alt: "pet loss remembrance candle set with memorial labels", type: "main" },
    ],
    specifications: { Material: "Soy wax, cotton wick", Size: "3 candles, 4oz each", "Personalization method": "Pre-designed memorial labels" },
    relatedSlugs: ["memorial-sympathy-gift-box", "personalized-pet-memorial-frame", "engraved-pet-memorial-pendant", "nfc-pet-memorial-card"],
    tags: ["sympathy", "candle"],
  }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getBestSellers(count = 8): Product[] {
  const bestsellers = products.filter((p) => p.tags.includes("bestseller"));
  return bestsellers.length >= count ? bestsellers.slice(0, count) : products.slice(0, count);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => getProductBySlug(s)).filter(Boolean) as Product[];
}
