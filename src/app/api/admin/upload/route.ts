import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import "server-only";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { processProductUpload } from "@/lib/cms/process-upload-image";
import { UPLOADS_DIR } from "@/lib/cms/paths";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function ensureUploadDir() {
  const dir = path.join(UPLOADS_DIR, "products");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
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

  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${processed.ext}`;
  const dir = ensureUploadDir();
  fs.writeFileSync(path.join(dir, name), processed.buffer);

  return NextResponse.json({
    url: `/uploads/products/${name}`,
    originalSize,
    size: processed.buffer.length,
    mime: processed.mime,
  });
}
