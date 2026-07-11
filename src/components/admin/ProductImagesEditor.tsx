"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Plus, Trash2, Upload } from "lucide-react";
import type { Product, ProductImage } from "@/types";
import { ProductImageDisplay } from "@/components/shared/ProductImageDisplay";
import { AdminField, adminInputClass } from "@/components/admin/AdminField";
import { AdminImagePreview } from "@/components/admin/AdminImagePreview";
import { normalizeImageSrc } from "@/lib/images";

const IMAGE_TYPES: { value: ProductImage["type"]; label: string }[] = [
  { value: "main", label: "主图" },
  { value: "lifestyle", label: "场景图" },
  { value: "detail", label: "细节图" },
  { value: "size", label: "尺寸图" },
  { value: "material", label: "材质图" },
  { value: "packaging", label: "包装图" },
  { value: "nfc", label: "NFC 图" },
];

interface Props {
  productSlug: string;
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

function emptyImage(type: ProductImage["type"] = "detail"): ProductImage {
  return { src: "", alt: "", type };
}

export function ProductImagesEditor({ productSlug, images, onChange }: Props) {
  const router = useRouter();
  const [uploadIndex, setUploadIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadOk, setUploadOk] = useState<string | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  function baseImages(): ProductImage[] {
    return images.length > 0 ? images : [emptyImage("main")];
  }

  function updateImage(index: number, patch: Partial<ProductImage>) {
    const next = baseImages().map((img, i) => (i === index ? { ...img, ...patch } : img));
    onChange(next);
  }

  function removeImage(index: number) {
    const next = baseImages().filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [emptyImage("main")]);
  }

  function moveImage(index: number, direction: -1 | 1) {
    const base = baseImages();
    const target = index + direction;
    if (target < 0 || target >= base.length) return;
    const next = [...base];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function addImage() {
    onChange([...baseImages(), emptyImage(baseImages().length === 0 ? "main" : "detail")]);
  }

  async function handleUpload(index: number, file: File) {
    setUploadIndex(index);
    setUploadError(null);
    setUploadOk(null);

    const body = new FormData();
    body.append("file", file);
    body.append("slug", productSlug);
    body.append("imageIndex", String(index));

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as {
        url?: string;
        error?: string;
        product?: Product;
        saved?: boolean;
      };

      if (!res.ok || !data.url) {
        setUploadError(data.error || "上传失败");
        return;
      }

      if (data.product?.images) {
        onChange(data.product.images);
        setUploadOk(`图片 ${index + 1} 已上传并替换，前台已更新`);
      } else {
        updateImage(index, { src: data.url });
        setUploadOk(`图片 ${index + 1} 已上传，请点击「保存商品」写入`);
      }

      router.refresh();
      setTimeout(() => setUploadOk(null), 4000);
    } catch {
      setUploadError("上传失败，请重试");
    } finally {
      setUploadIndex(null);
    }
  }

  const list = baseImages();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">商品图片</h3>
        <button
          type="button"
          onClick={addImage}
          className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
        >
          <Plus className="w-4 h-4" />
          添加图片
        </button>
      </div>

      <p className="text-sm text-muted">
        点击缩略图可放大查看。上传会立即更新该图并同步到前台（自动压缩为 WebP，最长边 2000px）。修改 URL 或顺序后仍需点「保存商品」。
      </p>

      {uploadError ? <p className="text-sm text-red-700">{uploadError}</p> : null}
      {uploadOk ? <p className="text-sm text-green-700">{uploadOk}</p> : null}

      <div className="space-y-4">
        {list.map((image, index) => (
          <div
            key={`${index}-${image.src}`}
            className="rounded-xl border border-border bg-card p-4 space-y-3"
          >
            <div className="flex gap-4">
              <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-bg border border-border">
                {image.src ? (
                  <AdminImagePreview
                    src={image.src}
                    alt={image.alt || "预览"}
                    className="relative block h-full w-full"
                  >
                    <ProductImageDisplay
                      src={image.src}
                      alt={image.alt || "预览"}
                      sizes="112px"
                    />
                  </AdminImagePreview>
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-light">
                    无预览
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3 min-w-0">
                <div className="grid sm:grid-cols-2 gap-3">
                  <AdminField label={`图片 ${index + 1} · 类型`}>
                    <select
                      className={adminInputClass}
                      value={image.type}
                      onChange={(e) =>
                        updateImage(index, { type: e.target.value as ProductImage["type"] })
                      }
                    >
                      {IMAGE_TYPES.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </AdminField>

                  <AdminField label="Alt 描述">
                    <input
                      className={adminInputClass}
                      value={image.alt}
                      onChange={(e) => updateImage(index, { alt: e.target.value })}
                      placeholder="SEO 图片描述"
                    />
                  </AdminField>
                </div>

                <AdminField label="图片 URL" hint="填 /uploads/products/xxx.webp，不要填 _next/image 地址">
                  <input
                    className={adminInputClass}
                    value={image.src}
                    onChange={(e) => updateImage(index, { src: e.target.value })}
                    onBlur={(e) => updateImage(index, { src: normalizeImageSrc(e.target.value) })}
                    placeholder="/uploads/products/xxx.webp"
                  />
                </AdminField>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={(el) => {
                      fileRefs.current[index] = el;
                    }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleUpload(index, file);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    disabled={uploadIndex === index}
                    onClick={() => fileRefs.current[index]?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gold bg-highlight px-3 py-1.5 text-sm font-medium hover:bg-gold/10 disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    {uploadIndex === index ? "上传中…" : "上传并替换"}
                  </button>

                  <button
                    type="button"
                    onClick={() => moveImage(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-border hover:bg-highlight disabled:opacity-30"
                    title="上移"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, 1)}
                    disabled={index === list.length - 1}
                    className="p-1.5 rounded-lg border border-border hover:bg-highlight disabled:opacity-30"
                    title="下移"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={list.length <= 1}
                    className="inline-flex items-center gap-1 p-1.5 rounded-lg text-red-700 border border-border hover:bg-red-50 disabled:opacity-30"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
