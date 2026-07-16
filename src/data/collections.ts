import type { Collection } from "@/types";

const defaultFaqs = (category: string) => [
  {
    question: `What makes our ${category.toLowerCase()} special?`,
    answer: `Each ${category.toLowerCase()} is crafted with care and can be personalized with your pet's name, photo, and memorial dates. We send a design proof before production so you can review every detail.`,
  },
  {
    question: "How long does personalization take?",
    answer:
      "Most personalized memorial gifts take 3–5 business days for production after you approve your design proof. Shipping times vary by location.",
  },
  {
    question: "Can I upload my pet's photo?",
    answer:
      "Yes. During checkout, you can upload a favorite photo of your beloved companion. Our team will carefully prepare it for printing or engraving.",
  },
  {
    question: "Is this suitable as a sympathy gift?",
    answer:
      "Absolutely. Our memorial keepsakes are thoughtfully designed as gentle sympathy gifts for friends and family who have lost a beloved pet.",
  },
];

export const collections: Collection[] = [
  {
    slug: "pet-memorial-gifts",
    name: "Pet Memorial Gifts",
    h1: "Personalized Pet Memorial Gifts",
    description: "Thoughtful personalized keepsakes to honor a beloved companion.",
    intro:
      "Discover personalized pet memorial gifts and unique pet memorial gifts created to honor the bond you shared with your beloved dog, cat, or companion. Each keepsake can be customized with photos, names, dates, and loving messages.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop",
    imageAlt: "personalized pet memorial gifts collection with photo frames and keepsakes",
    metaTitle: "Personalized Pet Memorial Gifts – Free Design Proof",
    metaDescription:
      "Honor your pet with personalized memorial gifts — photo frames, jewelry, urns & NFC digital tribute pages. Free design proof before production. Shop thoughtful keepsakes today.",
    relatedSlugs: ["dog-memorial-gifts", "cat-memorial-gifts", "memorial-gift-boxes", "nfc-memorial-cards"],
    faqs: defaultFaqs("Pet Memorial Gifts"),
    seoSections: {
      whatAre:
        "Pet memorial gifts are personalized keepsakes designed to honor and remember a beloved companion. Popular options include photo frames, engraved plaques, jewelry, urns, and digital memorial pages.",
      whenToChoose:
        "Choose a pet memorial gift when you want a lasting tribute for your own pet, or when offering a thoughtful sympathy gift to someone grieving the loss of their companion.",
      personalization:
        "Most of our memorial gifts can be personalized with your pet's name, photo, memorial date, custom message, font choice, and optional gift box packaging.",
      whyChoose:
        "Families choose our personalized pet memorial gifts for warm design, careful craftsmanship, proof-before-production, and optional NFC digital memorial pages.",
    },
  },
  {
    slug: "dog-memorial-gifts",
    name: "Dog Memorial Gifts",
    h1: "Dog Memorial Gifts & Pet Memorials for Dogs",
    description: "Meaningful keepsakes to remember a beloved dog.",
    intro:
      "Honor the loyal spirit of your beloved dog with personalized dog pet memorial gifts and pet memorials for dogs. From engraved frames to NFC memory cards, each piece is created to keep their story close.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop",
    imageAlt: "dog memorial gifts including personalized photo frame and keepsake box",
    metaTitle: "Dog Memorial Gifts Personalized with Name & Photo",
    metaDescription:
      "Remember your dog with personalized memorial gifts — engraved frames, urns, jewelry & NFC memory cards. Free design proof. Meaningful tributes that keep their story close.",
    relatedSlugs: ["pet-memorial-gifts", "pet-memorial-frames", "nfc-memorial-cards", "pet-urns"],
    faqs: defaultFaqs("Dog Memorial Gifts"),
    seoSections: {
      whatAre:
        "Dog memorial gifts are personalized tributes created to honor the memory of a beloved dog — from pet memorial frames and plaques to urns and wearable keepsakes.",
      whenToChoose:
        "Choose a dog memorial gift when remembering your own companion, marking a special anniversary, or offering comfort to a friend who lost their dog.",
      personalization:
        "Personalize with your dog's name, breed, photo, birth and memorial dates, paw print design, and a heartfelt message.",
      whyChoose:
        "Our dog pet memorial gifts combine gentle design with meaningful personalization, helping families create a warm tribute that feels personal and lasting.",
    },
  },
  {
    slug: "cat-memorial-gifts",
    name: "Cat Memorial Gifts",
    description: "Gentle keepsakes to remember a beloved cat.",
    intro:
      "Celebrate the quiet companionship of your beloved cat with personalized memorial gifts. Each piece is designed with warmth and respect to honor their unique spirit.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=600&fit=crop",
    imageAlt: "cat memorial gifts with personalized photo frame and engraved plaque",
    metaTitle: "Cat Memorial Gifts | Personalized Cat Keepsakes",
    metaDescription:
      "Shop personalized cat memorial gifts. Photo frames, jewelry, urns, and digital keepsakes to remember your beloved cat.",
    relatedSlugs: ["pet-memorial-gifts", "pet-memorial-jewelry", "pet-urns", "memorial-gift-boxes"],
    faqs: defaultFaqs("Cat Memorial Gifts"),
    seoSections: {
      whatAre:
        "Cat memorial gifts are personalized keepsakes created to honor a beloved cat. They offer a gentle way to remember the comfort and companionship they brought.",
      whenToChoose:
        "Choose a cat memorial gift when creating a home tribute, marking a remembrance date, or sending a thoughtful sympathy gift.",
      personalization:
        "Add your cat's name, photo, memorial date, custom message, and optional NFC digital memorial page with photos and stories.",
      whyChoose:
        "Our cat memorial gifts are designed with soft, elegant aesthetics and meaningful personalization options that families cherish.",
    },
  },
  {
    slug: "pet-memorial-jewelry",
    name: "Pet Memorial Jewelry",
    h1: "Pet Memorial Jewelry",
    description: "Wearable keepsakes to keep their memory close.",
    intro:
      "Keep your beloved companion close with personalized pet memorial jewelry — engraved pendants, pet memorial necklaces, photo lockets, and paw print designs crafted with care and elegance.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop",
    imageAlt: "custom cat memorial necklace with engraved pendant",
    metaTitle: "Pet Memorial Jewelry | Pendants, Necklaces & Lockets",
    metaDescription:
      "Shop pet memorial jewelry including pet memorial pendants, necklaces, and photo lockets. Engraved with name, dates, and paw print. Personalized keepsakes to honor your pet.",
    relatedSlugs: ["pet-memorial-gifts", "dog-memorial-gifts", "cat-memorial-gifts", "memorial-gift-boxes"],
    faqs: defaultFaqs("Pet Memorial Jewelry"),
    seoSections: {
      whatAre:
        "Pet memorial jewelry includes necklaces, pendants, bracelets, and lockets — wearable memorial pet jewelry engraved or customized with your pet's name, dates, or photo.",
      whenToChoose:
        "Choose memorial jewelry when you want a wearable keepsake that stays with you throughout the day, or as an intimate sympathy gift.",
      personalization:
        "Options include name engraving, memorial dates, paw print designs, photo lockets, font selection, and premium gift box packaging.",
      whyChoose:
        "Our pet memorial jewelry is crafted with premium materials and gentle design, offering a meaningful way to carry your pet's memory with you.",
    },
  },
  {
    slug: "pet-urns",
    name: "Pet Urns",
    h1: "Pet Memorial Urns",
    description: "Elegant cremation urns with personalized nameplates.",
    intro:
      "Honor your beloved companion with a beautifully crafted pet memorial urn. Choose from wooden, ceramic, and metal pet cremation urns with optional personalized nameplates and photo frames.",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&h=600&fit=crop",
    imageAlt: "wooden pet cremation urn with personalized nameplate",
    metaTitle: "Pet Memorial Urns | Personalized Cremation Urns",
    metaDescription:
      "Shop pet memorial urns for dogs and cats. Wooden, ceramic, and metal cremation urns with personalized nameplates, photo options, and optional NFC memorial cards.",
    relatedSlugs: ["dog-memorial-gifts", "cat-memorial-gifts", "nfc-memorial-cards", "pet-memorial-plaques"],
    faqs: [
      ...defaultFaqs("Pet Urns"),
      {
        question: "What size urn do I need?",
        answer:
          "A general guideline is 1 cubic inch of urn capacity per pound of your pet's weight. Our product pages include size guides to help you choose.",
      },
    ],
    seoSections: {
      whatAre:
        "Pet memorial urns are vessels designed to respectfully hold the ashes of a beloved companion after cremation. They can be displayed at home as a gentle, dignified tribute.",
      whenToChoose:
        "Choose a pet urn when you wish to keep your companion's ashes in a beautiful, personalized vessel at home.",
      personalization:
        "Personalize with engraved nameplates, memorial dates, photo frames, and optional NFC digital memorial cards.",
      whyChoose:
        "Our urns feature warm, elegant designs with careful craftsmanship and personalization options that families trust.",
    },
  },
  {
    slug: "nfc-memorial-cards",
    name: "NFC Memorial Tags",
    h1: "Digital Pet Memorial Tags & NFC Keepsakes",
    description: "Tap to open an online pet memorial page filled with memories.",
    intro:
      "Connect a physical keepsake to a lasting online pet memorial. Our NFC memorial tags and cards — including premium carbon fiber tags — open a digital page with photos, videos, stories, and family messages. Tap with a smartphone or scan the QR code.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    imageAlt: "carbon fiber NFC pet memorial tag opening digital memorial page on smartphone",
    metaTitle: "Digital Pet Memorial Tags | NFC & QR Code Keepsakes",
    metaDescription:
      "Shop digital pet memorial tags with NFC and QR code access. Premium carbon fiber tags and memorial cards open an online page with photos, videos, and stories.",
    relatedSlugs: ["digital-pet-memorial-keepsakes", "pet-memorial-gifts", "dog-memorial-gifts", "memorial-gift-boxes"],
    faqs: [
      {
        question: "What is a digital pet memorial tag?",
        answer:
          "A digital pet memorial tag is a physical keepsake with an embedded NFC chip that opens your pet's online memorial page when tapped with a smartphone. It combines a tangible tribute with a rich digital experience.",
      },
      {
        question: "How does the NFC memorial tag work?",
        answer:
          "The tag contains a small NFC chip linked to your pet's online memorial page. Tap it with a compatible smartphone to open the page in your browser. A QR code backup is also included on every tag and card.",
      },
      {
        question: "What can I include on the online memorial page?",
        answer:
          "Add pet photos, videos, name, birth and memorial dates, their story, family messages, favorite memories, and an optional guestbook.",
      },
      {
        question: "Carbon fiber tag vs memorial card — which should I choose?",
        answer:
          "Choose the carbon fiber NFC memorial tag for a premium, durable keepsake you can wear or display long-term. Choose the memorial card for a classic wallet-size format at a lower price point. Both include full digital memorial page access.",
      },
      {
        question: "Do I need a special app?",
        answer:
          "No app is required. The memorial page opens directly in your phone's web browser when you tap the tag or scan the QR code.",
      },
    ],
    seoSections: {
      whatAre:
        "Digital pet memorial tags are physical keepsakes — carbon fiber tags or memorial cards — embedded with NFC chips. Tapping opens an online pet memorial page with photos, videos, and stories.",
      whenToChoose:
        "Choose an NFC memorial tag when you want both a premium physical keepsake and a shareable online pet memorial for family and friends.",
      personalization:
        "Engrave your pet's name and dates on the tag, then build your online memorial with photos, videos, story, and family messages.",
      whyChoose:
        "Pet Memo Shop offers premium carbon fiber NFC tags and affordable memorial cards — a unique way to create an online pet memorial that grows with your family.",
    },
  },
  {
    slug: "digital-pet-memorial-keepsakes",
    name: "Digital Pet Memorial Keepsakes",
    description: "Online memorial pages to preserve photos, videos, and stories.",
    intro:
      "Create a lasting digital tribute for your beloved companion. Digital pet memorial pages preserve photos, videos, stories, and messages that family and friends can visit anytime.",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=600&fit=crop",
    imageAlt: "digital pet memorial page with photos and loving messages",
    metaTitle: "Digital Pet Memorial Keepsakes | Online Memory Pages",
    metaDescription:
      "Create a digital pet memorial page with photos, videos, and stories. Accessible via NFC card or QR code. Honor your beloved companion online.",
    relatedSlugs: ["nfc-memorial-cards", "pet-memorial-gifts", "pet-memorial-plaques", "pet-memorial-frames"],
    faqs: defaultFaqs("Digital Pet Memorial Keepsakes"),
    seoSections: {
      whatAre:
        "Digital pet memorial keepsakes are online pages dedicated to honoring a beloved companion with photos, videos, stories, and messages from family.",
      whenToChoose:
        "Choose a digital memorial when you want to share memories with family and friends, or pair it with a physical NFC card or plaque.",
      personalization:
        "Include pet name, photo gallery, birth and memorial dates, story, video links, family messages, and an optional guestbook.",
      whyChoose:
        "Our digital memorial pages offer a warm, elegant layout that preserves your pet's story and can be accessed anytime, anywhere.",
    },
  },
  {
    slug: "pet-loss-sympathy-gifts",
    name: "Pet Loss Sympathy Gifts",
    h1: "Pet Memory Gifts & Sympathy Gifts",
    description: "Thoughtful gifts to comfort someone grieving a pet.",
    intro:
      "Offer gentle comfort with thoughtful pet memory gifts and memorial pet gifts. Personalized keepsakes, sympathy gift boxes, and digital tributes created to honor a beloved companion.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=600&fit=crop",
    imageAlt: "pet loss sympathy gift box with memorial frame and candle",
    metaTitle: "Pet Memory Gifts & Pet Loss Sympathy Gifts",
    metaDescription:
      "Shop pet memory gifts and memorial pet gifts for grieving friends and family. Personalized frames, jewelry, candles, and sympathy gift boxes with care.",
    relatedSlugs: ["memorial-gift-boxes", "pet-memorial-gifts", "pet-memorial-frames", "pet-memorial-jewelry"],
    faqs: defaultFaqs("Pet Loss Sympathy Gifts"),
    seoSections: {
      whatAre:
        "Pet memory gifts and memorial pet gifts are thoughtful keepsakes given to someone who has lost a beloved companion, offering a gentle way to honor their pet's memory.",
      whenToChoose:
        "Choose a sympathy gift when a friend, family member, or colleague loses their pet and you want to offer a meaningful, comforting gesture.",
      personalization:
        "Many sympathy gifts can be personalized with the pet's name, photo, and dates. Gift message cards and premium packaging are available.",
      whyChoose:
        "Our sympathy gifts are designed with warmth and respect, making them a thoughtful choice for supporting someone during pet loss.",
    },
  },
  {
    slug: "pet-memorial-frames",
    name: "Pet Memorial Frames",
    h1: "Pet Memorial Frames",
    description: "Personalized photo frames to display a beloved companion.",
    intro:
      "Display your favorite memories in a personalized pet memorial frame. Engraved with your pet's name and dates, each frame is crafted to become a cherished home tribute.",
    image: "https://images.unsplash.com/photo-1513364777864-211d5172054?w=1200&h=600&fit=crop",
    imageAlt: "personalized dog memorial frame with photo and name engraving",
    metaTitle: "Pet Memorial Frames | Personalized Photo Frames",
    metaDescription:
      "Shop pet memorial frames and personalized pet memorial photo frames with name and date engraving. A warm home tribute for your beloved dog or cat.",
    relatedSlugs: ["dog-memorial-gifts", "cat-memorial-gifts", "pet-memorial-plaques", "memorial-gift-boxes"],
    faqs: defaultFaqs("Pet Memorial Frames"),
    seoSections: {
      whatAre:
        "Pet memorial frames are photo frames personalized with your pet's name, dates, and optional custom messages — one of the most popular ways to create a home tribute.",
      whenToChoose:
        "Choose a memorial frame when you want a visible, daily reminder of your beloved companion displayed in your home.",
      personalization:
        "Upload your pet's photo, add their name and memorial dates, choose a font, and select from wood, metal, or acrylic frame styles.",
      whyChoose:
        "Our frames feature premium materials, elegant engraving, and a proof-before-production process for peace of mind.",
    },
  },
  {
    slug: "pet-memorial-plaques",
    name: "Pet Memorial Plaques",
    h1: "Pet Memorial Plaques",
    description: "Engraved plaques to honor a beloved companion.",
    intro:
      "Create a lasting tribute with a personalized pet memorial plaque. Engraved with your pet's name, dates, and a loving message — perfect for display at home or in the garden.",
    image: "https://images.unsplash.com/photo-1494947667420-47e884c7e66e?w=1200&h=600&fit=crop",
    imageAlt: "engraved pet memorial plaque with name and dates",
    metaTitle: "Pet Memorial Plaques | Engraved Pet Tributes",
    metaDescription:
      "Shop pet memorial plaques with name and date engraving. Wood, slate, and metal options for indoor or garden display. Optional NFC digital memorial integration.",
    relatedSlugs: ["pet-memorial-frames", "pet-urns", "nfc-memorial-cards", "dog-memorial-gifts"],
    faqs: defaultFaqs("Pet Memorial Plaques"),
    seoSections: {
      whatAre:
        "Pet memorial plaques are engraved tributes displaying your pet's name, dates, and a custom message — ideal for shelf, garden, or urn-side display.",
      whenToChoose:
        "Choose a memorial plaque for a garden tribute, shelf display, or alongside an urn or photo frame.",
      personalization:
        "Engrave your pet's name, birth and memorial dates, custom message, and optional paw print or photo. NFC chip can be embedded.",
      whyChoose:
        "Our plaques are crafted from quality materials with precise engraving and optional NFC digital memorial integration.",
    },
  },
  {
    slug: "memorial-gift-boxes",
    name: "Memorial Gift Boxes",
    h1: "Memorial Gift Boxes & Pet Memory Boxes",
    description: "Curated gift sets for pet remembrance.",
    intro:
      "Our memorial gift boxes and pet memory boxes bring together personalized keepsakes in beautiful packaging — a thoughtful sympathy gift or a complete remembrance set for your own beloved companion.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=600&fit=crop",
    imageAlt: "memorial gift box with personalized pet keepsake and candle",
    metaTitle: "Memorial Gift Boxes | Pet Memory Box Gift Sets",
    metaDescription:
      "Shop memorial gift boxes and pet memory boxes with personalized keepsakes, candles, and frames. A thoughtful sympathy gift for pet loss.",
    relatedSlugs: ["pet-loss-sympathy-gifts", "pet-memorial-gifts", "pet-memorial-frames", "nfc-memorial-cards"],
    faqs: defaultFaqs("Memorial Gift Boxes"),
    seoSections: {
      whatAre:
        "Memorial gift boxes are curated sets combining personalized keepsakes, candles, frames, or jewelry in premium gift packaging.",
      whenToChoose:
        "Choose a gift box when sending a sympathy gift or when you want a complete remembrance set with coordinated items.",
      personalization:
        "Each box can include personalized items with your pet's name, photo, and dates. Add a gift message card for sympathy gifts.",
      whyChoose:
        "Our gift boxes offer premium presentation and meaningful personalization, making them ideal for gifting or personal remembrance.",
    },
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getAllCollectionSlugs(): string[] {
  return collections.map((c) => c.slug);
}
