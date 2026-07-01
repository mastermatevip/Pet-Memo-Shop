import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getBlogCategories, getBlogPosts } from "@/data/blog";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Pet Memorial Guides & Sympathy Gift Ideas",
  description:
    "Gentle guides for pet loss support, memorial gift ideas, urn guides, and digital memorial tips. Thoughtful resources for honoring a beloved companion.",
  path: "/blog",
});

export default function BlogPage() {
  const blogCategories = getBlogCategories();
  const blogPosts = [...getBlogPosts()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-text mb-4">
          Pet Memorial Guides & Sympathy Gift Ideas
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          Gentle guides and thoughtful ideas to help you honor a beloved companion or support someone who has lost a pet.
        </p>
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
                <span>{post.readTime} min read</span>
                <span className="text-gold font-medium group-hover:underline">Read more &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
