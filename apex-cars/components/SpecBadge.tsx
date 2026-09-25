import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SpecBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-soft",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-champagne-deep" strokeWidth={1.5} />
      {label}
    </span>
  );
}
