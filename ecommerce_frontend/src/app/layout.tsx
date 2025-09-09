import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pastel Market • Minimal Pastel Outfits",
  description:
    "A modern, image-centric ecommerce UI in soft pastel tones for browsing and purchasing outfits.",
  applicationName: "Pastel Market",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 8%, white) 0%, white 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
