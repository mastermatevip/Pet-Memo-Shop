import { Link } from "@/i18n/navigation";
import { BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "full" | "icon";
  className?: string;
  href?: string | false;
  priority?: boolean;
};

function PawMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("shrink-0 fill-current", className)}
    >
      <ellipse cx="7.2" cy="7.2" rx="2" ry="2.5" />
      <ellipse cx="12" cy="5.2" rx="2" ry="2.5" />
      <ellipse cx="16.8" cy="7.2" rx="2" ry="2.5" />
      <ellipse cx="9.2" cy="11.2" rx="1.6" ry="2" />
      <ellipse cx="14.8" cy="11.2" rx="1.6" ry="2" />
      <path d="M12 21.5c-3.2 0-5.6-1.9-5.6-4.6 0-1.9 1.2-3.2 2.8-4 .6 1.2 1.5 2 2.8 2s2.2-.8 2.8-2c1.6.8 2.8 2.1 2.8 4 0 2.7-2.4 4.6-5.6 4.6z" />
    </svg>
  );
}

export function BrandLogo({
  variant = "full",
  className,
  href = "/",
  priority = false,
}: BrandLogoProps) {
  const isFull = variant === "full";
  const px = isFull ? 64 : 40;

  // Official mark: dog + cat circle (no baked-in wordmark).
  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND.logoIcon}
      alt=""
      width={px}
      height={px}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn(
        isFull ? "h-14 w-14 md:h-16 md:w-16" : "h-10 w-10",
        "object-contain shrink-0",
        !isFull && className
      )}
    />
  );

  const content = isFull ? (
    <span
      className={cn(
        "inline-flex items-center gap-3 md:gap-3.5 min-w-0",
        className
      )}
    >
      {mark}
      <span className="flex flex-col items-center justify-center min-w-0 text-center leading-none">
        <span className="font-serif text-[1.15rem] sm:text-[1.35rem] md:text-[1.55rem] font-semibold tracking-[0.04em] text-text whitespace-nowrap">
          {BRAND.name}
        </span>
        <span
          className="mt-1.5 md:mt-2 flex w-full max-w-[13.5rem] md:max-w-[16rem] items-center gap-2 text-text/55"
          aria-hidden
        >
          <span className="h-px flex-1 bg-current" />
          <PawMark className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="h-px flex-1 bg-current" />
        </span>
        <span className="mt-1.5 md:mt-2 text-[0.58rem] sm:text-[0.62rem] md:text-[0.68rem] uppercase tracking-[0.22em] md:tracking-[0.28em] text-muted whitespace-nowrap">
          {BRAND.logoTagline}
        </span>
        <span className="mt-1 hidden sm:block font-serif text-[0.62rem] md:text-[0.72rem] italic tracking-[0.02em] text-light whitespace-nowrap">
          {BRAND.logoSlogan}
        </span>
      </span>
    </span>
  ) : (
    mark
  );

  if (href === false) return content;

  return (
    <Link
      href={href}
      className="flex-shrink-0 inline-flex items-center"
      aria-label={BRAND.name}
    >
      {content}
    </Link>
  );
}
