import "server-only";

import fs from "fs";
import path from "path";
import { defaultHomepageFile, defaultProductsFile, defaultBlogFile, defaultOrdersFile } from "./defaults";
import { CMS_DIR, HOMEPAGE_FILE, PRODUCTS_FILE, BLOG_FILE, ORDERS_FILE, UPLOADS_DIR } from "./paths";
import type { HomepageContent, HomepageFile, ProductsFile, BlogFile, OrdersFile } from "./types";
import type { Product, BlogCategory, BlogPost, Order } from "@/types";
import { isBlogPostPublished } from "@/lib/blog";

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
  if (!fs.existsSync(BLOG_FILE)) {
    writeJson(BLOG_FILE, defaultBlogFile());
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    writeJson(ORDERS_FILE, defaultOrdersFile());
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

export function updateProductImageSrc(
  slug: string,
  imageIndex: number,
  src: string
): Product | undefined {
  const products = loadProducts();
  const productIndex = products.findIndex((p) => p.slug === slug);
  if (productIndex === -1) return undefined;

  const product = products[productIndex];
  const images = product.images.map((img) => ({ ...img }));

  if (imageIndex < 0) return undefined;

  while (images.length <= imageIndex) {
    images.push({
      src: "",
      alt: product.title,
      type: images.length === 0 ? "main" : "detail",
    });
  }

  images[imageIndex] = { ...images[imageIndex], src };
  products[productIndex] = { ...product, images };
  saveProducts(products);
  return products[productIndex];
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    viewCount:
      typeof post.viewCount === "number" && Number.isFinite(post.viewCount) && post.viewCount >= 0
        ? Math.floor(post.viewCount)
        : 0,
    status: post.status === "draft" ? "draft" : "published",
  };
}

function readBlogFile(): BlogFile {
  initCmsFiles();
  const file = readJson<BlogFile>(BLOG_FILE) ?? defaultBlogFile();
  return {
    ...file,
    posts: file.posts.map(normalizeBlogPost),
  };
}

export function loadBlogCategories(): BlogCategory[] {
  return readBlogFile().categories;
}

export function loadBlogPosts(): BlogPost[] {
  return readBlogFile().posts;
}

export function saveBlogData(categories: BlogCategory[], posts: BlogPost[]): BlogFile {
  initCmsFiles();
  const file: BlogFile = {
    categories,
    posts,
    updatedAt: new Date().toISOString(),
  };
  writeJson(BLOG_FILE, file);
  return file;
}

export function getBlogPostBySlugFromStore(slug: string): BlogPost | undefined {
  return loadBlogPosts().find((p) => p.slug === slug);
}

export function incrementBlogPostViewCount(slug: string): BlogPost | undefined {
  const file = readBlogFile();
  const index = file.posts.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;

  const posts = [...file.posts];
  const current = normalizeBlogPost(posts[index]);
  if (!isBlogPostPublished(current)) return undefined;

  posts[index] = { ...current, viewCount: current.viewCount + 1 };
  saveBlogData(file.categories, posts);
  return posts[index];
}

function normalizeOrder(order: Order): Order {
  return {
    ...order,
    orderNumber: order.orderNumber.trim().toUpperCase(),
    customerEmail: order.customerEmail.trim(),
    items: order.items.map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity) || 1),
      unitPrice: Number(item.unitPrice) || 0,
    })),
  };
}

function readOrdersFile() {
  initCmsFiles();
  const file = readJson<OrdersFile>(ORDERS_FILE) ?? defaultOrdersFile();
  return {
    ...file,
    orders: file.orders.map(normalizeOrder),
  };
}

export function loadOrders(): Order[] {
  return readOrdersFile().orders;
}

export function saveOrders(orders: Order[]): OrdersFile {
  initCmsFiles();
  const file: OrdersFile = {
    orders: orders.map(normalizeOrder),
    updatedAt: new Date().toISOString(),
  };
  writeJson(ORDERS_FILE, file);
  return file;
}

export function getOrderByNumberFromStore(orderNumber: string): Order | undefined {
  const normalized = orderNumber.trim().toUpperCase();
  return loadOrders().find((o) => o.orderNumber === normalized);
}

export function generateOrderNumber(): string {
  const orders = loadOrders();
  const numbers = orders
    .map((o) => parseInt(o.orderNumber.replace(/^PA-/i, ""), 10))
    .filter((n) => Number.isFinite(n));
  const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 100001;
  return `PA-${next}`;
}
