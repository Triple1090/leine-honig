import { ReactNode } from "react";
import { LucideIcon } from "lucide-react"; // Import für den Typen

interface BadgeProps {
  children: ReactNode;
  icon?: LucideIcon; // Das optionale Icon als Komponente
  className?: string;
  variant?: "primary" | "secondary";
}

export default function Badge({ 
  children, 
  icon: Icon, // Wir benennen es groß "Icon", damit wir es als Komponente nutzen können
  className = "", 
  variant = "primary" 
}: BadgeProps) {
  
  const primaryStyle = "bg-primary text-white border-transparent";
  const secondaryStyle = "bg-white border-stone-200 text-stone-500 shadow-sm";

  const style = variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <span 
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm ${style} ${className}`}
    >
      {/* Wenn ein Icon übergeben wurde, wird es hier mit Größe 16 angezeigt */}
      {Icon && <Icon size={16} className="flex-shrink-0" />}
      
      {children}
    </span>
  );
}