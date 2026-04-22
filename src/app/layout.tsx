import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CartDrawer from "@/src/components/CartDrawer";
import CookieBanner from "@/src/components/CookieBanner";
import { CartProvider } from "@/src/lib/cart";
import { ToastProvider } from "@/src/components/Toast";

const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://www.leine-honig.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Leine-Honig – Ehrlicher Honig aus der Region Hannover",
    template: "%s | Leine-Honig",
  },
  description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge. Blüten-, Wald- und Rapshonig – regional, handgefüllt und ohne Zusätze.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Leine-Honig",
    title: "Leine-Honig – Ehrlicher Honig aus der Region Hannover",
    description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge. Regional, handgefüllt, ohne Zusätze.",
    images: [{ url: "/images/juergen/bienenstand.jpeg", width: 1200, height: 630, alt: "Leine-Honig Bienenstand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leine-Honig – Ehrlicher Honig aus der Region Hannover",
    description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge.",
    images: ["/images/juergen/bienenstand.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${fontBody.variable} font-sans antialiased`}>
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="pt-20">{children}</main>
            <Footer />
            <CookieBanner />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
