"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * NavBar component renders top navigation with pastel-themed buttons to route to different sections.
 */
export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", color: "#FFD1DC" }, // pink
    { href: "/gallery", label: "Gallery", color: "#B0E0E6" }, // powder blue
    { href: "/lookbook", label: "Lookbook", color: "#FFFACD" }, // lemon chiffon
    { href: "/about", label: "About", color: "#E6E6FA" }, // lavender
    { href: "/checkout", label: "Checkout", color: "#D1F7C4" }, // soft mint
    { href: "/spring", label: "Spring Pastels", color: "#FFEBF0" },
    { href: "/summer", label: "Summer Breeze", color: "#E0F7FA" },
    { href: "/cozy", label: "Cozy Neutrals", color: "#F5E6D3" },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="w-full sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-black/5"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
        <span className="font-semibold tracking-wide text-slate-800 mr-4">
          Pastel Outfit Marketplace
        </span>
        <div className="flex flex-wrap gap-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  backgroundColor: active ? l.color : "#ffffff",
                  borderColor: l.color,
                }}
                className="px-3 py-1.5 rounded-full border text-sm transition-colors hover:opacity-90"
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
