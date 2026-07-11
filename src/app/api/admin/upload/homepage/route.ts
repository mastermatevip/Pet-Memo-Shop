import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import "server-only";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { processProductUpload } from "@/lib/cms/process-upload-image";
import { HOMEPAGE_UPLOADS_DIR } from "@/lib/cms/paths";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function ensureUploadDir() {
  if (!fs.existsSync(HOMEPAGE_UPLOADS_DIR)) {
    fs.mkdirSync(HOMEPAGE_UPLOADS_DIR, { recursive: true });
  }
  return HOMEPAGE_UPLOADS_DIR;
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");

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

  const url = `/uploads/homepage/${Date.now()}-${randomBytes(6).toString("hex")}${processed.ext}`;
  const filename = url.replace("/uploads/homepage/", "");
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

  revalidateLocalizedPath("/");

  return NextResponse.json({
    url,
    originalSize,
    size: processed.buffer.length,
    mime: processed.mime,
  });
}
