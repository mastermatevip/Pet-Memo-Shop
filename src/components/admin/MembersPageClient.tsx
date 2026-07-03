"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Member } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";
import { MEMBER_SOURCE_LABELS, MEMBER_STATUS_LABELS } from "@/lib/members/labels";
import { memberEmailToParam } from "@/lib/members/email";

interface Props {
  initialMembers: Member[];
}

export function MembersPageClient({ initialMembers }: Props) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [members, setMembers] = useState(initialMembers);

  async function handleSync() {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/members?action=sync", { method: "POST" });
      if (res.ok) {
        const data = (await res.json()) as { members: Member[] };
        setMembers(data.members);
        router.refresh();
      }
    } finally {
      setSyncing(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-sm text-muted">共 {members.length} 位会员（按邮箱去重，结账/录单自动入库）</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted hover:border-gold hover:text-text disabled:opacity-60"
          >
            {syncing ? "同步中…" : "从订单同步"}
          </button>
          <Link
            href="/admin/members/new"
            className="rounded-full bg-btn text-btn-text px-5 py-2 text-sm font-medium hover:bg-btn-hover"
          >
            新建会员
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-highlight text-left">
            <tr>
              <th className="px-4 py-3 font-medium">会员</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">来源</th>
              <th className="px-4 py-3 font-medium">订单</th>
              <th className="px-4 py-3 font-medium">累计消费</th>
              <th className="px-4 py-3 font-medium">更新时间</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  暂无会员。点击「从订单同步」导入现有订单客户，或新建会员。
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.email} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-light">{member.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        member.status === "blocked"
                          ? "inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700"
                          : "inline-flex rounded-full bg-highlight px-2.5 py-0.5 text-xs font-medium text-muted"
                      }
                    >
                      {MEMBER_STATUS_LABELS[member.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{MEMBER_SOURCE_LABELS[member.source]}</td>
                  <td className="px-4 py-3 text-muted">{member.orderCount}</td>
                  <td className="px-4 py-3 text-muted">
                    {formatPrice(member.totalSpent)} {member.currency}
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(member.updatedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/members/${memberEmailToParam(member.email)}`}
                      className="text-gold hover:underline"
                    >
                      编辑
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
