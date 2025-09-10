import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * Site metadata for the ecommerce frontend.
 */
export const metadata: Metadata = {
  title: "Pastel Market • Minimal Pastel Outfits",
  description:
    "A modern, image-centric ecommerce UI in soft pastel tones for browsing and purchasing outfits.",
  applicationName: "Pastel Market",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * PUBLIC_INTERFACE
 * RootLayout wraps all pages, providing a consistent pastel-styled header and footer.
 */
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
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

/**
 * PUBLIC_INTERFACE
 * Header renders the navigation bar with brand and key links.
 */
function Header() {
  return (
    <header className="header-blur sticky top-0 z-40">
      <div className="container-px max-w-wrap py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div aria-hidden className="w-8 h-8 rounded-full" style={{ background: "var(--color-primary)" }} />
          <span className="font-semibold tracking-tight">Pastel Market</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link className="pill hover:opacity-80" href="/#new">New</Link>
          <Link className="pill hover:opacity-80" href="/#tops">Tops</Link>
          <Link className="pill hover:opacity-80" href="/#bottoms">Bottoms</Link>
          <Link className="pill hover:opacity-80" href="/#accessories">Accessories</Link>
          <Link className="pill hover:opacity-80" href="/spring">Spring</Link>
          <Link className="pill hover:opacity-80" href="/summer">Summer</Link>
          <Link className="pill hover:opacity-80" href="/cozy">Cozy</Link>
          <Link className="pill hover:opacity-80" href="/gallery">Gallery</Link>
          <Link className="pill hover:opacity-80" href="/lookbook">Lookbook</Link>
          <Link className="pill hover:opacity-80" href="/about">About</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link className="btn btn-ghost" href="/#cart">Cart</Link>
          <Link className="btn btn-secondary" href="/checkout">Checkout</Link>
        </div>
      </div>
    </header>
  );
}

/**
 * PUBLIC_INTERFACE
 * SiteFooter renders a simple pastel-styled footer.
 */
function SiteFooter() {
  return (
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
  );
}
