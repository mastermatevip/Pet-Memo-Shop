import Image from "next/image";
import { isLocalUpload } from "@/lib/images";

interface ProductImageDisplayProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Local uploads and remote URLs both go through next/image for responsive sizing. */
export function ProductImageDisplay({
  src,
  alt,
  fill = true,
  className = "object-cover",
  sizes,
  priority,
}: ProductImageDisplayProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes ?? (isLocalUpload(src) ? "(max-width: 768px) 50vw, 25vw" : undefined)}
      priority={priority}
    />
  );
}
