import Image from "next/image";
import { isSiteStaticImage, normalizeImageSrc } from "@/lib/images";

interface SiteImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

/** Site images: normalizes same-origin URLs and bypasses optimizer for /images/ and /uploads/. */
export function SiteImage({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes,
  priority,
  quality,
}: SiteImageProps) {
  const normalized = normalizeImageSrc(src);

  return (
    <Image
      src={normalized}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={isSiteStaticImage(normalized)}
    />
  );
}
