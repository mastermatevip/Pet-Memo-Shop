import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadProducts, saveProducts } from "@/lib/cms/store";
import type { Product } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const product = loadProducts().find((p) => p.slug === slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { slug } = await context.params;
  const updated = (await request.json()) as Product;

  if (updated.slug !== slug) {
    return NextResponse.json({ error: "Slug mismatch" }, { status: 400 });
  }

  const products = loadProducts();
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  products[index] = updated;
  const file = saveProducts(products);

  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/best-sellers");
  revalidateLocalizedPath(`/products/${slug}`);

  return NextResponse.json(file);
}
