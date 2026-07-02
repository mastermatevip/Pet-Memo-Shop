import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import "server-only";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { processProductUpload } from "@/lib/cms/process-upload-image";
import { updateProductImageSrc } from "@/lib/cms/store";
import { UPLOADS_DIR } from "@/lib/cms/paths";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function ensureUploadDir() {
  const dir = path.join(UPLOADS_DIR, "products");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function revalidateProduct(slug: string) {
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/best-sellers");
  revalidateLocalizedPath(`/products/${slug}`);
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${slug}`);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const slug = form.get("slug");
  const imageIndexRaw = form.get("imageIndex");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "未选择文件" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "仅支持 JPG、PNG、WebP、GIF" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "文件不能超过 10MB" }, { status: 400 });
  }

  const raw = Buffer.from(await file.arrayBuffer());
  const originalSize = raw.length;

  let processed;
  try {
    processed = await processProductUpload(raw, file.type);
  } catch {
    return NextResponse.json({ error: "图片处理失败，请换一张试试" }, { status: 400 });
  }

  const url = `/uploads/products/${Date.now()}-${randomBytes(6).toString("hex")}${processed.ext}`;
  const filename = url.replace("/uploads/products/", "");
  const dir = ensureUploadDir();

  try {
    fs.writeFileSync(path.join(dir, filename), processed.buffer);
  } catch (err) {
    const code = err instanceof Error && "code" in err ? String((err as NodeJS.ErrnoException).code) : "";
    if (code === "EACCES" || code === "EPERM") {
      return NextResponse.json(
        { error: "上传目录无写入权限，请在容器内执行：chown -R nextjs:nodejs /app/public/uploads" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "保存图片失败" }, { status: 500 });
  }

  let product;
  if (typeof slug === "string" && slug.trim()) {
    const imageIndex = Number(imageIndexRaw ?? 0);
    if (!Number.isFinite(imageIndex) || imageIndex < 0) {
      return NextResponse.json({ error: "图片序号无效" }, { status: 400 });
    }
    product = updateProductImageSrc(slug.trim(), imageIndex, url);
    if (!product) {
      return NextResponse.json({ error: "商品不存在" }, { status: 404 });
    }
    revalidateProduct(slug.trim());
  }

  return NextResponse.json({
    url,
    originalSize,
    size: processed.buffer.length,
    mime: processed.mime,
    product,
    saved: Boolean(product),
  });
}
