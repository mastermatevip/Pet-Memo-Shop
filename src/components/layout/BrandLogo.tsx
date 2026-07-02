import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "full" | "icon";
  className?: string;
  href?: string | false;
  priority?: boolean;
};

export function BrandLogo({
  variant = "full",
  className,
  href = "/",
  priority = false,
}: BrandLogoProps) {
  const isFull = variant === "full";

  const image = (
    <Image
      src={isFull ? BRAND.logoFull : BRAND.logoIcon}
      alt={BRAND.logoAlt}
      width={isFull ? 220 : 48}
      height={isFull ? 56 : 48}
      priority={priority}
      className={cn(
        "h-auto w-auto object-contain",
        isFull ? "max-h-12 md:max-h-14" : "max-h-10 w-10",
        className
      )}
    />
  );

  if (href === false) return image;

  return (
    <Link href={href} className="flex-shrink-0 inline-flex items-center">
      {image}
    </Link>
  );
}
