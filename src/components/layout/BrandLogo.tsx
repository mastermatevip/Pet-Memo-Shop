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

  // Serve brand assets directly — skip next/image optimizer.
  const image = isFull ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logoFull}
      alt={BRAND.logoAlt}
      width={220}
      height={116}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn(
        "h-11 md:h-14 w-auto max-w-[180px] md:max-w-[220px] object-contain object-left",
        className
      )}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logoIcon}
      alt={BRAND.logoAlt}
      width={40}
      height={40}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("h-10 w-10 object-contain", className)}
    />
  );

  if (href === false) return image;

  return (
    <Link
      href={href}
      className="flex-shrink-0 inline-flex items-center"
      aria-label={BRAND.name}
    >
      {image}
    </Link>
  );
}
