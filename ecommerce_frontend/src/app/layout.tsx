import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Pastel Outfit Marketplace",
  description: "A pastel-themed, image-centric ecommerce for outfits.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SiteHeader />
        <main className="app-container py-6 sm:py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
