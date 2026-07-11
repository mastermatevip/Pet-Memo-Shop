import type { CategoryCard, HowItWorksStep, PersonalizationOption } from "@/types";
import { HOMEPAGE_IMAGES } from "@/config/homepage-images";

export const homepageCategories: CategoryCard[] = [
  {
    slug: "dog-memorial-gifts",
    title: "Dog Memorial Gifts",
    description: "Personalized keepsakes to honor your loyal companion.",
    image: HOMEPAGE_IMAGES.categories["dog-memorial-gifts"],
    imageAlt: "dog memorial gifts including personalized photo frame",
  },
  {
    slug: "cat-memorial-gifts",
    title: "Cat Memorial Gifts",
    description: "Gentle tributes for your beloved feline friend.",
    image: HOMEPAGE_IMAGES.categories["cat-memorial-gifts"],
    imageAlt: "cat memorial gifts with personalized keepsakes",
  },
  {
    slug: "pet-memorial-jewelry",
    title: "Pet Memorial Jewelry",
    description: "Wearable keepsakes to keep their memory close.",
    image: HOMEPAGE_IMAGES.categories["pet-memorial-jewelry"],
    imageAlt: "pet memorial jewelry with engraved pendant",
  },
  {
    slug: "pet-urns",
    title: "Pet Urns",
    description: "Elegant urns with personalized nameplates.",
    image: HOMEPAGE_IMAGES.categories["pet-urns"],
    imageAlt: "wooden pet cremation urn with nameplate",
  },
  {
    slug: "nfc-memorial-cards",
    title: "NFC Memorial Tags",
    description: "Carbon fiber tags that open an online memorial.",
    image: HOMEPAGE_IMAGES.categories["nfc-memorial-cards"],
    imageAlt: "carbon fiber NFC pet memorial tag with smartphone",
  },
  {
    slug: "memorial-gift-boxes",
    title: "Memorial Gift Boxes",
    description: "Curated gift sets for remembrance.",
    image: HOMEPAGE_IMAGES.categories["memorial-gift-boxes"],
    imageAlt: "memorial gift box with keepsakes",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Choose Your Keepsake",
    description: "Browse our collection of personalized memorial gifts and select the perfect tribute.",
  },
  {
    step: 2,
    title: "Upload Pet Photo & Details",
    description: "Add your pet's name, photo, dates, and a personal message during checkout.",
  },
  {
    step: 3,
    title: "Preview and Confirm Design",
    description: "We send a design proof for your review before anything goes into production.",
  },
  {
    step: 4,
    title: "Receive Your Memorial Gift",
    description: "Your personalized keepsake arrives beautifully packaged and ready to display.",
  },
  {
    step: 5,
    title: "Open the Digital Memorial Page",
    description: "For NFC products, tap the tag or scan the QR code to access the online memorial page.",
  },
];

export const personalizationOptions: PersonalizationOption[] = [
  { icon: "type", label: "Name Engraving", description: "Your pet's name beautifully engraved" },
  { icon: "image", label: "Photo Printing", description: "Upload your favorite pet photo" },
  { icon: "calendar", label: "Memorial Date", description: "Birth and remembrance dates" },
  { icon: "message", label: "Custom Message", description: "A personal message or quote" },
  { icon: "gift", label: "Gift Box", description: "Premium gift packaging available" },
  { icon: "nfc", label: "NFC Digital Page", description: "Tap to open a digital memorial" },
];

export const nfcKeyPoints = [
  "Add pet photos and videos",
  "Include name, dates, and story",
  "Tap with a smartphone",
  "QR code backup available",
  "Perfect beside an urn, photo frame, or keepsake box",
];

export const digitalMemorialFields = [
  "Pet name",
  "Pet photo",
  "Birth date",
  "Memorial date",
  "Pet story",
  "Photo gallery",
  "Video link",
  "Family message",
  "Favorite memory",
  "Optional guestbook",
];
