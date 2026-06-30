import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "1",
    customerName: "Sarah M.",
    petName: "Bella",
    rating: 5,
    text: "This memorial frame helped our family keep Bella close to our hearts. The quality was beautiful and the personalization was perfect.",
    productPurchased: "Personalized Pet Memorial Frame",
    productSlug: "personalized-pet-memorial-frame",
    verified: true,
    date: "2025-11-15",
  },
  {
    id: "2",
    customerName: "James R.",
    petName: "Max",
    rating: 5,
    text: "The NFC memorial card is such a wonderful idea. We tap it and instantly see all of Max's photos and videos. It brings smiles through the tears.",
    productPurchased: "NFC Pet Memorial Card",
    productSlug: "nfc-pet-memorial-card",
    verified: true,
    date: "2025-10-28",
  },
  {
    id: "3",
    customerName: "Emily K.",
    petName: "Luna",
    rating: 5,
    text: "I ordered the cat memorial necklace for myself after losing Luna. The engraving is delicate and the quality exceeded my expectations.",
    productPurchased: "Engraved Pet Memorial Pendant",
    productSlug: "engraved-pet-memorial-pendant",
    verified: true,
    date: "2025-12-02",
  },
  {
    id: "4",
    customerName: "Michael T.",
    petName: "Charlie",
    rating: 5,
    text: "Sent the memorial gift box to my sister when she lost Charlie. She said it was the most thoughtful gift she received. Beautiful packaging too.",
    productPurchased: "Memorial Sympathy Gift Box",
    productSlug: "memorial-sympathy-gift-box",
    verified: true,
    date: "2025-09-20",
  },
  {
    id: "5",
    customerName: "Anna L.",
    petName: "Cooper",
    rating: 4,
    text: "The wooden urn is elegant and the nameplate engraving is precise. The proof process gave us confidence before it was made.",
    productPurchased: "Wooden Pet Cremation Urn",
    productSlug: "wooden-pet-cremation-urn",
    verified: true,
    date: "2025-11-08",
  },
  {
    id: "6",
    customerName: "David W.",
    petName: "Mochi",
    rating: 5,
    text: "The digital memorial page paired with the NFC card is incredible. Our whole family contributed photos and messages. A truly special tribute.",
    productPurchased: "NFC Pet Memorial Card",
    productSlug: "nfc-pet-memorial-card",
    verified: true,
    date: "2025-12-18",
  },
];

export function getReviewsByProduct(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

export function getFeaturedReviews(count = 6): Review[] {
  return reviews.slice(0, count);
}
