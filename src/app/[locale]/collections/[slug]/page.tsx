import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { getCollectionBySlug, getAllCollectionSlugs } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { getLatestBlogPosts } from "@/data/blog";
import { localizeCollection, localizeProduct, loadContentBundle } from "@/lib/localized-content";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const base = getCollectionBySlug(slug);
  if (!base) return {};

  const bundle = await loadContentBundle(locale);
  const collection = localizeCollection(base, bundle);

  return buildMetadata({
    title: collection.metaTitle,
    description: collection.metaDescription,
    path: `/collections/${slug}`,
    locale,
  });
}

export default async function CollectionPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  const base = getCollectionBySlug(slug);
  if (!base) notFound();

  const bundle = await loadContentBundle(locale);
  const collection = localizeCollection(base, bundle);
  const products = getProductsByCollection(slug).map((p) => localizeProduct(p, bundle));
  const relatedCollections = collection.relatedSlugs
    .map((s) => {
      const rel = getCollectionBySlug(s);
      return rel ? localizeCollection(rel, bundle) : undefined;
    })
    .filter(Boolean);
  const blogPosts = getLatestBlogPosts(2);

  return (
    <>
      <section className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-btn/40 flex items-center justify-center">
          <h1 className="font-serif text-3xl md:text-5xl text-btn-text text-center px-4">
            {collection.h1 ?? collection.name}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <p className="text-muted text-lg leading-relaxed max-w-3xl mb-10">
          {collection.intro}
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-12 mb-16">
            Browse our full collection of memorial keepsakes below.
          </p>
        )}

        <div className="prose-memorial max-w-3xl mx-auto mb-16 space-y-8">
          <div>
            <h2>What Are {collection.name}?</h2>
            <p>{collection.seoSections.whatAre}</p>
          </div>
          <div>
            <h2>When to Choose This Type of Pet Memorial Gift</h2>
            <p>{collection.seoSections.whenToChoose}</p>
          </div>
          <div>
            <h2>Personalization Options</h2>
            <p>{collection.seoSections.personalization}</p>
          </div>
          <div>
            <h2>Why Families Choose Our Memorial Keepsakes</h2>
            <p>{collection.seoSections.whyChoose}</p>
          </div>
        </div>

        <FAQSection faqs={collection.faqs} />

        <section className="py-12">
          <h2 className="font-serif text-2xl text-text mb-6">Related Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedCollections.map((rel) => rel && (
              <Link
                key={rel.slug}
                href={`/collections/${rel.slug}`}
                className="p-4 rounded-xl bg-highlight hover:bg-bg-secondary transition-colors text-center"
              >
                <span className="text-sm font-medium text-text">{rel.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8 border-t border-border">
          <h2 className="font-serif text-xl text-text mb-4">Helpful Guides</h2>
          <div className="flex flex-wrap gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="text-gold hover:text-gold-dark text-sm underline underline-offset-2"
              >
                {post.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
