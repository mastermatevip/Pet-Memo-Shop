"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderLineItem, OrderStatus, ShippingStatus } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";
import {
  ORDER_STATUS_OPTIONS,
  SHIPPING_STATUS_OPTIONS,
} from "@/lib/orders/labels";

interface Props {
  initial: Order;
  isNew?: boolean;
}

function itemsToText(items: OrderLineItem[]) {
  return items
    .map((item) => `${item.title}|||${item.quantity}|||${item.unitPrice}|||${item.productSlug ?? ""}`)
    .join("\n");
}

function textToItems(text: string): OrderLineItem[] {
  const items: OrderLineItem[] = [];
  for (const line of text.split("\n")) {
    const parts = line.split("|||");
    if (parts.length < 3) continue;
    const title = parts[0]?.trim();
    const quantity = parseInt(parts[1]?.trim() ?? "1", 10);
    const unitPrice = parseFloat(parts[2]?.trim() ?? "0");
    const productSlug = parts[3]?.trim();
    if (!title) continue;
    items.push({
      title,
      quantity: Number.isFinite(quantity) ? quantity : 1,
      unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
      ...(productSlug ? { productSlug } : {}),
    });
  }
  return items;
}

function calcTotal(items: OrderLineItem[]) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function OrderEditor({ initial, isNew = false }: Props) {
  const router = useRouter();
  const [order, setOrder] = useState(initial);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState(isNew);

  function setField<K extends keyof Order>(key: K, value: Order[K]) {
    setOrder((current) => ({ ...current, [key]: value }));
  }

  function updateItemsFromText(text: string) {
    const items = textToItems(text);
    setOrder((current) => ({
      ...current,
      items,
      totalAmount: calcTotal(items),
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");

    const payload = {
      ...order,
      totalAmount: calcTotal(order.items),
      updatedAt: new Date().toISOString(),
      ...(isNew ? { sendConfirmationEmail } : {}),
    };

    const url = isNew ? "/api/admin/orders" : `/api/admin/orders/${encodeURIComponent(order.orderNumber)}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setSaveStatus("error");
      return;
    }

    const data = (await res.json()) as { orders?: Order[]; order?: Order };
    const saved = data.order ?? data.orders?.find((o) => o.orderNumber === payload.orderNumber);

    setSaveStatus("saved");
    if (isNew && saved) {
      router.replace(`/admin/orders/${encodeURIComponent(saved.orderNumber)}`);
    } else {
      router.refresh();
    }
    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted">
        订单号：<code className="font-mono">{order.orderNumber}</code>
        {!isNew ? "（只读）" : "（新建）"}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="客户姓名">
          <input
            className={adminInputClass}
            value={order.customerName}
            onChange={(e) => setField("customerName", e.target.value)}
            required
          />
        </AdminField>
        <AdminField label="客户邮箱">
          <input
            type="email"
            className={adminInputClass}
            value={order.customerEmail}
            onChange={(e) => setField("customerEmail", e.target.value)}
            required
          />
        </AdminField>
      </div>

      <AdminField label="联系电话">
        <input
          className={adminInputClass}
          value={order.customerPhone ?? ""}
          onChange={(e) => setField("customerPhone", e.target.value)}
        />
      </AdminField>

      <AdminField label="收货地址">
        <textarea
          className={adminTextareaClass}
          rows={4}
          value={order.shippingAddress}
          onChange={(e) => setField("shippingAddress", e.target.value)}
          required
        />
      </AdminField>

      <AdminField
        label="订单商品"
        hint="每行一条，格式：商品名称|||数量|||单价|||商品Slug（可选）"
      >
        <textarea
          className={`${adminTextareaClass} min-h-[120px] font-mono text-xs`}
          rows={5}
          value={itemsToText(order.items)}
          onChange={(e) => updateItemsFromText(e.target.value)}
        />
      </AdminField>

      <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
        订单总额：<span className="font-semibold text-text">${calcTotal(order.items).toFixed(2)}</span>
        {" "}
        {order.currency}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="订单状态">
          <select
            className={adminInputClass}
            value={order.orderStatus}
            onChange={(e) => setField("orderStatus", e.target.value as OrderStatus)}
          >
            {ORDER_STATUS_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="物流状态">
          <select
            className={adminInputClass}
            value={order.shippingStatus}
            onChange={(e) => setField("shippingStatus", e.target.value as ShippingStatus)}
          >
            {SHIPPING_STATUS_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </AdminField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="物流公司">
          <input
            className={adminInputClass}
            value={order.carrier ?? ""}
            onChange={(e) => setField("carrier", e.target.value)}
            placeholder="USPS / FedEx / DHL"
          />
        </AdminField>
        <AdminField label="物流单号">
          <input
            className={adminInputClass}
            value={order.trackingNumber ?? ""}
            onChange={(e) => setField("trackingNumber", e.target.value)}
          />
        </AdminField>
      </div>

      <AdminField label="发货时间">
        <input
          type="datetime-local"
          className={adminInputClass}
          value={order.shippedAt ? order.shippedAt.slice(0, 16) : ""}
          onChange={(e) =>
            setField("shippedAt", e.target.value ? new Date(e.target.value).toISOString() : undefined)
          }
        />
      </AdminField>

      <AdminField label="内部备注">
        <textarea
          className={adminTextareaClass}
          rows={4}
          value={order.internalNotes ?? ""}
          onChange={(e) => setField("internalNotes", e.target.value)}
        />
      </AdminField>

      {isNew ? (
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={sendConfirmationEmail}
            onChange={(e) => setSendConfirmationEmail(e.target.checked)}
            className="rounded border-border"
          />
          创建后发送订单确认邮件给客户
        </label>
      ) : null}

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建订单" : "保存订单"}
        </button>
        <SaveStatus status={saveStatus} />
      </div>
    </form>
  );
}
