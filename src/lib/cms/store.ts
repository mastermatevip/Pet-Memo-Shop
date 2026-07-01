import "server-only";

import fs from "fs";
import path from "path";
import { defaultHomepageFile, defaultProductsFile } from "./defaults";
import { CMS_DIR, HOMEPAGE_FILE, PRODUCTS_FILE, UPLOADS_DIR } from "./paths";
import type { HomepageContent, HomepageFile, ProductsFile } from "./types";
import type { Product } from "@/types";

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readJson<T>(file: string): T | null {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T;
  } catch {
    return null;
  }
}

function writeJson(file: string, data: unknown) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

export function initCmsFiles() {
  ensureDir(CMS_DIR);
  ensureDir(UPLOADS_DIR);
  if (!fs.existsSync(HOMEPAGE_FILE)) {
    writeJson(HOMEPAGE_FILE, defaultHomepageFile());
  }
  if (!fs.existsSync(PRODUCTS_FILE)) {
    writeJson(PRODUCTS_FILE, defaultProductsFile());
  }
}

export function loadHomepageContent(): HomepageContent {
  initCmsFiles();
  const file = readJson<HomepageFile>(HOMEPAGE_FILE);
  return file?.content ?? defaultHomepageFile().content;
}

export function saveHomepageContent(content: HomepageContent): HomepageFile {
  initCmsFiles();
  const file: HomepageFile = { content, updatedAt: new Date().toISOString() };
  writeJson(HOMEPAGE_FILE, file);
  return file;
}

export function loadProducts(): Product[] {
  initCmsFiles();
  const file = readJson<ProductsFile>(PRODUCTS_FILE);
  return file?.products ?? defaultProductsFile().products;
}

export function saveProducts(products: Product[]): ProductsFile {
  initCmsFiles();
  const file: ProductsFile = { products, updatedAt: new Date().toISOString() };
  writeJson(PRODUCTS_FILE, file);
  return file;
}

export function getProductBySlugFromStore(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}
