import { FAQSection } from "@/components/shared/FAQSection";
import { buildMetadata } from "@/lib/seo";

const faqs = [
  { question: "Can I preview the design before production?", answer: "Yes. We send a design proof for your review and approval before any personalized item goes into production." },
  { question: "How long does personalization take?", answer: "Production typically takes 3–5 business days after you approve your design proof." },
  { question: "Can I upload my pet's photo?", answer: "Yes. You can upload your pet's photo during the personalization step at checkout." },
  { question: "How does the NFC memorial page work?", answer: "The card contains an NFC chip. Tap it with a smartphone to open your pet's digital memorial page. A QR code backup is also included." },
  { question: "Do you ship internationally?", answer: "Yes. We ship worldwide with tracking provided for every order." },
  { question: "Can customized products be returned?", answer: "Customized products cannot be returned unless damaged or incorrect. Non-customized items may be returned within 30 days." },
  { question: "Is this suitable as a sympathy gift?", answer: "Absolutely. Our memorial keepsakes are thoughtfully designed as gentle sympathy gifts." },
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, PayPal, Apple Pay, Google Pay, and Shop Pay." },
];

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Pet Memo Shop pet memorial gifts, personalization, shipping, and NFC digital memorial pages.",
  path: "/faqs",
});

export default function FAQsPage() {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 text-center mb-4">
        <h1 className="font-serif text-4xl text-text">Frequently Asked Questions</h1>
      </div>
      <FAQSection faqs={faqs} />
    </div>
  );
}
