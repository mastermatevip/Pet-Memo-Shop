import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { getBlogPostsByCategory, getBlogCategoryBySlug } from "@/data/blog";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { loadContentBundle, localizeBlogPost } from "@/lib/localized-content";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const category = getBlogCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} | Pet Memorial Blog`,
    description: category.description,
    path: `/blog/category/${slug}`,
    locale,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const category = getBlogCategoryBySlug(slug);
  if (!category) notFound();

  const t = await getTranslations("common");
  const bundle = await loadContentBundle(locale);
  const posts = getBlogPostsByCategory(slug).map((post) => localizeBlogPost(post, bundle));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link href="/blog" className="text-sm text-gold hover:underline">&larr; {t("backToBlog")}</Link>
      <h1 className="font-serif text-4xl text-text mt-4 mb-3">{category.name}</h1>
      <p className="text-muted text-lg mb-10">{category.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all"
          >
            <h2 className="font-serif text-xl text-text group-hover:text-gold-dark transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-muted text-sm mb-3">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-light">
              <span>{t("minRead", { count: post.readTime })}</span>
              <span>{t("viewCount", { count: post.viewCount })}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
