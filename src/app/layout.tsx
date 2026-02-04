import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google"; // <--- Hier die neuen Fonts
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. Die edle Überschrift (Serif, weich)
const fontHeading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// 2. Der moderne Fließtext (Sans-Serif, sauber)
const fontBody = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lunsen Honig",
  description: "Bester Honig aus Neustadt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      {/* Hier laden wir die Variablen in CSS */}
      <body className={`${fontHeading.variable} ${fontBody.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}