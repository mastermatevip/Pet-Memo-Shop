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
      "Looking for personalized pet memorial gifts that feel warm, lasting, and truly personal? This collection brings together photo frames, engraved plaques, jewelry, urns, memorial gift boxes, and NFC digital keepsakes — each designed to honor the bond you shared with your dog, cat, or companion animal. Every piece can be customized with a photo, name, dates, and a loving message, and we send a free design proof before production.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop",
    imageAlt: "personalized pet memorial gifts collection with photo frames and keepsakes",
    metaTitle: "Personalized Pet Memorial Gifts – Free Design Proof",
    metaDescription:
      "Honor your pet with personalized memorial gifts — photo frames, jewelry, urns & NFC digital tribute pages. Free design proof before production. Shop thoughtful keepsakes today.",
    relatedSlugs: ["dog-memorial-gifts", "cat-memorial-gifts", "memorial-gift-boxes", "nfc-memorial-cards"],
    faqs: [
      {
        question: "What are the best personalized pet memorial gifts?",
        answer:
          "The most meaningful personalized pet memorial gifts usually include a photo frame, engraved jewelry, an urn, a keepsake box, or an NFC memorial card that opens a digital tribute page. Choose based on whether you want a home display, something wearable, or a shareable online memorial.",
      },
      {
        question: "Can pet memorial gifts be personalized with a photo and name?",
        answer:
          "Yes. Most of our pet memorial gifts can be personalized with your pet's photo, name, memorial dates, and a short message. We prepare a free design proof so you can approve every detail before production.",
      },
      {
        question: "How long do personalized pet memorial gifts take?",
        answer:
          "After you approve the design proof, most personalized pet memorial gifts take about 3–5 business days to produce. Shipping time depends on your location.",
      },
      {
        question: "Are these suitable as sympathy gifts for someone who lost a pet?",
        answer:
          "Absolutely. Personalized pet memorial gifts make gentle sympathy gifts for friends and family. Gift boxes, frames, and NFC cards are especially thoughtful when you want to acknowledge their loss with care.",
      },
      {
        question: "Do you offer digital pet memorial options?",
        answer:
          "Yes. Many families combine a physical keepsake with an NFC memorial tag or card that opens a private digital pet memorial page with photos, videos, and messages.",
      },
    ],
    seoSections: {
      whatAre:
        "Personalized pet memorial gifts are custom keepsakes created to honor a beloved companion after they pass. Unlike generic sympathy items, they usually include your pet's name, photo, dates, or story — turning a frame, necklace, urn, plaque, or NFC card into a lasting tribute you can keep at home or share with family.",
      whenToChoose:
        "Choose personalized pet memorial gifts when you want a lasting tribute for your own pet, when marking an anniversary of their passing, or when offering comfort to someone grieving. They are also a thoughtful option if you want both a physical keepsake and a digital memorial page family members can visit anytime.",
      personalization:
        "You can personalize most gifts with a favorite photo, your pet's name, birth and memorial dates, a short dedication, font style, and optional gift packaging. For NFC keepsakes, personalization also includes building an online memorial page with photos, videos, and guestbook messages. We always send a free design proof before production.",
      whyChoose:
        "Families choose our personalized pet memorial gifts for warm design, careful craftsmanship, free proof-before-production, and optional NFC digital memorial pages. Whether you need a simple frame or a complete gift box, each piece is made to feel personal — not mass-produced.",
      popularTypes:
        "Popular personalized pet memorial gifts include engraved photo frames for home display, wearable memorial jewelry, wooden or ceramic urns, slate plaques, sympathy gift boxes, and NFC memorial cards that open a digital tribute. Start with the keepsake that matches how you want to remember them day to day.",
      buyingGuide:
        "To choose the right personalized pet memorial gift: (1) decide if it is for yourself or as a sympathy gift, (2) pick a display style — home shelf, wearable, or digital, (3) gather one clear photo plus the name and dates you want engraved, and (4) approve the free design proof before we make it. If you are unsure, a personalized frame or memorial gift box is a gentle, widely appreciated place to start.",
    },
  },
  {
    slug: "dog-memorial-gifts",
    name: "Dog Memorial Gifts",
    h1: "Dog Memorial Gifts Personalized for Beloved Dogs",
    description: "Meaningful keepsakes to remember a beloved dog.",
    intro:
      "Browse dog memorial gifts made to honor the loyalty, joy, and everyday companionship of a beloved dog. From personalized photo frames and keepsake boxes to urns, jewelry, and NFC memory cards, each tribute can include your dog's name, photo, and dates — with a free design proof before production so every detail feels right.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=600&fit=crop",
    imageAlt: "dog memorial gifts including personalized photo frame and keepsake box",
    metaTitle: "Dog Memorial Gifts Personalized with Name & Photo",
    metaDescription:
      "Remember your dog with personalized memorial gifts — engraved frames, urns, jewelry & NFC memory cards. Free design proof. Meaningful tributes that keep their story close.",
    relatedSlugs: ["pet-memorial-gifts", "pet-memorial-frames", "nfc-memorial-cards", "pet-urns"],
    faqs: [
      {
        question: "What are the best dog memorial gifts?",
        answer:
          "The best dog memorial gifts are personal: a photo frame with your dog's name, a keepsake box for their collar and tags, an urn, memorial jewelry, or an NFC card that opens a digital memorial page. Choose the piece that best matches how you want to remember them.",
      },
      {
        question: "Can I personalize dog memorial gifts with my dog's photo?",
        answer:
          "Yes. Most dog memorial gifts can be personalized with your dog's photo, name, breed details if you like, and memorial dates. We send a free design proof for approval before production.",
      },
      {
        question: "What dog memorial gift should I give a grieving friend?",
        answer:
          "A personalized frame, keepsake box, or memorial gift set is a thoughtful dog memorial gift for a grieving friend. If they love sharing memories, an NFC memorial card that opens a digital tribute page is also deeply meaningful.",
      },
      {
        question: "Do you offer dog memorial gifts for ashes?",
        answer:
          "Yes. Our urns and many home tributes work beautifully as dog memorial gifts when you want a dignified place for ashes alongside a photo or engraved plaque.",
      },
      {
        question: "How long does it take to receive a personalized dog memorial gift?",
        answer:
          "After design-proof approval, most personalized dog memorial gifts take about 3–5 business days to produce, plus shipping time to your address.",
      },
    ],
    seoSections: {
      whatAre:
        "Dog memorial gifts are personalized tributes created to honor a beloved dog — from engraved pet memorial frames and keepsake boxes to urns, jewelry, plaques, and NFC cards that open an online memorial. They help families keep a dog's story close at home, on a necklace, or in a shareable digital page.",
      whenToChoose:
        "Choose dog memorial gifts when remembering your own companion, marking a birthday or passing anniversary, creating a memory corner at home, or offering comfort to a friend who lost their dog. They are especially helpful when you want something more personal than a generic sympathy card.",
      personalization:
        "Personalize dog memorial gifts with your dog's name, photo, birth and memorial dates, a short message, optional paw-print details, and gift packaging. NFC dog memorial keepsakes can also link to a digital page with photos, videos, and family messages. Every personalized order includes a free design proof.",
      whyChoose:
        "Our dog memorial gifts combine gentle design with meaningful personalization, so the tribute feels like your dog — not a generic product. Families value the free proof step, warm materials, and the option to add an NFC digital memorial alongside a physical keepsake.",
      popularTypes:
        "Popular dog memorial gifts include personalized photo frames, dog memorial keepsake boxes for collars and tags, wooden or ceramic urns, engraved jewelry, memorial plaques, sympathy gift boxes, and NFC memorial cards. Many families pair a home display piece with a digital memorial page.",
      buyingGuide:
        "When shopping for dog memorial gifts: start with one clear favorite photo, decide between a home keepsake or wearable tribute, and choose whether you also want a digital memorial page. If you are gifting for someone else, a frame or keepsake box is usually safest. Approve the free design proof, then we craft the piece and ship it ready to display or gift.",
    },
  },
  {
    slug: "cat-memorial-gifts",
    name: "Cat Memorial Gifts",
    h1: "Cat Memorial Gifts Personalized for Beloved Cats",
    description: "Gentle keepsakes to remember a beloved cat.",
    intro:
      "Browse cat memorial gifts made to honor the quiet companionship of a beloved cat. From personalized photo frames and ornaments to jewelry, urns, gift boxes, and NFC memory cards, each tribute can include your cat's name, photo, and dates — with a free design proof before production so every detail feels gentle and personal.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=600&fit=crop",
    imageAlt: "cat memorial gifts with personalized photo frame and engraved plaque",
    metaTitle: "Cat Memorial Gifts Personalized with Name & Photo",
    metaDescription:
      "Remember your cat with personalized memorial gifts — photo frames, ornaments, jewelry, urns & NFC keepsakes. Free design proof. Gentle tributes for a beloved cat.",
    relatedSlugs: ["pet-memorial-gifts", "pet-memorial-jewelry", "pet-urns", "memorial-gift-boxes"],
    faqs: [
      {
        question: "What are the best cat memorial gifts?",
        answer:
          "The best cat memorial gifts feel personal and gentle: a photo frame or ornament with your cat's portrait, engraved jewelry, an urn, a sympathy gift box, or an NFC card that opens a digital memorial page. Choose the piece that matches how you want to remember them day to day.",
      },
      {
        question: "Can I personalize cat memorial gifts with my cat's photo?",
        answer:
          "Yes. Most cat memorial gifts can be personalized with your cat's photo, name, and memorial dates. We send a free design proof for approval before production.",
      },
      {
        question: "What cat memorial gift should I give a grieving friend?",
        answer:
          "A personalized frame, photo ornament, or memorial gift box is a thoughtful cat memorial gift for a grieving friend. If they like sharing memories, an NFC memorial card that opens a digital tribute page is also deeply meaningful.",
      },
      {
        question: "Do you offer cat memorial gifts for ashes?",
        answer:
          "Yes. Our urns and many home tributes work beautifully as cat memorial gifts when you want a dignified place for ashes alongside a photo or engraved plaque.",
      },
      {
        question: "How long does it take to receive a personalized cat memorial gift?",
        answer:
          "After design-proof approval, most personalized cat memorial gifts take about 3–5 business days to produce, plus shipping time to your address.",
      },
    ],
    seoSections: {
      whatAre:
        "Cat memorial gifts are personalized keepsakes created to honor a beloved cat — from photo frames and ornaments to jewelry, urns, plaques, gift boxes, and NFC cards that open an online memorial. They offer a gentle way to keep a cat's quiet companionship close at home, on a necklace, or in a shareable digital page.",
      whenToChoose:
        "Choose cat memorial gifts when remembering your own companion, marking a birthday or passing anniversary, creating a soft memory corner at home, or offering comfort to a friend who lost their cat. They are especially helpful when you want something more personal than a generic sympathy card.",
      personalization:
        "Personalize cat memorial gifts with your cat's name, photo, birth and memorial dates, a short message, and gift packaging. NFC cat memorial keepsakes can also link to a digital page with photos, videos, and family messages. Every personalized order includes a free design proof.",
      whyChoose:
        "Our cat memorial gifts combine soft, elegant design with meaningful personalization, so the tribute feels like your cat — not a generic product. Families value the free proof step, gentle aesthetics, and the option to add an NFC digital memorial alongside a physical keepsake.",
      popularTypes:
        "Popular cat memorial gifts include personalized photo frames, cat memorial photo ornaments, engraved jewelry, wooden or ceramic urns, memorial plaques, sympathy gift boxes, and NFC memorial cards. Many families pair a home display piece with a digital memorial page.",
      buyingGuide:
        "When shopping for cat memorial gifts: start with one clear favorite photo, decide between a home keepsake or wearable tribute, and choose whether you also want a digital memorial page. If you are gifting for someone else, a frame, ornament, or gift box is usually safest. Approve the free design proof, then we craft the piece and ship it ready to display or gift.",
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
