import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadProducts, saveProducts } from "@/lib/cms/store";
import type { Product } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json({ products: loadProducts() });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await request.json()) as Product;
  const slug = normalizeSlug(body.slug || "");
  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!Array.isArray(body.images) || !body.images.some((img) => img.src?.trim())) {
    return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
  }

  const products = loadProducts();
  if (products.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const product: Product = {
    ...body,
    slug,
    title: body.title.trim(),
    collection: body.collection?.trim() || "pet-memorial-gifts",
    price: Number(body.price) || 0,
    salePrice:
      body.salePrice == null || Number.isNaN(Number(body.salePrice))
        ? undefined
        : Number(body.salePrice),
    images: body.images.filter((img) => img.src?.trim()),
    tags: body.tags ?? [],
    specifications: body.specifications ?? {},
    benefits: body.benefits ?? [],
    faqs: body.faqs ?? [],
    relatedSlugs: body.relatedSlugs ?? [],
    rating: body.rating ?? 5,
    reviewCount: body.reviewCount ?? 0,
    customizable: body.customizable ?? true,
    inStock: body.inStock ?? true,
    hasNfc: body.hasNfc ?? false,
    description: body.description ?? "",
    shortDescription: body.shortDescription ?? "",
    story: body.story ?? "",
  };

  products.push(product);
  saveProducts(products);

  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/best-sellers");
  revalidateLocalizedPath(`/products/${slug}`);
  revalidateLocalizedPath(`/collections/${product.collection}`);

  return NextResponse.json({ product });
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
