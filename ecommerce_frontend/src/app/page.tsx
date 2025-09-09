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
      Array.from({ length: 12 }).map((_, i) => {
        // Generate a unique, stable Unsplash image per product using a query seed
        const seed = i + 1;
        const image = `https://images.unsplash.com/photo-15${(24 + i) % 99}${(36 + i) % 99}7${(41 + i) % 99}-6${(74 + i) % 99}${(5 + i) % 9}cdb1723f?q=80&w=1400&auto=format&fit=crop&ixid=seed-${seed}`;
        // Fallback to Picsum (guaranteed unique) if the above ever fails to resolve
        const altImage = `https://picsum.photos/seed/pastel-${seed}/1400/1750`;

        return {
          id: String(i + 1),
          title: `Pastel Outfit #${i + 1}`,
          price: 59 + ((i * 3) % 17),
          image,
          tag: i % 4 === 0 ? "New" : i % 4 === 1 ? "Bestseller" : "Trending",
          altImage,
        };
      }),
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
          <Link href="/" className="flex items-center gap-2 clickable hover-elevate focus-ring">
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
            <a className="pill clickable hover-elevate" href="#new">New</a>
            <a className="pill clickable hover-elevate" href="#tops">Tops</a>
            <a className="pill clickable hover-elevate" href="#bottoms">Bottoms</a>
            <a className="pill clickable hover-elevate" href="#accessories">Accessories</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost hover-elevate focus-ring" onClick={() => setShowCart(true)}>
              Cart
            </button>
            <Link className="btn btn-secondary hover-elevate focus-ring" href="/checkout">
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
                <a href="#grid" className="btn btn-primary hover-elevate focus-ring clickable">Shop Now</a>
                <a href="#carousel" className="btn btn-accent hover-elevate focus-ring clickable">See Lookbook</a>
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
                  className={`w-8 h-2 rounded-full transition clickable hover-elevate focus-ring ${
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
          <aside className="lg:col-span-3 sidebar hover-elevate">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                <button className="pill clickable hover-elevate focus-ring" style={{ background: "var(--color-primary)" }}>
                  Pink
                </button>
                <button className="pill clickable hover-elevate focus-ring" style={{ background: "var(--color-secondary)" }}>
                  Blue
                </button>
                <button className="pill clickable hover-elevate focus-ring" style={{ background: "var(--color-accent)" }}>
                  Lemon
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button key={s} className="pill clickable hover-elevate focus-ring">{s}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Price</p>
              <div className="flex gap-2">
                <button className="pill clickable hover-elevate focus-ring">Under $60</button>
                <button className="pill clickable hover-elevate focus-ring">$60 - $80</button>
                <button className="pill clickable hover-elevate focus-ring">Over $80</button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            <div className="grid-products">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="product-card col-span-6 md:col-span-4 hover-elevate"
                >
                  <Link href={`/product/${p.id}`} className="product-image-wrap clickable focus-ring" title={p.title}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="img-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.dataset.fallbackApplied !== "1") {
                          target.src = p.altImage;
                          target.dataset.fallbackApplied = "1";
                        }
                      }}
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
                        className="btn btn-accent hover-elevate focus-ring"
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
                <button className="btn btn-ghost hover-elevate focus-ring" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
                <Link className="btn btn-secondary hover-elevate focus-ring" href="/checkout">
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
