"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
        image:
          i % 3 === 0
            ? "https://images.unsplash.com/photo-1542326237-94b1c5a538d8?q=80&w=1400&auto=format&fit=crop"
            : i % 3 === 1
            ? "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop",
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
                <a href="#grid" className="btn btn-primary" aria-label="Shop products in the grid">Shop Now</a>
                <a href="#carousel" className="btn btn-accent" aria-label="View lookbook carousel">See Lookbook</a>
              </div>
            </div>
            <div className="round-soft overflow-hidden shadow-soft pastel-border">
              <div className="product-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img-cover"
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
                  alt="Pastel outfits hero"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
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
                <button className="pill" aria-pressed="false" style={{ background: "var(--color-primary)" }}>
                  Pink
                </button>
                <button className="pill" aria-pressed="false" style={{ background: "var(--color-secondary)" }}>
                  Blue
                </button>
                <button className="pill" aria-pressed="false" style={{ background: "var(--color-accent)" }}>
                  Lemon
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button key={s} className="pill" aria-pressed="false">{s}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Price</p>
              <div className="flex gap-2">
                <button className="pill" aria-pressed="false">Under $60</button>
                <button className="pill" aria-pressed="false">$60 - $80</button>
                <button className="pill" aria-pressed="false">Over $80</button>
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
                  <Link href={`/product/${p.id}`} className="product-image-wrap" aria-label={`View ${p.title}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="img-cover" />
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
                        aria-label={`Add ${p.title} to cart`}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop"
                  alt=""
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
