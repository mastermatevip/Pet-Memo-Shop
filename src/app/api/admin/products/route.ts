import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadProducts, saveProducts } from "@/lib/cms/store";
import type { Product } from "@/types";

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
  revalidatePath("/");
  revalidatePath("/best-sellers");
  revalidatePath("/products/[slug]", "page");

  return NextResponse.json(file);
}
