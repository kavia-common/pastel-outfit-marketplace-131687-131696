"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductImage from "./components/ProductImage";
import { DEFAULT_PRODUCT_IMAGES } from "./constants/images";

/**
 * PUBLIC_INTERFACE
 * Home renders the storefront landing page: hero, carousel, filters, and product grid.
 * This is a static UI scaffold with mock data, designed to be wired to real APIs later.
 */
export default function Home() {
  // Mock products (image centric)
  const products = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: String(i + 1),
        title: `Pastel Outfit #${i + 1}`,
        price: 59 + ((i * 3) % 17),
        image: DEFAULT_PRODUCT_IMAGES[i % DEFAULT_PRODUCT_IMAGES.length],
        tag: i % 4 === 0 ? "New" : i % 4 === 1 ? "Bestseller" : "Trending",
      })),
    []
  );

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      headline: "Soft Pastels. Bold You.",
      sub: "Discover outfits in dreamy hues for every season.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    },
    {
      headline: "Minimal Looks, Maximum Comfort",
      sub: "Curated essentials that pair with everything.",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop",
    },
    {
      headline: "Spring Edit: Light Layers",
      sub: "Breathable fabrics in tender tones.",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      {/* Header */}
      <header className="header-blur sticky top-0 z-40">
        <div className="container-px max-w-wrap py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              aria-hidden
              className="w-8 h-8 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            <span className="font-semibold tracking-tight">
              Pastel Market
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <a className="pill hover:opacity-80" href="#new">New</a>
            <a className="pill hover:opacity-80" href="#tops">Tops</a>
            <a className="pill hover:opacity-80" href="#bottoms">Bottoms</a>
            <a className="pill hover:opacity-80" href="#accessories">Accessories</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost" onClick={() => setShowCart(true)}>
              Cart
            </button>
            <Link className="btn btn-secondary" href="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container-px max-w-wrap py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="badge mb-3">New Collection</span>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                Dress in Pastels, Feel the Calm
              </h1>
              <p className="text-slate-600 mb-6">
                Explore our curated selection of pastel outfits crafted with
                breathable fabrics and timeless silhouettes.
              </p>
              <div className="flex gap-2">
                <a href="#grid" className="btn btn-primary">Shop Now</a>
                <a href="#carousel" className="btn btn-accent">See Lookbook</a>
              </div>
            </div>
            <div className="round-soft overflow-hidden shadow-soft pastel-border">
              <div className="product-image-wrap">
                <ProductImage
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
                  alt="Pastel outfits hero"
                  className="img-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section id="carousel" className="container-px max-w-wrap py-8 md:py-12">
        <div className="card p-3 md:p-4">
          <div className="relative round-soft overflow-hidden">
            <div className="product-image-wrap">
              <ProductImage
                src={slides[activeSlide].image}
                alt={slides[activeSlide].headline}
                className="img-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 text-white drop-shadow">
              <h3 className="text-xl md:text-3xl font-semibold">
                {slides[activeSlide].headline}
              </h3>
              <p className="opacity-95">{slides[activeSlide].sub}</p>
            </div>

            <div className="absolute right-3 bottom-3 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  className={`w-8 h-2 rounded-full transition ${
                    i === activeSlide
                      ? "bg-[var(--color-secondary)]"
                      : "bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content: Sidebar + Grid */}
      <section id="grid" className="container-px max-w-wrap py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-3 sidebar">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                <button className="pill" style={{ background: "var(--color-primary)" }}>
                  Pink
                </button>
                <button className="pill" style={{ background: "var(--color-secondary)" }}>
                  Blue
                </button>
                <button className="pill" style={{ background: "var(--color-accent)" }}>
                  Lemon
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button key={s} className="pill">{s}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Price</p>
              <div className="flex gap-2">
                <button className="pill">Under $60</button>
                <button className="pill">$60 - $80</button>
                <button className="pill">Over $80</button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            <div className="grid-products">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="product-card col-span-6 md:col-span-4"
                >
                  <Link href={`/product/${p.id}`} className="product-image-wrap">
                    <ProductImage
                      src={p.image}
                      alt={p.title}
                      className="img-cover"
                    />
                  </Link>
                  <div className="product-info">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{p.title}</h4>
                      <span className="badge">{p.tag}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="price">${p.price}</span>
                      <button
                        className="btn btn-accent"
                        onClick={() => setShowCart(true)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
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

      {/* Cart Modal */}
      {showCart && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          onClick={() => setShowCart(false)}
        >
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button className="btn btn-ghost" onClick={() => setShowCart(false)}>
                Close
              </button>
            </div>
            <div className="grid grid-cols-12 gap-3 items-center mb-4">
              <div className="col-span-3 rounded-md overflow-hidden bg-[var(--color-soft)] aspect-square">
                <ProductImage
                  src={DEFAULT_PRODUCT_IMAGES[1]}
                  alt="Cart item"
                  className="img-cover"
                />
              </div>
              <div className="col-span-6">
                <p className="font-medium">Pastel Outfit #1</p>
                <p className="text-sm text-slate-600">Size: M</p>
              </div>
              <div className="col-span-3 text-right">
                <p className="font-semibold">$72</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg">
                Subtotal: <span className="font-semibold">$72</span>
              </p>
              <div className="flex gap-2">
                <button className="btn btn-ghost" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
                <Link className="btn btn-secondary" href="/checkout">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
