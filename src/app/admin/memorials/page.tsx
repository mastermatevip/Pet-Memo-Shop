import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { loadMemorialPages } from "@/lib/cms/store";
import { formatDate } from "@/lib/utils";
import { getMemorialPublicUrl } from "@/lib/memorial/url";

export const dynamic = "force-dynamic";

const STATUS_LABELS = {
  draft: "草稿",
  published: "已发布",
  archived: "已归档",
} as const;

export default function AdminMemorialsPage() {
  const pages = [...loadMemorialPages()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <AdminShell title="数字纪念页">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">共 {pages.length} 个纪念页</p>
        <Link
          href="/admin/memorials/new"
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover"
        >
          新建纪念页
        </Link>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">宠物 / Slug</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">订单</th>
              <th className="px-4 py-3 font-medium">更新</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.slug} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-medium">{page.petName}</p>
                  <p className="text-xs text-light">{page.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted">{STATUS_LABELS[page.status]}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted">{page.orderNumber ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{formatDate(page.updatedAt)}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/memorials/${page.slug}`} className="text-gold hover:underline">
                    编辑
                  </Link>
                  {page.status === "published" ? (
                    <a
                      href={getMemorialPublicUrl(page.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline"
                    >
                      查看
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
