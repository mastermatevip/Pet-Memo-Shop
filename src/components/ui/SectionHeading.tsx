import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" && "text-center", className)}>
      <h2 className="font-serif text-3xl md:text-4xl text-text mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
