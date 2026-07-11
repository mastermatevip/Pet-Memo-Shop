"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { AdminImagePreview } from "@/components/admin/AdminImagePreview";
import { normalizeImageSrc } from "@/lib/images";

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  alt?: string;
  altLabel?: string;
  onAltChange?: (alt: string) => void;
}

export function HomepageImageField({
  label,
  value,
  onChange,
  alt,
  altLabel,
  onAltChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload/homepage", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "上传失败");
        return;
      }
      onChange(data.url);
    } catch {
      setError("上传失败");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const previewSrc = normalizeImageSrc(value);

  return (
    <>
      <AdminField
        label={label}
        unlabeled
        hint="点击预览图可放大。推荐使用相对路径，如 /images/homepage/xxx.jpg 或 /uploads/homepage/xxx.webp。"
      >
        <div className="space-y-3">
          {previewSrc ? (
            <AdminImagePreview
              src={previewSrc}
              alt={alt || label}
              className="block w-full max-w-md cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt=""
                className="h-32 w-full rounded-lg border border-border object-cover bg-card"
              />
            </AdminImagePreview>
          ) : (
            <div className="flex h-32 max-w-md items-center justify-center rounded-lg border border-dashed border-border bg-card text-sm text-light">
              暂无图片
            </div>
          )}

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-lg bg-btn px-4 py-2.5 text-sm font-medium text-btn-text hover:bg-btn-hover disabled:opacity-50 sm:w-auto"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "上传中…" : "从本地上传"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />

          <div>
            <p className="mb-1.5 text-xs text-light">或手动填写图片链接</p>
            <input
              className={adminInputClass}
              value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onChange(normalizeImageSrc(e.target.value))}
            placeholder="/images/homepage/... 或 /uploads/homepage/..."
            />
          </div>
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
      </AdminField>
      {altLabel && onAltChange && (
        <AdminField label={altLabel}>
          <input
            className={adminInputClass}
            value={alt ?? ""}
            onChange={(e) => onAltChange(e.target.value)}
          />
        </AdminField>
      )}
    </>
  );
}
