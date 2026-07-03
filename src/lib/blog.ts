import type { BlogPost } from "@/types";

export function isBlogPostPublished(post: BlogPost): boolean {
  return post.status !== "draft";
}
