import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { saveHomepageContent } from "@/lib/cms/store";
import type { HomepageContent } from "@/lib/cms/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { loadHomepageFile, getHomepagePersistenceStatus } = await import("@/lib/cms/store");
  const file = loadHomepageFile();
  return NextResponse.json({
    ...file,
    persistence: getHomepagePersistenceStatus(),
  });
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const content = (await request.json()) as HomepageContent;
  const file = saveHomepageContent(content);
  revalidateLocalizedPath("/");

  return NextResponse.json(file);
}
