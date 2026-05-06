import type { Metadata } from "next";
import { Inter_Tight, Spectral, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CartDrawer from "@/src/components/CartDrawer";
import CookieBanner from "@/src/components/CookieBanner";
import { CartProvider } from "@/src/lib/cart";
import { ToastProvider } from "@/src/components/Toast";

const fontBody = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontHeading = Spectral({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://www.leine-honig.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Leine-Honig – Regionaler Honig aus der Region Hannover",
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
    title: "Leine-Honig – Regionaler Honig aus der Region Hannover",
    description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge. Regional, handgefüllt, ohne Zusätze.",
    images: [{ url: "/images/juergen/bienenstand.jpeg", width: 1200, height: 630, alt: "Leine-Honig Bienenstand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leine-Honig – Regionaler Honig aus der Region Hannover",
    description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge.",
    images: ["/images/juergen/bienenstand.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${fontBody.variable} ${fontHeading.variable} ${fontMono.variable} font-sans antialiased`}>
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="pt-28">{children}</main>
            <Footer />
            <CookieBanner />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
