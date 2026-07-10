"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MemorialFamilyMessage, MemorialGalleryItem, MemorialPage } from "@/types";
import { AdminField, adminInputClass, adminTextareaClass } from "@/components/admin/AdminField";
import { SaveStatus } from "@/components/admin/SaveStatus";
import { getMemorialPublicUrl } from "@/lib/memorial/url";

interface Props {
  initial: MemorialPage;
  isNew?: boolean;
}

const STATUS_OPTIONS = [
  ["draft", "草稿"],
  ["published", "已发布"],
  ["archived", "已归档"],
] as const;

export function MemorialEditor({ initial, isNew = false }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(initial);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const publicUrl = getMemorialPublicUrl(page.slug);
  const qrUrl = `/api/admin/memorials/${encodeURIComponent(page.slug)}/qr`;

  function setField<K extends keyof MemorialPage>(key: K, value: MemorialPage[K]) {
    setPage((current) => ({ ...current, [key]: value }));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/admin/memorials/upload", {
      method: "POST",
      body: form,
    });

    setUploading(false);
    if (!res.ok) return null;

    const data = (await res.json()) as { url: string; type: "image" | "video" };
    return data;
  }

  async function handlePortraitUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploaded = await uploadFile(file);
    if (uploaded) setField("portraitUrl", uploaded.url);
    e.target.value = "";
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    const newItems: MemorialGalleryItem[] = [];
    for (const file of Array.from(files)) {
      const uploaded = await uploadFile(file);
      if (uploaded) {
        newItems.push({ url: uploaded.url, type: uploaded.type, alt: page.petName });
      }
    }

    if (newItems.length) {
      setField("gallery", [...page.gallery, ...newItems]);
    }
    e.target.value = "";
  }

  function addVideoUrl() {
    const url = videoUrl.trim();
    if (!url) return;
    setField("gallery", [...page.gallery, { url, type: "video", alt: "Memorial video" }]);
    setVideoUrl("");
  }

  function removeGalleryItem(index: number) {
    setField(
      "gallery",
      page.gallery.filter((_, i) => i !== index)
    );
  }

  function updateFamilyMessage(index: number, patch: Partial<MemorialFamilyMessage>) {
    setField(
      "familyMessages",
      page.familyMessages.map((msg, i) => (i === index ? { ...msg, ...patch } : msg))
    );
  }

  function addFamilyMessage() {
    setField("familyMessages", [...page.familyMessages, { author: "", text: "" }]);
  }

  function removeFamilyMessage(index: number) {
    setField(
      "familyMessages",
      page.familyMessages.filter((_, i) => i !== index)
    );
  }

  function toggleGuestbookApproval(id: string) {
    setField(
      "guestbook",
      page.guestbook.map((entry) =>
        entry.id === id ? { ...entry, approved: !entry.approved } : entry
      )
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");

    const payload = {
      ...page,
      updatedAt: new Date().toISOString(),
    };

    const url = isNew
      ? "/api/admin/memorials"
      : `/api/admin/memorials/${encodeURIComponent(page.slug)}`;
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

    const data = (await res.json()) as { page: MemorialPage };
    setPage(data.page);
    setSaveStatus("saved");

    if (isNew) {
      router.replace(`/admin/memorials/${data.page.slug}`);
    } else {
      router.refresh();
    }
    setTimeout(() => setSaveStatus("idle"), 2000);
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="rounded-lg bg-highlight px-4 py-3 text-sm text-muted space-y-2">
        <p>
          纪念页 Slug：<code className="font-mono">{page.slug}</code>
        </p>
        {!isNew ? (
          <div className="flex flex-wrap items-center gap-3">
            <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              打开链接 →
            </a>
            <button
              type="button"
              className="text-gold hover:underline"
              onClick={() => navigator.clipboard.writeText(publicUrl)}
            >
              复制链接
            </button>
          </div>
        ) : null}
      </div>

      {!isNew ? (
        <div className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-6 items-start">
          <div>
            <p className="text-sm font-medium text-text mb-2">二维码（NFC / 卡片备用）</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Memorial QR code" className="w-40 h-40 rounded-lg border border-border" />
          </div>
          <div className="text-sm text-muted space-y-2">
            <p>专属链接：</p>
            <code className="block text-xs break-all bg-highlight p-2 rounded-lg">{publicUrl}</code>
            <a href={qrUrl} download={`${page.slug}-qr.png`} className="inline-block text-gold hover:underline">
              下载 QR 图片
            </a>
          </div>
        </div>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="宠物名字">
          <input
            className={adminInputClass}
            value={page.petName}
            onChange={(e) => setField("petName", e.target.value)}
            required
          />
        </AdminField>
        <AdminField label="种类（可选）">
          <input
            className={adminInputClass}
            value={page.petType ?? ""}
            onChange={(e) => setField("petType", e.target.value)}
            placeholder="Dog / Cat / ..."
          />
        </AdminField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="出生日期">
          <input
            className={adminInputClass}
            value={page.birthDate ?? ""}
            onChange={(e) => setField("birthDate", e.target.value)}
            placeholder="2012"
          />
        </AdminField>
        <AdminField label="纪念日期">
          <input
            className={adminInputClass}
            value={page.memorialDate ?? ""}
            onChange={(e) => setField("memorialDate", e.target.value)}
            placeholder="2025"
          />
        </AdminField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminField label="客户邮箱">
          <input
            type="email"
            className={adminInputClass}
            value={page.customerEmail}
            onChange={(e) => setField("customerEmail", e.target.value)}
            required
          />
        </AdminField>
        <AdminField label="关联订单号">
          <input
            className={adminInputClass}
            value={page.orderNumber ?? ""}
            onChange={(e) => setField("orderNumber", e.target.value || undefined)}
            placeholder="PA-100001"
          />
        </AdminField>
      </div>

      <AdminField label="发布状态">
        <select
          className={adminInputClass}
          value={page.status}
          onChange={(e) => setField("status", e.target.value as MemorialPage["status"])}
        >
          {STATUS_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </AdminField>

      <AdminField label="主图（头像）">
        <div className="space-y-3">
          {page.portraitUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={page.portraitUrl} alt="" className="w-32 h-32 rounded-full object-cover border border-border" />
          ) : null}
          <input type="file" accept="image/*" onChange={handlePortraitUpload} disabled={uploading} />
        </div>
      </AdminField>

      <AdminField label="故事 / 生平" hint="支持 **粗体**，段落之间空一行">
        <textarea
          className={`${adminTextareaClass} min-h-[180px]`}
          value={page.story ?? ""}
          onChange={(e) => setField("story", e.target.value)}
        />
      </AdminField>

      <AdminField label="照片与视频">
        <div className="space-y-4">
          <input type="file" accept="image/*,video/mp4,video/webm" multiple onChange={handleGalleryUpload} disabled={uploading} />
          <div className="flex gap-2">
            <input
              className={adminInputClass}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="YouTube / Vimeo / 视频链接"
            />
            <button
              type="button"
              onClick={addVideoUrl}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm hover:bg-highlight"
            >
              添加视频
            </button>
          </div>
          <ul className="space-y-2">
            {page.gallery.map((item, index) => (
              <li key={`${item.url}-${index}`} className="flex items-center gap-3 text-sm bg-highlight rounded-lg px-3 py-2">
                <span className="text-light w-14">{item.type === "video" ? "视频" : "图片"}</span>
                <code className="flex-1 truncate text-xs">{item.url}</code>
                <button type="button" className="text-red-600 hover:underline" onClick={() => removeGalleryItem(index)}>
                  删除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </AdminField>

      <AdminField label="家人留言">
        <div className="space-y-3">
          {page.familyMessages.map((msg, index) => (
            <div key={index} className="grid sm:grid-cols-2 gap-2 rounded-lg border border-border p-3">
              <input
                className={adminInputClass}
                value={msg.author}
                onChange={(e) => updateFamilyMessage(index, { author: e.target.value })}
                placeholder="署名"
              />
              <div className="flex gap-2 sm:col-span-2">
                <textarea
                  className={`${adminTextareaClass} flex-1`}
                  rows={2}
                  value={msg.text}
                  onChange={(e) => updateFamilyMessage(index, { text: e.target.value })}
                  placeholder="留言内容"
                />
                <button type="button" className="text-red-600 text-sm self-start" onClick={() => removeFamilyMessage(index)}>
                  删除
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addFamilyMessage} className="text-sm text-gold hover:underline">
            + 添加家人留言
          </button>
        </div>
      </AdminField>

      <AdminField label="访客留言（Guestbook）">
        <label className="flex items-center gap-2 text-sm mb-3">
          <input
            type="checkbox"
            checked={page.guestbookEnabled}
            onChange={(e) => setField("guestbookEnabled", e.target.checked)}
          />
          允许访客提交留言（需审核后显示）
        </label>
        {page.guestbook.length > 0 ? (
          <ul className="space-y-2">
            {page.guestbook.map((entry) => (
              <li key={entry.id} className="rounded-lg border border-border p-3 text-sm">
                <p className="text-muted">{entry.message}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-light">
                    {entry.name} · {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    type="button"
                    className={entry.approved ? "text-green-700" : "text-gold"}
                    onClick={() => toggleGuestbookApproval(entry.id)}
                  >
                    {entry.approved ? "已批准" : "批准显示"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-light">暂无访客留言</p>
        )}
      </AdminField>

      <div className="flex items-center gap-4 sticky bottom-0 bg-bg py-4 border-t border-border">
        <button
          type="submit"
          className="rounded-full bg-btn text-btn-text px-6 py-2.5 text-sm font-medium hover:bg-btn-hover"
        >
          {isNew ? "创建纪念页" : "保存纪念页"}
        </button>
        <SaveStatus status={saveStatus} />
        {uploading ? <span className="text-sm text-muted">上传中...</span> : null}
      </div>
    </form>
  );
}
