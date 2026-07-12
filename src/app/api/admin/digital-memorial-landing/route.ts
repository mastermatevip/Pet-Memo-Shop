import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadDigitalMemorialLanding, saveDigitalMemorialLanding } from "@/lib/cms/store";
import type { DigitalMemorialLandingContent } from "@/lib/cms/digital-memorial-landing-types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(loadDigitalMemorialLanding());
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const content = (await request.json()) as DigitalMemorialLandingContent;
  const file = saveDigitalMemorialLanding(content);
  revalidateLocalizedPath("/digital-pet-memorial");

  return NextResponse.json(file);
}
