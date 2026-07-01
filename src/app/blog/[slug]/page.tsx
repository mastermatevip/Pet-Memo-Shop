import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@/components/shared/FAQSection";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { getBlogPostBySlug, getLatestBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${slug}`,
  });
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let inList = false;
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`}>
          {listItems.map((item, i) => (
            <li key={i}>{item.replace(/^[-*]\s*/, "").replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, ...rows] = tableRows;
      elements.push(
        <table key={`table-${elements.length}`}>
          <thead>
            <tr>{header.map((cell, i) => <th key={i}>{cell.trim()}</th>)}</tr>
          </thead>
          <tbody>
            {rows.filter((r) => !r.every((c) => c.match(/^[-|]+$/))).map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell.trim()}</td>)}</tr>
            ))}
          </tbody>
        </table>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushList();
      inTable = true;
      tableRows.push(trimmed.split("|").filter(Boolean));
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={elements.length}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={elements.length}>{trimmed.slice(4)}</h3>);
    } else if (trimmed.match(/^[-*]\s/) || trimmed.match(/^\d+\.\s/)) {
      inList = true;
      listItems.push(trimmed);
    } else {
      flushList();
      const htmlLine = trimmed
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      elements.push(
        <p key={elements.length} dangerouslySetInnerHTML={{ __html: htmlLine }} />
      );
    }
  }

  flushList();
  flushTable();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getLatestBlogPosts(3).filter((p) => p.slug !== slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-gold hover:underline">&larr; Back to Blog</Link>
      </div>

      <header className="mb-10">
        <span className="text-xs text-gold font-medium uppercase tracking-wider">{post.category}</span>
        <h1 className="font-serif text-3xl md:text-4xl text-text mt-2 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-light">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-bg rounded-xl p-6 mb-10 border border-border">
        <h2 className="font-medium text-text mb-3">In This Guide</h2>
        <ul className="space-y-2 text-sm">
          {post.content
            .split("\n")
            .filter((l) => l.trim().startsWith("## "))
            .map((heading, i) => (
              <li key={i}>
                <span className="text-muted">{heading.replace("## ", "")}</span>
              </li>
            ))}
        </ul>
      </nav>

      <div className="prose-memorial">{renderContent(post.content)}</div>

      <FAQSection faqs={post.faqs} />

      {/* CTA */}
      <div className="mt-12 p-8 bg-highlight rounded-2xl text-center">
        <h2 className="font-serif text-2xl text-text mb-3">Find the Perfect Memorial Gift</h2>
        <p className="text-muted mb-6">Browse our collection of personalized pet memorial keepsakes.</p>
        <Button href="/collections/pet-memorial-gifts">Shop Memorial Gifts</Button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="font-serif text-xl text-text mb-6">More Guides</h2>
          <div className="space-y-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="block p-4 rounded-xl bg-bg hover:bg-highlight transition-colors"
              >
                <span className="font-medium text-text">{rp.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
