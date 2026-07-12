"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Coupon, CouponType } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";

interface Props {
  initial: Coupon;
  isNew?: boolean;
}

export function CouponEditor({ initial, isNew = false }: Props) {
  const router = useRouter();
  const [coupon, setCoupon] = useState(initial);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function setField<K extends keyof Coupon>(key: K, value: Coupon[K]) {
    setCoupon((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");
    setError(null);

    const url = isNew
      ? "/api/admin/coupons"
      : `/api/admin/coupons/${encodeURIComponent(coupon.code)}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coupon),
    });

    const data = (await res.json()) as { coupon?: Coupon; error?: string };
    if (!res.ok) {
      setSaveStatus("error");
      setError(data.error ?? "保存失败");
      return;
    }

    setSaveStatus("saved");
    if (isNew && data.coupon) {
      router.replace(`/admin/coupons/${encodeURIComponent(data.coupon.code)}`);
    } else {
      router.refresh();
    }
    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  async function handleDelete() {
    if (!window.confirm(`确定删除优惠券 ${coupon.code}？`)) return;

    const res = await fetch(`/api/admin/coupons/${encodeURIComponent(coupon.code)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("删除失败");
      return;
    }
    router.push("/admin/coupons");
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted">
        优惠码对商品小计生效，礼盒不加折扣。结账页客户输入后由服务器校验。
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="优惠码" hint="大写字母数字，保存后不可改码">
          <input
            className={adminInputClass}
            value={coupon.code}
            onChange={(e) => setField("code", e.target.value.toUpperCase())}
            disabled={!isNew}
            required
            placeholder="WELCOME10"
          />
        </AdminField>
        <AdminField label="状态">
          <select
            className={adminInputClass}
            value={coupon.active ? "active" : "inactive"}
            onChange={(e) => setField("active", e.target.value === "active")}
          >
            <option value="active">启用</option>
            <option value="inactive">停用</option>
          </select>
        </AdminField>
        <AdminField label="类型">
          <select
            className={adminInputClass}
            value={coupon.type}
            onChange={(e) => setField("type", e.target.value as CouponType)}
          >
            <option value="percent">百分比折扣</option>
            <option value="fixed">固定金额减免</option>
          </select>
        </AdminField>
        <AdminField
          label={coupon.type === "percent" ? "折扣百分比" : "减免金额 (USD)"}
          hint={coupon.type === "percent" ? "例如 10 表示 10% off" : "例如 5 表示减 $5"}
        >
          <input
            type="number"
            min="0.01"
            step="0.01"
            className={adminInputClass}
            value={coupon.value}
            onChange={(e) => setField("value", Number(e.target.value))}
            required
          />
        </AdminField>
        <AdminField label="最低商品小计 (USD)" hint="留空表示不限制">
          <input
            type="number"
            min="0"
            step="0.01"
            className={adminInputClass}
            value={coupon.minSubtotal ?? ""}
            onChange={(e) =>
              setField("minSubtotal", e.target.value === "" ? undefined : Number(e.target.value))
            }
            placeholder="可选"
          />
        </AdminField>
        <AdminField label="最大使用次数" hint="留空表示不限次数">
          <input
            type="number"
            min="0"
            step="1"
            className={adminInputClass}
            value={coupon.maxUses ?? ""}
            onChange={(e) =>
              setField("maxUses", e.target.value === "" ? undefined : Number(e.target.value))
            }
            placeholder="可选"
          />
        </AdminField>
        <AdminField label="过期时间" hint="浏览器本地时间，留空不限期">
          <input
            type="datetime-local"
            className={adminInputClass}
            value={coupon.expiresAt ? toLocalInputValue(coupon.expiresAt) : ""}
            onChange={(e) =>
              setField(
                "expiresAt",
                e.target.value ? new Date(e.target.value).toISOString() : undefined
              )
            }
          />
        </AdminField>
        {!isNew ? (
          <AdminField label="已使用次数">
            <input className={adminInputClass} value={coupon.usedCount} disabled />
          </AdminField>
        ) : null}
      </div>

      <AdminField label="内部备注">
        <textarea
          className={adminTextareaClass}
          value={coupon.note ?? ""}
          onChange={(e) => setField("note", e.target.value)}
          rows={3}
          placeholder="仅后台可见"
        />
      </AdminField>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建优惠券" : "保存优惠券"}
        </button>
        {!isNew ? (
          <button
            type="button"
            onClick={() => void handleDelete()}
            className="rounded-full border border-red-200 px-6 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            删除
          </button>
        ) : null}
        <Link href="/admin/coupons" className="text-sm text-muted hover:text-text">
          返回列表
        </Link>
        <SaveStatus status={saveStatus} />
      </div>
    </form>
  );
}

function toLocalInputValue(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
