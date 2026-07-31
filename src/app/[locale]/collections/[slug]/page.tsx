import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { FAQSection } from "@/components/shared/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { getCollectionBySlug, getAllCollectionSlugs } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { getBlogPostBySlug, getBlogPostsForCollection } from "@/data/blog";
import { localizeCollection, localizeProduct, loadContentBundle, getCollectionPageLabels } from "@/lib/localized-content";
import { routing, type Locale } from "@/i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

/** Primary SEO guide linked near the top of each hub collection. */
const COLLECTION_PRIMARY_GUIDE: Record<string, string> = {
  "pet-memorial-gifts": "personalized-pet-memorial-gifts-buying-guide",
  "dog-memorial-gifts": "dog-memorial-gifts-ideas-to-honor-a-beloved-dog",
  "cat-memorial-gifts": "cat-memorial-gifts-gentle-ways-to-remember",
};

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
  const labels = getCollectionPageLabels(collection, bundle);
  const products = getProductsByCollection(slug).map((p) => localizeProduct(p, bundle));
  const relatedCollections = collection.relatedSlugs
    .map((s) => {
      const rel = getCollectionBySlug(s);
      return rel ? localizeCollection(rel, bundle) : undefined;
    })
    .filter(Boolean);
  const blogPosts = getBlogPostsForCollection(slug, 4);
  const primaryGuideSlug = COLLECTION_PRIMARY_GUIDE[slug];
  const primaryGuide = primaryGuideSlug ? getBlogPostBySlug(primaryGuideSlug) : undefined;

  const seoBlocks = [
    { title: labels.whatAre, body: collection.seoSections.whatAre },
    { title: labels.popularTypes, body: collection.seoSections.popularTypes },
    { title: labels.whenToChoose, body: collection.seoSections.whenToChoose },
    { title: labels.personalization, body: collection.seoSections.personalization },
    { title: labels.buyingGuide, body: collection.seoSections.buyingGuide },
    { title: labels.whyChoose, body: collection.seoSections.whyChoose },
  ].filter((block) => Boolean(block.body));

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
        <p className="text-muted text-lg leading-relaxed max-w-3xl mb-6">
          {collection.intro}
        </p>

        {primaryGuide ? (
          <p className="max-w-3xl mb-10 text-sm text-muted">
            Need help choosing? Read our guide:{" "}
            <Link
              href={`/blog/${primaryGuide.slug}`}
              className="text-gold hover:text-gold-dark underline underline-offset-2 font-medium"
            >
              {primaryGuide.title}
            </Link>
            .
          </p>
        ) : (
          <div className="mb-10" />
        )}

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
          {seoBlocks.map((block) => (
            <div key={block.title}>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </div>
          ))}
        </div>

        <FAQSection faqs={collection.faqs} />

        <section className="py-12">
          <h2 className="font-serif text-2xl text-text mb-6">{labels.relatedCategories}</h2>
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
          <h2 className="font-serif text-xl text-text mb-2">{labels.helpfulGuides}</h2>
          <p className="text-muted text-sm mb-6 max-w-2xl">
            Read these guides for gift ideas and buying tips, then come back to shop this collection.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-border bg-card p-5 hover:border-gold hover:shadow-md transition-all"
              >
                <p className="text-xs uppercase tracking-wider text-gold font-medium mb-2">
                  {post.category}
                </p>
                <h3 className="font-serif text-lg text-text mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-3 text-sm text-gold">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
