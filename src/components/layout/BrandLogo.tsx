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
      <ellipse cx="7" cy="7.5" rx="2.1" ry="2.6" />
      <ellipse cx="12" cy="5.5" rx="2.1" ry="2.6" />
      <ellipse cx="17" cy="7.5" rx="2.1" ry="2.6" />
      <ellipse cx="9" cy="11.5" rx="1.7" ry="2.1" />
      <ellipse cx="15" cy="11.5" rx="1.7" ry="2.1" />
      <path d="M12 22c-3.4 0-6-2.1-6-5.1 0-2.2 1.4-3.7 3.2-4.6.7 1.4 1.7 2.3 2.8 2.3s2.1-.9 2.8-2.3c1.8.9 3.2 2.4 3.2 4.6 0 3-2.6 5.1-6 5.1z" />
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
  const px = isFull ? 56 : 40;

  // Official mark: circular dog+cat icon only (no baked-in wordmark).
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
        isFull ? "h-12 w-12 md:h-14 md:w-14" : "h-10 w-10",
        "object-contain shrink-0",
        !isFull && className
      )}
    />
  );

  const content = isFull ? (
    <span className={cn("inline-flex items-center gap-2.5 md:gap-3 min-w-0", className)}>
      {mark}
      <span className="flex flex-col justify-center min-w-0 leading-none py-0.5">
        <span className="font-serif text-[1.05rem] sm:text-[1.2rem] md:text-[1.4rem] font-semibold tracking-wide text-text whitespace-nowrap">
          {BRAND.name}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-gold" aria-hidden>
          <span className="h-px w-5 md:w-7 bg-current opacity-70" />
          <PawMark className="w-2.5 h-2.5 md:w-3 md:h-3 text-text/75" />
          <span className="h-px w-5 md:w-7 bg-current opacity-70" />
        </span>
        <span className="mt-1 text-[0.52rem] sm:text-[0.58rem] md:text-[0.65rem] uppercase tracking-[0.16em] md:tracking-[0.2em] text-muted whitespace-nowrap">
          {BRAND.logoTagline}
        </span>
        <span className="mt-1 hidden md:block text-[0.6rem] md:text-[0.68rem] italic tracking-wide text-light whitespace-nowrap">
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
      className="flex-shrink-0 inline-flex items-center max-w-[min(100%,280px)] md:max-w-none"
      aria-label={BRAND.name}
    >
      {content}
    </Link>
  );
}
