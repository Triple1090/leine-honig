import Link from "next/link";
import { ReactNode, ElementType } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  icon?: ElementType;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  type = "button",
  className = "",
  icon: Icon,
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) {
  const variantClass = `lh-btn lh-btn--${variant}`;
  const sizeClass = size === "sm" ? "lh-btn--sm" : size === "lg" ? "lh-btn--lg" : "";
  const combinedClasses = `${variantClass} ${sizeClass} ${className}`.trim();

  const handleAnchorClick = (e: React.MouseEvent) => {
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  const buttonContent = (
    <>
      {Icon && <Icon size={16} />}
      {children}
    </>
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={combinedClasses} onClick={handleAnchorClick}>
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} disabled={disabled}>
      {buttonContent}
    </button>
  );
}
