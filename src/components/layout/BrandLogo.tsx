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
  // Icon mark only — no wordmark / tagline (avoids cropped text under the circle).
  const sizeClass =
    variant === "full" ? "h-12 w-12 md:h-14 md:w-14" : "h-10 w-10";
  const px = variant === "full" ? 56 : 40;

  // Serve brand assets directly — skip next/image optimizer.
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logoIcon}
      alt={BRAND.logoAlt}
      width={px}
      height={px}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn(sizeClass, "object-contain", className)}
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
