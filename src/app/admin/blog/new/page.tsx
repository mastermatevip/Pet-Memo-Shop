import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { createBlankBlogPost } from "@/lib/cms/blog-defaults";
import { loadBlogCategories, loadBlogPosts } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default function AdminNewBlogPostPage() {
  const categories = loadBlogCategories();
  const post = createBlankBlogPost(
    loadBlogPosts().map((p) => p.slug),
    categories
  );

  return (
    <AdminShell title="新建文章">
      <BlogPostEditor initial={post} categories={categories} isNew />
    </AdminShell>
  );
}
