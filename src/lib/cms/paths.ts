import path from "path";

export const CMS_DIR = path.join(process.cwd(), "data", "cms");
export const HOMEPAGE_FILE = path.join(CMS_DIR, "homepage.json");
export const PRODUCTS_FILE = path.join(CMS_DIR, "products.json");
export const BLOG_FILE = path.join(CMS_DIR, "blog.json");
export const ORDERS_FILE = path.join(CMS_DIR, "orders.json");
export const MEMBERS_FILE = path.join(CMS_DIR, "members.json");
export const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
