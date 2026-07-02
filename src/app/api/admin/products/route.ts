import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadProducts, saveProducts } from "@/lib/cms/store";
import type { Product } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json({ products: loadProducts() });
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as { products: Product[] };
  if (!Array.isArray(body.products)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const file = saveProducts(body.products);
  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/best-sellers");
  revalidateLocalizedPath("/products");

  return NextResponse.json(file);
}
