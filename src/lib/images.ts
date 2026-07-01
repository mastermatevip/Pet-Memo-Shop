/** 本地上传路径（public/uploads） */
export function isLocalUpload(src: string): boolean {
  return src.startsWith("/uploads/");
}
