import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "accent" | "outline";
  className?: string;
}

const variants = {
  default: "bg-highlight text-text",
  gold: "bg-gold-light text-gold-dark",
  accent: "bg-bg-secondary text-text",
  outline: "border border-border text-muted bg-transparent",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
