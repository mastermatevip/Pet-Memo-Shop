import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/collection/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewsSection } from "@/components/shared/ReviewsSection";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Newsletter } from "@/components/shared/Newsletter";
import { homepageCategories, howItWorksSteps, personalizationOptions, nfcKeyPoints } from "@/data/homepage";
import { getBestSellers } from "@/data/products";
import { getFeaturedReviews } from "@/data/reviews";
import { getLatestBlogPosts } from "@/data/blog";
import { Check, Type, ImageIcon, Calendar, MessageSquare, Gift, Nfc } from "lucide-react";

const personalizationIcons: Record<string, React.ReactNode> = {
  type: <Type className="w-6 h-6" />,
  image: <ImageIcon className="w-6 h-6" />,
  calendar: <Calendar className="w-6 h-6" />,
  message: <MessageSquare className="w-6 h-6" />,
  gift: <Gift className="w-6 h-6" />,
  nfc: <Nfc className="w-6 h-6" />,
};

export function HomePage() {
  const bestSellers = getBestSellers(8);
  const reviews = getFeaturedReviews(6);
  const blogPosts = getLatestBlogPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-highlight via-bg to-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text leading-tight mb-6">
                Honor Their Memory with a Personalized Pet Keepsake
              </h1>
              <p className="text-muted text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Create a meaningful memorial gift for a beloved dog, cat, or companion. Personalized with photos, names, dates, and optional NFC digital memorial pages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/collections/pet-memorial-gifts" size="lg">
                  Shop Memorial Gifts
                </Button>
                <Button href="/digital-pet-memorial" variant="outline" size="lg">
                  Create Digital Memorial
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
                alt="personalized pet memorial frame with candle and flowers in warm natural light"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Shop by Category" subtitle="Find the perfect memorial gift for your beloved companion." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageCategories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Best Selling Pet Memorial Gifts" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/best-sellers" variant="outline">View All Best Sellers</Button>
          </div>
        </div>
      </section>

      {/* NFC Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
                alt="NFC pet memorial card opening a digital memory page on smartphone"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-text mb-4">
                A Memorial Card That Opens Their Story
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Our NFC pet memorial cards allow families to keep photos, videos, stories, and loving messages in one digital memorial page. Simply tap the card with a smartphone to open the memory page.
              </p>
              <ul className="space-y-3 mb-8">
                {nfcKeyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-muted">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button href="/collections/nfc-memorial-cards" size="lg">
                Explore NFC Memorial Cards
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How It Works" subtitle="Creating a personalized memorial gift is simple and thoughtful." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorksSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-btn text-btn-text flex items-center justify-center mx-auto mb-4 text-lg font-serif">
                  {step.step}
                </div>
                <h3 className="font-medium text-text mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalization */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Made Personal for Every Beloved Companion" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {personalizationOptions.map((option) => (
              <div key={option.label} className="text-center p-5 rounded-xl bg-bg hover:bg-highlight transition-colors">
                <div className="w-12 h-12 rounded-full bg-card text-gold flex items-center justify-center mx-auto mb-3 shadow-sm">
                  {personalizationIcons[option.icon]}
                </div>
                <h3 className="font-medium text-text text-sm mb-1">{option.label}</h3>
                <p className="text-xs text-light">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection reviews={reviews} />

      {/* Blog */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Pet Memorial Guides & Sympathy Gift Ideas" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <span className="text-xs text-gold font-medium uppercase tracking-wider">{post.category}</span>
                  <h3 className="font-serif text-xl text-text mt-2 mb-3 group-hover:text-gold-dark transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-gold font-medium group-hover:underline">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/blog" variant="outline">View All Guides</Button>
          </div>
        </div>
      </section>

      <TrustBadges />
      <Newsletter />
    </>
  );
}
