import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { processProductUpload } from "@/lib/cms/process-upload-image";
import { MEMORIALS_UPLOADS_DIR } from "@/lib/cms/paths";

const MAX_BYTES = 20 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

function ensureUploadDir() {
  if (!fs.existsSync(MEMORIALS_UPLOADS_DIR)) {
    fs.mkdirSync(MEMORIALS_UPLOADS_DIR, { recursive: true });
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "未选择文件" }, { status: 400 });
  }

  if (!IMAGE_TYPES.has(file.type) && !VIDEO_TYPES.has(file.type)) {
    return NextResponse.json({ error: "仅支持图片或 MP4/WebM 视频" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "文件不能超过 20MB" }, { status: 400 });
  }

  ensureUploadDir();
  const raw = Buffer.from(await file.arrayBuffer());

  if (VIDEO_TYPES.has(file.type)) {
    const ext = file.type === "video/webm" ? ".webm" : ".mp4";
    const filename = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
    fs.writeFileSync(path.join(MEMORIALS_UPLOADS_DIR, filename), raw);
    return NextResponse.json({
      url: `/uploads/memorials/${filename}`,
      type: "video" as const,
    });
  }

  let processed;
  try {
    processed = await processProductUpload(raw, file.type);
  } catch {
    return NextResponse.json({ error: "图片处理失败" }, { status: 400 });
  }

  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}${processed.ext}`;
  fs.writeFileSync(path.join(MEMORIALS_UPLOADS_DIR, filename), processed.buffer);

  return NextResponse.json({
    url: `/uploads/memorials/${filename}`,
    type: "image" as const,
  });
}
