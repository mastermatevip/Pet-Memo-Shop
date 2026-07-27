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

  const image = isFull ? (
    <>
      {/* Compact mark on small screens so header nav/actions stay visible */}
      <Image
        src={BRAND.logoIcon}
        alt={BRAND.logoAlt}
        width={40}
        height={40}
        priority={priority}
        className={cn("h-10 w-10 object-contain lg:hidden", className)}
      />
      <Image
        src={BRAND.logoFull}
        alt={BRAND.logoAlt}
        width={200}
        height={50}
        priority={priority}
        className={cn(
          "hidden lg:block h-auto w-auto max-h-12 max-w-[200px] object-contain object-left",
          className
        )}
      />
    </>
  ) : (
    <Image
      src={BRAND.logoIcon}
      alt={BRAND.logoAlt}
      width={48}
      height={48}
      priority={priority}
      className={cn("max-h-10 w-10 object-contain", className)}
    />
  );

  if (href === false) return image;

  return (
    <Link href={href} className="flex-shrink-0 inline-flex items-center">
      {image}
    </Link>
  );
}
