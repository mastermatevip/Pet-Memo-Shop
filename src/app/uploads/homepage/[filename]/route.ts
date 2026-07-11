import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { UPLOADS_DIR } from "@/lib/cms/paths";

export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { filename } = await context.params;

  if (!filename || filename.includes("..") || filename.includes("/")) {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = path.join(UPLOADS_DIR, "homepage", filename);
  if (!fs.existsSync(filePath)) {
    return new NextResponse(null, { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const body = fs.readFileSync(filePath);

  return new NextResponse(body, {
    headers: {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
