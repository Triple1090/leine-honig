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
}

export default function Button({
  children,
  href,
  type = "button",
  className = "",
  icon: Icon,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all active:scale-95";
  const variants = {
    primary:
      "bg-primary hover:bg-primary-dark text-stone-900 shadow-lg hover:shadow-primary/40",
    secondary:
      "bg-white border-2 border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300 shadow-sm",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  // Die Bounce-Logik
  const handleAnchorClick = (e: React.MouseEvent) => {
    // Falls kein href da ist oder es kein Anker ist, tun wir nichts
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const startPosition = window.pageYOffset;
      const targetPosition =
        target.getBoundingClientRect().top + startPosition - 100; // Puffer für Navbar
      const distance = targetPosition - startPosition;
      const duration = 800;
      let start: number | null = null;

      const animationStep = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeOutBack(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (elapsed < duration) {
          window.requestAnimationFrame(animationStep);
        } else {
          window.history.pushState(null, "", href);
        }
      };
      window.requestAnimationFrame(animationStep);
    }
  };

  const buttonContent = (
    <>
      {Icon && (
        <Icon
          size={20}
          className="transition-transform group-hover:-translate-x-1"
        />
      )}
      {children}
    </>
  );

  // LOGIK-CHECK: Welches HTML-Element nutzen wir?
  if (href) {
    const isAnchor = href.startsWith("#");

    if (isAnchor) {
      // Für interne Anker nutzen wir das Standard-<a> Tag
      return (
        <a href={href} className={combinedClasses} onClick={handleAnchorClick}>
          {buttonContent}
        </a>
      );
    }

    // Für echte Seiten-Wechsel nutzen wir weiterhin <Link>
    return (
      <Link href={href} className={combinedClasses}>
        {buttonContent}
      </Link>
    );
  }

  // Für Formular-Buttons (submit)
  return (
    <button type={type} className={combinedClasses}>
      {buttonContent}
    </button>
  );
}
