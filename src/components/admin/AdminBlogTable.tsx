"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";
import { isBlogPostPublished } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  posts: BlogPost[];
}

export function AdminBlogTable({ posts: initial }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState(initial);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPosts(initial);
  }, [initial]);

  async function patchStatus(slug: string, status: BlogPost["status"]) {
    setBusySlug(slug);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        setError("操作失败，请重试");
        return;
      }
      const data = (await res.json()) as { post: BlogPost };
      setPosts((list) => list.map((p) => (p.slug === slug ? data.post : p)));
      router.refresh();
    } catch {
      setError("操作失败，请重试");
    } finally {
      setBusySlug(null);
    }
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`确定删除文章「${post.title}」？此操作不可恢复。`)) return;

    setBusySlug(post.slug);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(post.slug)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("删除失败，请重试");
        return;
      }
      setPosts((list) => list.filter((p) => p.slug !== post.slug));
      router.refresh();
    } catch {
      setError("删除失败，请重试");
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
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
            {posts.map((post) => {
              const published = isBlogPostPublished(post);
              const busy = busySlug === post.slug;
              return (
                <tr key={post.slug} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-light">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {published ? (
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
                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() =>
                          void patchStatus(post.slug, published ? "draft" : "published")
                        }
                        className="text-gold hover:underline disabled:opacity-50"
                      >
                        {published ? "下架" : "发布"}
                      </button>
                      <Link
                        href={`/admin/blog/${post.slug}`}
                        className="text-gold hover:underline"
                      >
                        编辑
                      </Link>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void deletePost(post)}
                        className="text-red-700 hover:underline disabled:opacity-50"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
