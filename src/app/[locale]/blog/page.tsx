import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import { getBlogCategories, getBlogPosts } from "@/data/blog";
import { loadContentBundle, localizeBlogPost } from "@/lib/localized-content";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("common");
  const tb = await getTranslations("blogPage");
  const bundle = await loadContentBundle(locale);
  const blogCategories = getBlogCategories();
  const blogPosts = [...getBlogPosts()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((post) => localizeBlogPost(post, bundle));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-text mb-4">{tb("title")}</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">{tb("subtitle")}</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {blogCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="px-4 py-2 rounded-full bg-highlight text-muted text-sm hover:bg-highlight hover:text-gold-dark transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <span className="text-xs text-gold font-medium uppercase tracking-wider">{post.category}</span>
              <h2 className="font-serif text-xl text-text mt-2 mb-3 group-hover:text-gold-dark transition-colors">
                {post.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-light">
                <div className="flex items-center gap-3">
                  <span>{t("minRead", { count: post.readTime })}</span>
                  <span>{t("viewCount", { count: post.viewCount })}</span>
                </div>
                <span className="text-gold font-medium group-hover:underline">{t("readMore")} &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
