import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadBlogCategories, loadBlogPosts } from "@/lib/cms/store";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const posts = [...loadBlogPosts()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  const categories = loadBlogCategories();

  return (
    <AdminShell title="博客管理">
      <p className="text-sm text-muted mb-6">
        共 {posts.length} 篇文章，{categories.length} 个分类。Slug 为只读，修改后前台即时生效。
      </p>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">文章</th>
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
