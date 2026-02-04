import { ReactNode } from "react";

// Wir erlauben optional eine extra Klasse (className) für Abstände wie 'mb-4'
interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary"; // Optional: Verschiedene Stile
}

export default function Badge({ children, className = "", variant = "primary" }: BadgeProps) {
  
  // Stil 1: Dein klassisches Orange (bg-primary)
  const primaryStyle = "bg-primary text-white border-transparent";
  
  // Stil 2: Dezent (Weiß mit grauem Rand), hatten wir bei RentBees
  const secondaryStyle = "bg-white border-stone-200 text-stone-500 shadow-sm";

  const style = variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <span 
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm ${style} ${className}`}
    >
      {children}
    </span>
  );
}