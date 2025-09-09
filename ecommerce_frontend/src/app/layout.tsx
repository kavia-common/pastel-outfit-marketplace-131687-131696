import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Pastel Outfit Marketplace",
  description: "Browse and shop a variety of pastel outfits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <NavBar />
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
}
