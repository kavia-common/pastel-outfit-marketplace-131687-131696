"use client";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { APP_COLORS } from "@/lib/config";
import { usePathname } from "next/navigation";

export const Container = ({ children, className = "" }: PropsWithChildren<{ className?: string }>) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Section = ({
  children,
  className = "",
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLElement> & { className?: string }>) => (
  <section className={`py-8 sm:py-12 ${className}`} {...rest}>
    {children}
  </section>
);

export const PastelBadge = ({ children }: PropsWithChildren) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
    style={{ backgroundColor: APP_COLORS.accent, color: "#6b7280" }}
  >
    {children}
  </span>
);

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: PropsWithChildren<{
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}>) => {
  const styles: Record<string, string> = {
    primary:
      "bg-pink-200 hover:bg-pink-300 text-gray-900 shadow-sm border border-pink-300",
    secondary:
      "bg-blue-200 hover:bg-blue-300 text-gray-900 shadow-sm border border-blue-300",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-4 py-2 text-sm transition-colors ${styles[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({
  label,
  ...rest
}: {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="block w-full">
    {label && <span className="mb-1 block text-sm text-gray-700">{label}</span>}
    <input
      {...rest}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
    />
  </label>
);

export const TextArea = ({
  label,
  ...rest
}: {
  label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <label className="block w-full">
    {label && <span className="mb-1 block text-sm text-gray-700">{label}</span>}
    <textarea
      {...rest}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-200"
    />
  </label>
);

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 sticky top-0 z-40 border-b border-pink-100">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full" style={{ background: APP_COLORS.primary }} />
          <span className="text-lg font-semibold text-gray-800">Pastel Outfit</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className={`text-sm ${pathname?.startsWith("/products") ? "text-pink-500" : "text-gray-700"} hover:text-pink-500`}
          >
            Shop
          </Link>
          <Link href="/account" className={`text-sm ${pathname === "/account" ? "text-pink-500" : "text-gray-700"} hover:text-pink-500`}>
            Account
          </Link>
          <Link href="/cart" className={`text-sm ${pathname === "/cart" ? "text-pink-500" : "text-gray-700"} hover:text-pink-500`}>
            Cart
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-pink-100 bg-white">
      <Container className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Pastel Outfit Marketplace. All rights reserved.
      </Container>
    </footer>
  );
};

export const Hero = () => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-pink-100"
      style={{
        background:
          "linear-gradient(120deg, #FFD1DC 0%, #FFFACD 50%, #B0E0E6 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.4),transparent_35%)]" />
      <div className="relative px-8 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
          Embrace Soft Tones
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700">
          Explore our curated collection of pastel outfits — minimal, modern, and irresistibly soft.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/products">
            <Button variant="primary">Shop New Arrivals</Button>
          </Link>
          <a href="#featured">
            <Button variant="secondary">View Featured</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const Carousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);
  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-pink-100">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt="Pastel carousel item"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-pink-500" : "bg-white/70"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  onAdd,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    tags?: string[];
  };
  onAdd?: () => void;
}) => {
  const price = (product.price / 100).toFixed(2);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-pink-100 bg-white">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[4/5] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">${price}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2">
            {product.tags?.slice(0, 2).map((t) => (
              <PastelBadge key={t}>{t}</PastelBadge>
            ))}
          </div>
          <Button variant="primary" onClick={onAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export const FilterSidebar = ({
  q,
  tag,
  onChange,
  tags,
}: {
  q: string;
  tag: string;
  tags: string[];
  onChange: (v: { q: string; tag: string }) => void;
}) => {
  return (
    <div className="sticky top-20 rounded-2xl border border-pink-100 bg-white p-4">
      <h4 className="mb-3 text-sm font-semibold text-gray-800">Filters</h4>
      <Input
        placeholder="Search"
        value={q}
        onChange={(e) => onChange({ q: e.target.value, tag })}
      />
      <div className="mt-4">
        <span className="mb-2 block text-sm text-gray-700">Tag</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={tag === "" ? "primary" : "ghost"}
            onClick={() => onChange({ q, tag: "" })}
          >
            All
          </Button>
          {tags.map((t) => (
            <Button
              key={t}
              variant={tag === t ? "primary" : "ghost"}
              onClick={() => onChange({ q, tag: t })}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-pink-100 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          {title ? <h3 className="text-lg font-semibold text-gray-800">{title}</h3> : <div />}
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const CartDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/20 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-pink-100 px-4">
          <h3 className="text-base font-semibold text-gray-800">Your Cart</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="h-[calc(100%-56px)] overflow-y-auto p-4">{children}</div>
      </aside>
    </div>
  );
};

export const Toast: React.FC<{ text: string; show: boolean }> = ({ text, show }) => {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-gray-800 shadow transition-all ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {text}
    </div>
  );
};
