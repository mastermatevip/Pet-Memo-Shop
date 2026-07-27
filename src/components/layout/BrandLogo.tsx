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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Serve brand assets directly — skip next/image optimizer (JPEG wash / blank paint). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BRAND.logoIcon}
        alt={isFull ? "" : BRAND.logoAlt}
        width={40}
        height={40}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="h-10 w-10 object-contain shrink-0"
      />
      {isFull ? (
        <span className="font-serif text-lg md:text-xl text-text leading-none tracking-tight whitespace-nowrap">
          {BRAND.name}
        </span>
      ) : null}
    </span>
  );

  if (href === false) {
    return isFull ? image : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={BRAND.logoIcon}
        alt={BRAND.logoAlt}
        width={40}
        height={40}
        decoding="async"
        className={cn("h-10 w-10 object-contain", className)}
      />
    );
  }

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
