import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CartDrawer from "@/src/components/CartDrawer";
import { CartProvider } from "@/src/lib/cart";

const fontHeading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leine-Honig – Ehrlicher Honig & Bienenvermietung",
  description: "Echter Honig direkt vom Imker aus Neustadt am Rübenberge. Jetzt online bestellen oder Bienenvolk mieten.",
  icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍯</text></svg>`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${fontHeading.variable} ${fontBody.variable} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
