import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { restoreHomepageImagesFromSeed } from "@/lib/cms/store";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const content = restoreHomepageImagesFromSeed();
  revalidateLocalizedPath("/");

  return NextResponse.json({ content, restored: true });
}
