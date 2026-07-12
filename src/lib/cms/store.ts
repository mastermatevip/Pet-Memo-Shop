import "server-only";

import fs from "fs";
import path from "path";
import { defaultHomepageFile, defaultProductsFile, defaultBlogFile, defaultOrdersFile, defaultMembersFile, defaultMemorialsFile, defaultCouponsFile } from "./defaults";
import { defaultDigitalMemorialLandingFile } from "./digital-memorial-landing-defaults";
import type {
  DigitalMemorialLandingContent,
  DigitalMemorialLandingFile,
} from "./digital-memorial-landing-types";
import {
  CMS_DIR,
  CMS_SEED_DIR,
  HOMEPAGE_FILE,
  PRODUCTS_FILE,
  BLOG_FILE,
  ORDERS_FILE,
  MEMBERS_FILE,
  MEMORIALS_FILE,
  COUPONS_FILE,
  DIGITAL_MEMORIAL_LANDING_FILE,
  UPLOADS_DIR,
  HOMEPAGE_UPLOADS_DIR,
  MEMORIALS_UPLOADS_DIR,
  CMS_BACKUP_DIR,
  HOMEPAGE_BACKUP_FILE,
} from "./paths";
import type { HomepageContent, HomepageFile, ProductsFile, BlogFile, OrdersFile, MembersFile, MemorialsFile, CouponsFile } from "./types";
import type { Product, BlogCategory, BlogPost, Order, Member, MemorialPage, Coupon } from "@/types";
import { isBlogPostPublished } from "@/lib/blog";
import { syncAllMembersFromOrders } from "@/lib/members/sync";
import { fixTextMojibake, hasTextMojibake } from "./text-encoding";

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

/** Atomic replace so a crash mid-write cannot leave a truncated JSON file. */
function writeJson(file: string, data: unknown) {
  ensureDir(path.dirname(file));
  const payload = JSON.stringify(data, null, 2);
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, payload, "utf-8");
  fs.renameSync(tmp, file);
}

function getCmsSeedPath(filename: string): string | null {
  // Only use the immutable image seed — never treat the live CMS volume as "seed".
  const seedPath = path.join(CMS_SEED_DIR, filename);
  if (fs.existsSync(seedPath)) return seedPath;
  return null;
}

/** Prefer git-tracked seed JSON; fall back to code defaults when the volume is empty. */
function initCmsFile(filename: string, target: string, fallback: () => unknown) {
  if (fs.existsSync(target)) return;

  const seedPath = getCmsSeedPath(filename);
  if (seedPath && seedPath !== target) {
    ensureDir(path.dirname(target));
    fs.copyFileSync(seedPath, target);
    return;
  }

  writeJson(target, fallback());
}

function homepageFileTimestamp(file: HomepageFile | null): number {
  if (!file?.updatedAt) return 0;
  const parsed = Date.parse(file.updatedAt);
  return Number.isFinite(parsed) ? parsed : 0;
}

function pickNewestHomepage(
  a: HomepageFile | null,
  b: HomepageFile | null
): HomepageFile | null {
  if (a?.content && b?.content) {
    return homepageFileTimestamp(b) > homepageFileTimestamp(a) ? b : a;
  }
  if (a?.content) return a;
  if (b?.content) return b;
  return null;
}

function writeHomepageBoth(file: HomepageFile) {
  writeJson(HOMEPAGE_FILE, file);
  ensureDir(CMS_BACKUP_DIR);
  writeJson(HOMEPAGE_BACKUP_FILE, file);
}

/**
 * Resolve homepage from CMS volume + uploads backup.
 * Always heals the older/missing copy so redeploys cannot resurrect seed defaults
 * while a newer backup still exists.
 */
function resolveHomepageFile(): HomepageFile {
  ensureDir(CMS_DIR);
  ensureDir(UPLOADS_DIR);
  ensureDir(CMS_BACKUP_DIR);

  const primary = readJson<HomepageFile>(HOMEPAGE_FILE);
  const backup = readJson<HomepageFile>(HOMEPAGE_BACKUP_FILE);
  const newest = pickNewestHomepage(primary, backup);

  if (newest) {
    const primaryTs = homepageFileTimestamp(primary);
    const backupTs = homepageFileTimestamp(backup);
    const newestTs = homepageFileTimestamp(newest);

    if (!primary?.content || primaryTs < newestTs) {
      writeJson(HOMEPAGE_FILE, newest);
    }
    if (!backup?.content || backupTs < newestTs) {
      writeJson(HOMEPAGE_BACKUP_FILE, newest);
    }
    return newest;
  }

  const seedPath = getCmsSeedPath("homepage.json");
  const seeded =
    (seedPath ? readJson<HomepageFile>(seedPath) : null) ?? defaultHomepageFile();
  writeHomepageBoth(seeded);
  return seeded;
}

