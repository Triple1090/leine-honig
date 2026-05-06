"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ShoppingBasket, X } from "lucide-react";

interface ToastData {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 rounded-full px-5 py-3 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300"
            style={{ background: "var(--lh-ink)", color: "var(--lh-cream)", border: "1px solid var(--lh-ink)" }}
          >
            <ShoppingBasket size={16} className="shrink-0" style={{ color: "var(--lh-gold)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600 }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
