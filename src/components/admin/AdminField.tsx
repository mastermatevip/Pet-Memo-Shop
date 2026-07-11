import { cn } from "@/lib/utils";

interface AdminFieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
  /** Use div wrapper when field contains buttons/previews instead of a single input. */
  unlabeled?: boolean;
}

export function AdminField({ label, children, hint, className, unlabeled }: AdminFieldProps) {
  if (unlabeled) {
    return (
      <div className={cn("block", className)}>
        <span className="block text-sm font-medium text-text mb-1.5">{label}</span>
        {children}
        {hint ? <span className="block text-xs text-light mt-1">{hint}</span> : null}
      </div>
    );
  }

  return (
    <label className={cn("block", className)}>
      <span className="block text-sm font-medium text-text mb-1.5">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-light mt-1">{hint}</span> : null}
    </label>
  );
}

export const adminInputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-gold";

export const adminTextareaClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text min-h-[96px] focus:outline-none focus:ring-2 focus:ring-gold";
