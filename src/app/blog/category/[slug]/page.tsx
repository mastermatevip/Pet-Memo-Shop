import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getBlogPostsByCategory, getBlogCategoryBySlug, blogCategories } from "@/data/blog";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} | Pet Memorial Blog`,
    description: category.description,
    path: `/blog/category/${slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getBlogPostsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link href="/blog" className="text-sm text-gold hover:underline">&larr; Back to Blog</Link>
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
            <p className="text-muted text-sm">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
