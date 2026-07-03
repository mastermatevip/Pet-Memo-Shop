"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Member, MemberStatus, Order } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { MEMBER_STATUS_OPTIONS, MEMBER_SOURCE_LABELS } from "@/lib/members/labels";
import { memberEmailToParam } from "@/lib/members/email";
import { formatDate, formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/orders/labels";

interface Props {
  initial: Member;
  relatedOrders?: Order[];
  isNew?: boolean;
}

export function MemberEditor({ initial, relatedOrders = [], isNew = false }: Props) {
  const router = useRouter();
  const [member, setMember] = useState(initial);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function setField<K extends keyof Member>(key: K, value: Member[K]) {
    setMember((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");

    const url = isNew
      ? "/api/admin/members"
      : `/api/admin/members/${memberEmailToParam(member.email)}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    if (!res.ok) {
      setSaveStatus("error");
      return;
    }

    const data = (await res.json()) as { member?: Member };
    setSaveStatus("saved");

    if (isNew && data.member) {
      router.replace(`/admin/members/${memberEmailToParam(data.member.email)}`);
    } else {
      router.refresh();
    }

    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted">
        邮箱：<code className="font-mono">{member.email || "（新建）"}</code>
        {!isNew ? "（唯一标识，只读）" : ""}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="姓名">
          <input
            className={adminInputClass}
            value={member.name}
            onChange={(e) => setField("name", e.target.value)}
            required
          />
        </AdminField>
        <AdminField label="邮箱">
          <input
            type="email"
            className={adminInputClass}
            value={member.email}
            onChange={(e) => setField("email", e.target.value)}
            required
            readOnly={!isNew}
          />
        </AdminField>
      </div>

      <AdminField label="电话">
        <input
          className={adminInputClass}
          value={member.phone ?? ""}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </AdminField>

      <AdminField label="默认收货地址">
        <textarea
          className={adminTextareaClass}
          rows={4}
          value={member.defaultShippingAddress ?? ""}
          onChange={(e) => setField("defaultShippingAddress", e.target.value)}
        />
      </AdminField>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="状态">
          <select
            className={adminInputClass}
            value={member.status}
            onChange={(e) => setField("status", e.target.value as MemberStatus)}
          >
            {MEMBER_STATUS_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="来源">
          <input
            className={adminInputClass}
            value={MEMBER_SOURCE_LABELS[member.source]}
            readOnly
          />
        </AdminField>
      </div>

      {!isNew ? (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-light">订单数</p>
            <p className="font-serif text-2xl mt-1">{member.orderCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-light">累计消费</p>
            <p className="font-serif text-2xl mt-1">
              {formatPrice(member.totalSpent)} {member.currency}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-light">注册时间</p>
            <p className="text-sm mt-2">{formatDate(member.createdAt)}</p>
          </div>
        </div>
      ) : null}

      <AdminField label="内部备注">
        <textarea
          className={adminTextareaClass}
          rows={4}
          value={member.internalNotes ?? ""}
          onChange={(e) => setField("internalNotes", e.target.value)}
        />
      </AdminField>

      {!isNew && relatedOrders.length > 0 ? (
        <section className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-highlight">
            <h3 className="font-medium text-text">关联订单</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-3 font-medium">订单号</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3 font-medium">金额</th>
                <th className="px-4 py-3 font-medium">日期</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {relatedOrders.map((order) => (
                <tr key={order.orderNumber} className="border-t border-border">
                  <td className="px-4 py-3 font-mono">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-muted">
                    {ORDER_STATUS_LABELS[order.orderStatus]}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {formatPrice(order.totalAmount)} {order.currency}
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
                      className="text-gold hover:underline"
                    >
                      查看
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建会员" : "保存会员"}
        </button>
        <SaveStatus status={saveStatus} />
      </div>
    </form>
  );
}
