import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/cms/require-admin";
import { loadProducts, saveProducts } from "@/lib/cms/store";
import type { Product } from "@/types";
import { revalidateLocalizedPath } from "@/lib/i18n-revalidate";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

  const { slug: currentSlug } = await context.params;
  const body = (await request.json()) as Product;
  const nextSlug = normalizeSlug(body.slug || "");

  if (!nextSlug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!Array.isArray(body.images) || !body.images.some((img) => img.src?.trim())) {
    return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
  }

  const products = loadProducts();
  const index = products.findIndex((p) => p.slug === currentSlug);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (nextSlug !== currentSlug && products.some((p) => p.slug === nextSlug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const product: Product = {
    ...body,
    slug: nextSlug,
    title: body.title.trim(),
    collection: body.collection?.trim() || products[index].collection,
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
  };

  products[index] = product;

  // Keep related-product links in sync when slug changes.
  if (nextSlug !== currentSlug) {
    for (let i = 0; i < products.length; i++) {
      if (i === index) continue;
      if (!products[i].relatedSlugs.includes(currentSlug)) continue;
      products[i] = {
        ...products[i],
        relatedSlugs: products[i].relatedSlugs.map((s) =>
          s === currentSlug ? nextSlug : s
        ),
      };
    }
  }

  saveProducts(products);

  revalidateLocalizedPath("/");
  revalidateLocalizedPath("/best-sellers");
  revalidateLocalizedPath(`/products/${currentSlug}`);
  if (nextSlug !== currentSlug) {
    revalidateLocalizedPath(`/products/${nextSlug}`);
  }
  revalidateLocalizedPath(`/collections/${product.collection}`);

  return NextResponse.json({ product });
}
