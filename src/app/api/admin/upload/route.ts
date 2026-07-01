import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import "server-only";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { UPLOADS_DIR } from "@/lib/cms/paths";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

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
    return NextResponse.json({ error: "文件不能超过 5MB" }, { status: 400 });
  }

  const ext = EXT[file.type] ?? (path.extname(file.name) || ".jpg");
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const dir = ensureUploadDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(dir, name), buffer);

  return NextResponse.json({ url: `/uploads/products/${name}` });
}