export function getHomepagePersistenceStatus() {
  const resolved = resolveHomepageFile();
  const primary = readJson<HomepageFile>(HOMEPAGE_FILE);
  const backup = readJson<HomepageFile>(HOMEPAGE_BACKUP_FILE);

  let writableCms = false;
  let writableBackup = false;
  try {
    ensureDir(CMS_DIR);
    fs.accessSync(CMS_DIR, fs.constants.W_OK);
    writableCms = true;
  } catch {
    writableCms = false;
  }
  try {
    ensureDir(CMS_BACKUP_DIR);
    fs.accessSync(CMS_BACKUP_DIR, fs.constants.W_OK);
    writableBackup = true;
  } catch {
    writableBackup = false;
  }

  return {
    updatedAt: resolved.updatedAt,
    cmsPath: HOMEPAGE_FILE,
    backupPath: HOMEPAGE_BACKUP_FILE,
    cmsUpdatedAt: primary?.updatedAt ?? null,
    backupUpdatedAt: backup?.updatedAt ?? null,
    writableCms,
    writableBackup,
    inSync:
      Boolean(primary?.updatedAt) &&
      Boolean(backup?.updatedAt) &&
      primary?.updatedAt === backup?.updatedAt,
  };
}

export function initCmsFiles() {
  ensureDir(CMS_DIR);
  ensureDir(UPLOADS_DIR);
  ensureDir(HOMEPAGE_UPLOADS_DIR);
  ensureDir(MEMORIALS_UPLOADS_DIR);
  ensureDir(CMS_BACKUP_DIR);
  // Homepage: always reconcile cms + durable uploads backup before anything else.
  resolveHomepageFile();
  initCmsFile("products.json", PRODUCTS_FILE, defaultProductsFile);
  initCmsFile("blog.json", BLOG_FILE, defaultBlogFile);
  initCmsFile("orders.json", ORDERS_FILE, defaultOrdersFile);
  if (!fs.existsSync(MEMBERS_FILE)) {
    initCmsFile("members.json", MEMBERS_FILE, defaultMembersFile);
    syncAllMembersFromOrders(loadOrders());
  }
  initCmsFile("memorials.json", MEMORIALS_FILE, defaultMemorialsFile);
  initCmsFile("coupons.json", COUPONS_FILE, defaultCouponsFile);
  initCmsFile(
    "digital-memorial-landing.json",
    DIGITAL_MEMORIAL_LANDING_FILE,
    defaultDigitalMemorialLandingFile
  );
}

export function loadHomepageContent(): HomepageContent {
  return resolveHomepageFile().content;
}

export function loadHomepageFile(): HomepageFile {
  return resolveHomepageFile();
}

export function saveHomepageContent(content: HomepageContent): HomepageFile {
  ensureDir(CMS_DIR);
  ensureDir(CMS_BACKUP_DIR);
  const file: HomepageFile = { content, updatedAt: new Date().toISOString() };
  writeHomepageBoth(file);
  return file;
}

function readHomepageSeedFile(): HomepageFile {
  const seedPath = getCmsSeedPath("homepage.json");
  if (seedPath) {
    const file = readJson<HomepageFile>(seedPath);
    if (file?.content) return file;
  }
  return defaultHomepageFile();
}

/** Restore homepage image URLs from Git seed without changing copy text. */
export function restoreHomepageImagesFromSeed(): HomepageContent {
  const seed = readHomepageSeedFile().content;
  const current = loadHomepageContent();

  const merged: HomepageContent = {
    ...current,
    hero: { ...current.hero, image: { ...seed.hero.image } },
    sections: {
      ...current.sections,
      nfc: { ...current.sections.nfc, image: { ...seed.sections.nfc.image } },
    },
    categories: current.categories.map((cat) => {
      const seedCat = seed.categories.find((c) => c.slug === cat.slug);
      if (!seedCat) return cat;
      return { ...cat, image: seedCat.image, imageAlt: seedCat.imageAlt };
    }),
  };

  saveHomepageContent(merged);
  return merged;
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
  const faqs = post.faqs.map((faq) => ({
    question: fixTextMojibake(faq.question),
    answer: fixTextMojibake(faq.answer),
  }));

  return {
    ...post,
    title: fixTextMojibake(post.title),
    metaTitle: fixTextMojibake(post.metaTitle),
    metaDescription: fixTextMojibake(post.metaDescription),
    excerpt: fixTextMojibake(post.excerpt),
    category: fixTextMojibake(post.category),
    content: fixTextMojibake(post.content),
    faqs,
    viewCount:
      typeof post.viewCount === "number" && Number.isFinite(post.viewCount) && post.viewCount >= 0
        ? Math.floor(post.viewCount)
        : 0,
    status: post.status === "draft" ? "draft" : "published",
  };
}

