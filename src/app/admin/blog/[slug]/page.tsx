import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { getBlogPostBySlugFromStore, loadBlogCategories } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminBlogEditPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlugFromStore(slug);
  if (!post) notFound();

  const categories = loadBlogCategories();

  return (
    <AdminShell title={`编辑文章：${post.title}`}>
      <BlogPostEditor initial={post} categories={categories} />
    </AdminShell>
  );
}
