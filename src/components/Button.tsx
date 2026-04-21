import Link from "next/link";
import { ReactNode, ElementType } from "react";

const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  icon?: ElementType;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  type = "button",
  className = "",
  icon: Icon,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-primary hover:bg-primary-dark text-accent shadow-lg hover:shadow-primary/30",
    secondary:
      "bg-white border-2 border-stone-200 text-accent hover:bg-stone-50 hover:border-primary/30 shadow-sm",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  const handleAnchorClick = (e: React.MouseEvent) => {
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const startPosition = window.pageYOffset;
      const targetPosition =
        target.getBoundingClientRect().top + startPosition - 100;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;
      const animationStep = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeOutBack(progress));
        if (elapsed < duration) window.requestAnimationFrame(animationStep);
        else window.history.pushState(null, "", href);
      };
      window.requestAnimationFrame(animationStep);
    }
  };

  const buttonContent = (
    <>
      {Icon && <Icon size={20} className="transition-transform group-hover:-translate-x-1" />}
      {children}
    </>
  );

  if (href) {
    if (href.startsWith("#")) {
      return <a href={href} className={combinedClasses} onClick={handleAnchorClick}>{buttonContent}</a>;
    }
    return <Link href={href} className={combinedClasses}>{buttonContent}</Link>;
  }

  return <button type={type} className={combinedClasses} disabled={disabled}>{buttonContent}</button>;
}