function blogPostHasMojibake(post: BlogPost): boolean {
  const textFields = [
    post.title,
    post.metaTitle,
    post.metaDescription,
    post.excerpt,
    post.category,
    post.content,
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];
  return textFields.some(hasTextMojibake);
}

function repairBlogPostFromSeed(post: BlogPost, seedPost: BlogPost | undefined): BlogPost {
  const normalized = normalizeBlogPost(post);
  if (!blogPostHasMojibake(normalized) || !seedPost) {
    return normalized;
  }

  const seedNormalized = normalizeBlogPost(seedPost);
  return {
    ...seedNormalized,
    status: normalized.status,
    viewCount: normalized.viewCount,
    publishedAt: normalized.publishedAt,
  };
}

function repairBlogMojibake(file: BlogFile): BlogFile {
  const seedBySlug = new Map(defaultBlogFile().posts.map((post) => [post.slug, post]));
  let changed = false;

  const posts = file.posts.map((post) => {
    const repaired = repairBlogPostFromSeed(post, seedBySlug.get(post.slug));
    if (JSON.stringify(repaired) !== JSON.stringify(post)) {
      changed = true;
    }
    return repaired;
  });

  if (!changed) {
    return file;
  }

  return saveBlogData(file.categories, posts);
}

function mergeBlogPostsFromSeed(file: BlogFile): BlogFile {
  const seed = defaultBlogFile();
  const existingSlugs = new Set(file.posts.map((p) => p.slug));
  const missingPosts = seed.posts.filter((p) => !existingSlugs.has(p.slug));

  const existingCategorySlugs = new Set(file.categories.map((c) => c.slug));
  const missingCategories = seed.categories.filter((c) => !existingCategorySlugs.has(c.slug));

  if (missingPosts.length === 0 && missingCategories.length === 0) {
    return file;
  }

  return saveBlogData(
    [...file.categories, ...missingCategories],
    [...file.posts, ...missingPosts.map(normalizeBlogPost)]
  );
}

