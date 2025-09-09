import type { Metadata } from "next";
import Link from "next/link";
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
        {/* Skip link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-white focus:shadow-soft"
        >
          Skip to content
        </a>

        {/* Global Header */}
        <header className="header-blur sticky top-0 z-40">
          <div className="container-px max-w-wrap py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span
                aria-hidden
                className="w-8 h-8 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
              <span className="font-semibold tracking-tight">Pastel Market</span>
            </Link>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
              <Link className="pill hover:opacity-80" href="/#new">New</Link>
              <Link className="pill hover:opacity-80" href="/#tops">Tops</Link>
              <Link className="pill hover:opacity-80" href="/#bottoms">Bottoms</Link>
              <Link className="pill hover:opacity-80" href="/#accessories">Accessories</Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link className="btn btn-ghost" href="/#grid" aria-label="View products">
                Browse
              </Link>
              <Link className="btn btn-secondary" href="/checkout">
                Checkout
              </Link>
            </div>
          </div>
        </header>

        <div id="main">{children}</div>

        {/* Global Footer */}
        <footer className="footer mt-10">
          <div className="container-px max-w-wrap">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-semibold mb-2">Pastel Market</p>
                <p className="text-sm text-slate-600">
                  Minimal, image-first fashion in soothing tones.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2">Help</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li><a className="hover:underline" href="#">Shipping</a></li>
                  <li><a className="hover:underline" href="#">Returns</a></li>
                  <li><a className="hover:underline" href="#">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Follow</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li><a className="hover:underline" href="#">Instagram</a></li>
                  <li><a className="hover:underline" href="#">Pinterest</a></li>
                  <li><a className="hover:underline" href="#">TikTok</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
