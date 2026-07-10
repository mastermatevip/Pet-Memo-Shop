"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MemorialPage } from "@/types";
import { getMemorialPublicUrl } from "@/lib/memorial/url";
import { orderIncludesMemorialProduct } from "@/lib/memorial/constants";
import type { Order } from "@/types";

interface Props {
  order: Order;
  memorials: MemorialPage[];
}

export function OrderMemorialPanel({ order, memorials }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const eligible = orderIncludesMemorialProduct(order.items);

  if (!eligible && memorials.length === 0) return null;

  async function createMemorial() {
    setCreating(true);
    const res = await fetch("/api/admin/memorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNumber: order.orderNumber }),
    });
    setCreating(false);
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div className="rounded-xl border border-gold/30 bg-highlight/50 p-5 space-y-4">
      <div>
        <p className="font-medium text-text">数字纪念页</p>
        <p className="text-sm text-muted mt-1">
          上传照片、视频、故事与家人留言，发布后客户可通过专属链接与二维码访问。
        </p>
      </div>

      {memorials.length > 0 ? (
        <ul className="space-y-2">
          {memorials.map((page) => (
            <li key={page.slug} className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium">{page.petName}</span>
              <span className="text-light">
                {page.status === "published" ? "已发布" : page.status === "draft" ? "草稿" : "已归档"}
              </span>
              <a
                href={`/admin/memorials/${page.slug}`}
                className="text-gold hover:underline"
              >
                编辑
              </a>
              {page.status === "published" ? (
                <a
                  href={getMemorialPublicUrl(page.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  查看页面
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">尚未创建纪念页。</p>
      )}

      {memorials.length === 0 ? (
        <button
          type="button"
          onClick={createMemorial}
          disabled={creating}
          className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover disabled:opacity-60"
        >
          {creating ? "创建中..." : "从本订单创建纪念页（草稿）"}
        </button>
      ) : null}
    </div>
  );
}
