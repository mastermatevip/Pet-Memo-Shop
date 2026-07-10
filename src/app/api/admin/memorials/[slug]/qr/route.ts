import QRCode from "qrcode";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { getMemorialBySlug } from "@/lib/cms/store";
import { getMemorialPublicUrl } from "@/lib/memorial/url";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const page = getMemorialBySlug(slug);
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const url = getMemorialPublicUrl(page.slug);
  const png = await QRCode.toBuffer(url, {
    width: 512,
    margin: 2,
    color: { dark: "#3A2E25", light: "#FFFFFF" },
  });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
      "Content-Disposition": `inline; filename="${page.slug}-qr.png"`,
    },
  });
}
