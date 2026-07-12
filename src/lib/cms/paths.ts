import path from "path";

/** Allow Coolify to pin CMS to a mounted absolute path if needed. */
const dataRoot = process.env.CMS_DATA_DIR?.trim() || path.join(process.cwd(), "data");
const uploadsRoot =
  process.env.UPLOADS_DIR?.trim() || path.join(process.cwd(), "public", "uploads");

export const CMS_DIR = path.join(dataRoot, "cms");
/** Bundled seed JSON copied into the Docker image (see Dockerfile). */
export const CMS_SEED_DIR = path.join(process.cwd(), "data", "cms-seed");
export const HOMEPAGE_FILE = path.join(CMS_DIR, "homepage.json");
export const PRODUCTS_FILE = path.join(CMS_DIR, "products.json");
export const BLOG_FILE = path.join(CMS_DIR, "blog.json");
export const ORDERS_FILE = path.join(CMS_DIR, "orders.json");
export const MEMBERS_FILE = path.join(CMS_DIR, "members.json");
export const MEMORIALS_FILE = path.join(CMS_DIR, "memorials.json");
export const COUPONS_FILE = path.join(CMS_DIR, "coupons.json");
export const UPLOADS_DIR = uploadsRoot;
export const HOMEPAGE_UPLOADS_DIR = path.join(UPLOADS_DIR, "homepage");
export const MEMORIALS_UPLOADS_DIR = path.join(UPLOADS_DIR, "memorials");
/**
 * Durable CMS mirror on the uploads volume.
 * Survives empty/recreated /app/data/cms mounts (common Coolify redeploy issue).
 */
export const CMS_BACKUP_DIR = path.join(UPLOADS_DIR, ".cms-backup");
export const HOMEPAGE_BACKUP_FILE = path.join(CMS_BACKUP_DIR, "homepage.json");
