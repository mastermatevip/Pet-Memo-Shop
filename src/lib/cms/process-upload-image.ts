import sharp from "sharp";

const MAX_EDGE = 2000;
const WEBP_QUALITY = 82;

export interface ProcessedImage {
  buffer: Buffer;
  ext: string;
  mime: string;
}

/** 商品图上传：自动旋转、限尺寸、转 WebP（GIF 保持原样） */
export async function processProductUpload(
  input: Buffer,
  mime: string
): Promise<ProcessedImage> {
  if (mime === "image/gif") {
    return { buffer: input, ext: ".gif", mime: "image/gif" };
  }

  let pipeline = sharp(input).rotate();
  const meta = await pipeline.metadata();

  if ((meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE) {
    pipeline = pipeline.resize(MAX_EDGE, MAX_EDGE, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  return { buffer, ext: ".webp", mime: "image/webp" };
}
