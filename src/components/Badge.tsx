import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  variant?: "primary" | "secondary" | "ink" | "seasonal";
}

export default function Badge({
  children,
  icon: Icon,
  className = "",
  variant = "primary",
}: BadgeProps) {
  const variantClass =
    variant === "primary"
      ? "lh-badge lh-badge--gold"
      : variant === "ink"
        ? "lh-badge lh-badge--ink"
        : variant === "seasonal"
          ? "lh-badge lh-badge--seasonal"
          : "lh-badge";

  return (
    <span className={`${variantClass} ${className}`.trim()}>
      {Icon && <Icon size={14} className="flex-shrink-0" />}
      {children}
    </span>
  );
}