function readBlogFile(): BlogFile {
  initCmsFiles();
  const file = readJson<BlogFile>(BLOG_FILE) ?? defaultBlogFile();
  const merged = mergeBlogPostsFromSeed(file);
  const repaired = repairBlogMojibake(merged);
  return {
    ...repaired,
    posts: repaired.posts.map(normalizeBlogPost),
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
    memorialSlugs: order.memorialSlugs?.filter(Boolean),
    couponCode: order.couponCode?.trim().toUpperCase() || undefined,
    discountAmount:
      order.discountAmount == null ? undefined : Math.max(0, Number(order.discountAmount) || 0),
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

function normalizeMember(member: Member): Member {
  return {
    ...member,
    email: member.email.trim().toLowerCase(),
    name: member.name.trim(),
    phone: member.phone?.trim() || undefined,
    defaultShippingAddress: member.defaultShippingAddress?.trim() || undefined,
    status: member.status === "blocked" ? "blocked" : "active",
    source:
      member.source === "manual" || member.source === "import" || member.source === "checkout"
        ? member.source
        : "manual",
    orderCount: Math.max(0, member.orderNumbers?.length ?? member.orderCount ?? 0),
    totalSpent: Number(member.totalSpent) || 0,
    currency: member.currency || "USD",
    orderNumbers: member.orderNumbers ?? [],
    internalNotes: member.internalNotes?.trim() || undefined,
  };
}

function readMembersFile(): MembersFile {
  initCmsFiles();
  const file = readJson<MembersFile>(MEMBERS_FILE) ?? defaultMembersFile();
  return {
    ...file,
    members: file.members.map(normalizeMember),
  };
}

export function loadMembers(): Member[] {
  return readMembersFile().members;
}

export function saveMembers(members: Member[]): MembersFile {
  initCmsFiles();
  const file: MembersFile = {
    members: members.map(normalizeMember),
    updatedAt: new Date().toISOString(),
  };
  writeJson(MEMBERS_FILE, file);
  return file;
}

export function getMemberByEmailFromStore(email: string): Member | undefined {
  const normalized = email.trim().toLowerCase();
  return loadMembers().find((m) => m.email === normalized);
}

function normalizeMemorialPage(page: MemorialPage): MemorialPage {
  return {
    ...page,
    slug: page.slug.trim().toLowerCase(),
    customerEmail: page.customerEmail.trim().toLowerCase(),
    petName: page.petName.trim(),
    petType: page.petType?.trim() || undefined,
    birthDate: page.birthDate?.trim() || undefined,
    memorialDate: page.memorialDate?.trim() || undefined,
    portraitUrl: page.portraitUrl?.trim() || undefined,
    story: page.story?.trim() || undefined,
    gallery: page.gallery.map((item) => ({
      url: item.url.trim(),
      alt: item.alt?.trim() || undefined,
      type: item.type === "video" ? "video" : "image",
    })),
    familyMessages: page.familyMessages.map((msg) => ({
      author: msg.author.trim(),
      text: msg.text.trim(),
    })),
    guestbookEnabled: Boolean(page.guestbookEnabled),
    guestbook: page.guestbook.map((entry) => ({
      ...entry,
      name: entry.name.trim(),
      message: entry.message.trim(),
      approved: Boolean(entry.approved),
    })),
    status:
      page.status === "published" || page.status === "archived" ? page.status : "draft",
    orderNumber: page.orderNumber?.trim().toUpperCase() || undefined,
  };
}

function readMemorialsFile(): MemorialsFile {
  initCmsFiles();
  const file = readJson<MemorialsFile>(MEMORIALS_FILE) ?? defaultMemorialsFile();
  return {
    ...file,
    pages: file.pages.map(normalizeMemorialPage),
  };
}

export function loadMemorialPages(): MemorialPage[] {
  return readMemorialsFile().pages;
}

export function getMemorialSlugs(): string[] {
  return loadMemorialPages().map((page) => page.slug);
}

export function getMemorialBySlug(slug: string): MemorialPage | undefined {
  const normalized = slug.trim().toLowerCase();
  return loadMemorialPages().find((page) => page.slug === normalized);
}

export function getPublishedMemorialBySlug(slug: string): MemorialPage | undefined {
  const page = getMemorialBySlug(slug);
  if (!page || page.status !== "published") return undefined;
  return page;
}

export function getMemorialByOrderNumber(orderNumber: string): MemorialPage | undefined {
  const normalized = orderNumber.trim().toUpperCase();
  return loadMemorialPages().find((page) => page.orderNumber === normalized);
}

export function saveMemorialPages(pages: MemorialPage[]): MemorialsFile {
  initCmsFiles();
  const file: MemorialsFile = {
    pages: pages.map(normalizeMemorialPage),
    updatedAt: new Date().toISOString(),
  };
  writeJson(MEMORIALS_FILE, file);
  return file;
}

export function saveMemorialPage(page: MemorialPage): MemorialPage {
  const pages = loadMemorialPages();
  const normalized = normalizeMemorialPage(page);
  const index = pages.findIndex((p) => p.slug === normalized.slug);
  if (index === -1) {
    pages.push(normalized);
  } else {
    pages[index] = normalized;
  }
  saveMemorialPages(pages);
  return normalized;
}

export function deleteMemorialPage(slug: string): boolean {
  const normalized = slug.trim().toLowerCase();
  const pages = loadMemorialPages();
  const next = pages.filter((page) => page.slug !== normalized);
  if (next.length === pages.length) return false;
  saveMemorialPages(next);
  return true;
}

export function updateOrderMemorialSlugs(orderNumber: string, slugs: string[]): Order | undefined {
  const normalized = orderNumber.trim().toUpperCase();
  const orders = loadOrders();
  const index = orders.findIndex((order) => order.orderNumber === normalized);
  if (index === -1) return undefined;

  orders[index] = {
    ...orders[index],
    memorialSlugs: [...new Set(slugs.filter(Boolean))],
    updatedAt: new Date().toISOString(),
  };
  saveOrders(orders);
  return orders[index];
}

export function addGuestbookEntry(
  slug: string,
  entry: { name: string; message: string }
): MemorialPage | undefined {
  const page = getMemorialBySlug(slug);
  if (!page || !page.guestbookEnabled || page.status !== "published") return undefined;

  const now = new Date().toISOString();
  const updated: MemorialPage = {
    ...page,
    guestbook: [
      ...page.guestbook,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: entry.name.trim(),
        message: entry.message.trim(),
        createdAt: now,
        approved: false,
      },
    ],
    updatedAt: now,
  };

  return saveMemorialPage(updated);
}

function normalizeCoupon(coupon: Coupon): Coupon {
  const code = coupon.code.trim().toUpperCase();
  const type: Coupon["type"] = coupon.type === "percent" ? "percent" : "fixed";
  const value = Math.max(0, Number(coupon.value) || 0);
  const usedCount = Math.max(0, Math.floor(Number(coupon.usedCount) || 0));
  const maxUses =
    coupon.maxUses == null || !Number.isFinite(Number(coupon.maxUses))
      ? undefined
      : Math.max(0, Math.floor(Number(coupon.maxUses)));
  const minSubtotal =
    coupon.minSubtotal == null || !Number.isFinite(Number(coupon.minSubtotal))
      ? undefined
      : Math.max(0, Number(coupon.minSubtotal));

  return {
    code,
    type,
    value: type === "percent" ? Math.min(100, value) : value,
    active: coupon.active !== false,
    minSubtotal,
    maxUses,
    usedCount,
    expiresAt: coupon.expiresAt?.trim() || undefined,
    note: coupon.note?.trim() || undefined,
    createdAt: coupon.createdAt || new Date().toISOString(),
    updatedAt: coupon.updatedAt || new Date().toISOString(),
  };
}

function readCouponsFile(): CouponsFile {
  initCmsFiles();
  const file = readJson<CouponsFile>(COUPONS_FILE) ?? defaultCouponsFile();
  return {
    ...file,
    coupons: file.coupons.map(normalizeCoupon),
  };
}

export function loadCoupons(): Coupon[] {
  return readCouponsFile().coupons;
}

export function saveCoupons(coupons: Coupon[]): CouponsFile {
  initCmsFiles();
  const file: CouponsFile = {
    coupons: coupons.map(normalizeCoupon),
    updatedAt: new Date().toISOString(),
  };
  writeJson(COUPONS_FILE, file);
  return file;
}

export function getCouponByCode(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return loadCoupons().find((c) => c.code === normalized);
}

export function incrementCouponUsage(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  const coupons = loadCoupons();
  const index = coupons.findIndex((c) => c.code === normalized);
  if (index === -1) return undefined;

  coupons[index] = {
    ...coupons[index],
    usedCount: coupons[index].usedCount + 1,
    updatedAt: new Date().toISOString(),
  };
  saveCoupons(coupons);
  return coupons[index];
}

export function loadDigitalMemorialLanding(): DigitalMemorialLandingContent {
  initCmsFiles();
  const file = readJson<DigitalMemorialLandingFile>(DIGITAL_MEMORIAL_LANDING_FILE);
  const defaults = defaultDigitalMemorialLandingFile().content;
  const raw = (file?.content ?? defaults) as DigitalMemorialLandingContent & {
    example?: unknown;
    sampleLinks?: DigitalMemorialLandingContent["sampleLinks"];
  };

  const sampleLinks =
    raw.sampleLinks?.items?.length
      ? {
          title: raw.sampleLinks.title || defaults.sampleLinks.title,
          subtitle: raw.sampleLinks.subtitle ?? defaults.sampleLinks.subtitle,
          linkLabel: raw.sampleLinks.linkLabel ?? defaults.sampleLinks.linkLabel,
          items: raw.sampleLinks.items.map((item) => ({
            title: item.title?.trim() || "Memorial",
            slug: item.slug?.trim().toLowerCase() || "",
            image: item.image?.trim() || "",
            imageAlt: item.imageAlt?.trim() || item.title?.trim() || "Memorial",
          })),
        }
      : defaults.sampleLinks;

  const { example: _legacyExample, ...rest } = raw;
  return {
    ...defaults,
    ...rest,
    sampleLinks,
  };
}

export function saveDigitalMemorialLanding(
  content: DigitalMemorialLandingContent
): DigitalMemorialLandingFile {
  initCmsFiles();
  const file: DigitalMemorialLandingFile = {
    content,
    updatedAt: new Date().toISOString(),
  };
  writeJson(DIGITAL_MEMORIAL_LANDING_FILE, file);
  return file;
}
