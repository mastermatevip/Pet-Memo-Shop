import { Link } from "@/i18n/navigation";
import { ProductImageDisplay } from "@/components/shared/ProductImageDisplay";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface BlogRelatedProductsProps {
  products: Product[];
  title: string;
}

export function BlogRelatedProducts({ products, title }: BlogRelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mb-10 rounded-2xl border border-border bg-card p-5 md:p-6">
      <h2 className="font-serif text-lg text-text mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => {
          const image = product.images[0];
          const displayPrice = product.salePrice ?? product.price;

          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex gap-3 rounded-xl border border-border bg-bg p-3 hover:border-gold hover:bg-highlight transition-colors"
            >
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-highlight">
                {image?.src ? (
                  <ProductImageDisplay
                    src={image.src}
                    alt={image.alt || product.title}
                    sizes="80px"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text line-clamp-2 group-hover:text-gold-dark transition-colors">
                  {product.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-gold">{formatPrice(displayPrice)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
