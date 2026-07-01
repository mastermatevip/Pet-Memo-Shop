"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Truck, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { PersonalizationForm, WishlistButton } from "@/components/product/PersonalizationForm";
import { ProductCard } from "@/components/product/ProductCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { ReviewsSection } from "@/components/shared/ReviewsSection";
import { NFCExplanation } from "@/components/shared/NFCExplanation";
import { formatPrice, getEstimatedDelivery } from "@/lib/utils";
import { getReviewsByProduct } from "@/data/reviews";
import type { Product } from "@/types";

interface ProductPageContentProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageContent({ product, relatedProducts }: ProductPageContentProps) {
  const [activeImage, setActiveImage] = useState(0);
  const displayPrice = product.salePrice ?? product.price;
  const hasSale = product.salePrice !== undefined;
  const reviews = getReviewsByProduct(product.slug);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-highlight mb-4">
              <Image
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === i ? "border-gold" : "border-transparent"
                  }`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.customizable && <Badge variant="gold">Customizable</Badge>}
              {product.hasNfc && <Badge variant="accent">NFC Enabled</Badge>}
              {product.inStock ? (
                <Badge variant="accent">In Stock</Badge>
              ) : (
                <Badge variant="outline">Out of Stock</Badge>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-text mb-3">{product.title}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

            <div className="flex items-center gap-3 mt-4 mb-6">
              <span className="text-2xl font-semibold text-text">{formatPrice(displayPrice)}</span>
              {hasSale && (
                <span className="text-lg text-light line-through">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="text-muted leading-relaxed mb-6">{product.shortDescription}</p>

            <div className="space-y-3 mb-6">
              <Button size="lg" className="w-full">Add to Cart</Button>
              <Button variant="secondary" size="lg" className="w-full">Buy Now</Button>
              <WishlistButton />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted mb-6">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" /> Est. delivery: {getEstimatedDelivery()}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Proof before production
              </span>
            </div>

            <PersonalizationForm product={product} />
          </div>
        </div>

        {/* Product Story */}
        <section className="py-12 md:py-16 max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-text mb-4">The Story Behind This Keepsake</h2>
          <p className="text-muted leading-relaxed text-lg">{product.story}</p>
        </section>

        {/* Specifications */}
        <section className="py-8 border-t border-border">
          <h2 className="font-serif text-2xl text-text mb-6">Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-2xl">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-border">
                    <td className="py-3 pr-8 text-muted font-medium whitespace-nowrap">{key}</td>
                    <td className="py-3 text-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* NFC Module */}
        {product.hasNfc && <NFCExplanation />}

        {/* Emotional Benefits */}
        <section className="py-12">
          <h2 className="font-serif text-2xl text-text mb-6">Why Families Love This Keepsake</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 bg-bg rounded-xl">
                <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-muted">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping & Returns */}
        <section className="py-8 border-t border-border max-w-3xl">
          <h2 className="font-serif text-2xl text-text mb-4">Shipping & Returns</h2>
          <div className="space-y-3 text-muted leading-relaxed">
            <p>We ship worldwide with tracking provided for every order. Standard shipping takes 5–10 business days depending on your location.</p>
            <p>Customized products cannot be returned unless damaged or incorrect. If you receive a damaged item, please contact us within 14 days with photos.</p>
            <p>Non-customized items may be returned within 30 days in original condition.</p>
          </div>
        </section>

        <FAQSection faqs={product.faqs} />

        {reviews.length > 0 && (
          <ReviewsSection reviews={reviews} title="Customer Reviews" />
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-border">
            <h2 className="font-serif text-2xl text-text mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
