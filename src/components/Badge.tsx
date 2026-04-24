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
    primary: "border-transparent",
    secondary: "border-transparent",
  };

  const inlineStyles = {
    primary: { background: "var(--color-primary)", color: "var(--color-bg)" },
    secondary: { background: "var(--color-primary-light)", color: "var(--color-primary)", borderColor: "var(--color-primary)" },
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm ${styles[variant]} ${className}`}
      style={inlineStyles[variant]}
    >
      {Icon && <Icon size={16} className="flex-shrink-0" />}
      {children}
    </span>
  );
}
