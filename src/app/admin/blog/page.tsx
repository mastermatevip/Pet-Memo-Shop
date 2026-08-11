import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminBlogTable } from "@/components/admin/AdminBlogTable";
import { loadBlogCategories, loadBlogPosts } from "@/lib/cms/store";
import { isBlogPostPublished } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const posts = [...loadBlogPosts()].sort((a, b) => {
    const aDraft = a.status === "draft" ? 0 : 1;
    const bDraft = b.status === "draft" ? 0 : 1;
    if (aDraft !== bDraft) return aDraft - bDraft;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
  const categories = loadBlogCategories();
  const draftCount = posts.filter((post) => !isBlogPostPublished(post)).length;
  const publishedCount = posts.length - draftCount;

  return (
    <AdminShell title="博客管理">
      <div className="flex items-center justify-between mb-6 gap-4">
        <p className="text-sm text-muted">
          共 {posts.length} 篇文章（已发布 {publishedCount} · 草稿 {draftCount}），
          {categories.length} 个分类。
        </p>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover shrink-0"
        >
          新建文章
        </Link>
      </div>

      <AdminBlogTable posts={posts} />
    </AdminShell>
  );
}
