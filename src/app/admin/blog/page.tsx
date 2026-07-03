import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadBlogCategories, loadBlogPosts } from "@/lib/cms/store";
import { isBlogPostPublished } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

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
      <p className="text-sm text-muted mb-6">
        共 {posts.length} 篇文章（已发布 {publishedCount} · 草稿 {draftCount}），{categories.length}{" "}
        个分类。新文章默认为草稿，请在编辑页改为「已发布」后前台可见。
      </p>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">文章</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">分类</th>
              <th className="px-4 py-3 font-medium">浏览量</th>
              <th className="px-4 py-3 font-medium">发布日期</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-light">{post.slug}</p>
                </td>
                <td className="px-4 py-3">
                  {isBlogPostPublished(post) ? (
                    <span className="inline-flex rounded-full bg-highlight px-2.5 py-0.5 text-xs font-medium text-muted">
                      已发布
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold-dark">
                      草稿
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{post.category}</td>
                <td className="px-4 py-3 text-muted">{post.viewCount ?? 0}</td>
                <td className="px-4 py-3 text-muted">{formatDate(post.publishedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${post.slug}`}
                    className="text-gold hover:underline"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
