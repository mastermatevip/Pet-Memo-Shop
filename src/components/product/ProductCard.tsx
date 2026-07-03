"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Eye, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import { ProductImageDisplay } from "@/components/shared/ProductImageDisplay";
import { useCart } from "@/components/cart/CartProvider";
import { CartToast } from "@/components/cart/CartToast";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("common");
  const { addItem } = useCart();
  const [toast, setToast] = useState<string | null>(null);
  const displayPrice = product.salePrice ?? product.price;
  const hasSale = product.salePrice !== undefined;

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <ProductImageDisplay
          src={product.images[0].src}
          alt={product.images[0].alt}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.customizable && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">Customizable</Badge>
          </div>
        )}
        {product.hasNfc && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">NFC</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-btn/0 group-hover:bg-btn/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-card/90 text-text px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <Eye className="w-4 h-4" /> Quick View
          </span>
        </div>
      </Link>

      <div className="p-4 md:p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-text mb-1.5 line-clamp-2 group-hover:text-gold-dark transition-colors">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="text-lg font-semibold text-text">{formatPrice(displayPrice)}</span>
          {hasSale && (
            <span className="text-sm text-light line-through">{formatPrice(product.price)}</span>
          )}
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => {
            addItem({
              productSlug: product.slug,
              title: product.title,
              unitPrice: displayPrice,
            });
            setToast(t("addedToCart"));
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-highlight hover:bg-btn hover:text-btn-text text-text rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
      <CartToast message={toast} onClear={() => setToast(null)} />
    </div>
  );
}
