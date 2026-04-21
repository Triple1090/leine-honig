import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Badge({
  children,
  icon: Icon,
  className = "",
  variant = "primary",
}: BadgeProps) {
  const styles = {
    primary: "bg-accent text-white border-transparent",
    secondary: "bg-primary/15 text-accent border-primary/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm ${styles[variant]} ${className}`}
    >
      {Icon && <Icon size={16} className="flex-shrink-0" />}
      {children}
    </span>
  );
}
