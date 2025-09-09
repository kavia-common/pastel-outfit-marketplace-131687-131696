"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * ClientProductDetail renders a large image-centric product page with gallery thumbnails
 * and add-to-cart interaction shown via a modal sheet (client state).
 */
export default function ClientProductDetail({ id }: { id: string }) {
  const router = useRouter();

  // Mock product, in real app fetch by id from backend
  const product = useMemo(() => {
    const idx = Number(id ?? 1);
    const base = {
      id: String(id ?? "1"),
      title: `Pastel Outfit #${idx}`,
      description:
        "Elevate your look with soft tones and comfy textures. Perfect for brunch, strolls, and spring days.",
      price: 69 + (idx % 9),
      images: [
        `https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1542326237-94b1c5a538d8?q=80&w=1400&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop`,
      ],
      color: "Blush Pink",
      sizeOptions: ["XS", "S", "M", "L", "XL"],
    };
    return base;
  }, [id]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);

  const addToCart = () => {
    setShowCart(true);
  };

  return (
    <main className="container-px max-w-wrap py-6 md:py-10">
      <nav className="mb-4 text-sm">
        <Link href="/" className="text-slate-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-slate-700">Product</span>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gallery */}
        <div className="lg:col-span-7 card p-2 md:p-4">
          <div className="round-soft overflow-hidden">
            <div className="product-image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeIndex]}
                alt={product.title}
                className="img-cover"
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 md:grid-cols-6 gap-2">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`overflow-hidden rounded-md border ${
                  i === activeIndex
                    ? "border-[var(--color-secondary)]"
                    : "border-slate-200"
                } aspect-square bg-[var(--color-soft)]`}
                aria-label={`Show image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="img-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 card p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge">In stock</span>
            <span className="pill">Color: {product.color}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {product.title}
          </h1>
          <p className="text-slate-600 leading-relaxed mb-4">
            {product.description}
          </p>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">Select size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`pill ${
                    selectedSize === s ? "pill-active" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-slate-500 text-sm">Price</p>
              <p className="text-2xl font-semibold">${product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-ghost" onClick={() => router.back()}>
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={addToCart}
                disabled={!selectedSize}
                aria-disabled={!selectedSize}
              >
                Add to cart
              </button>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600">
            <li>• Free shipping over $50</li>
            <li>• Easy 30-day returns</li>
            <li>• Sustainable materials</li>
            <li>• Trusted by 10k+ customers</li>
          </ul>
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
                <img src={product.images[0]} alt="" className="img-cover" />
              </div>
              <div className="col-span-6">
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-slate-600">Size: {selectedSize}</p>
              </div>
              <div className="col-span-3 text-right">
                <p className="font-semibold">${product.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg">
                Subtotal:{" "}
                <span className="font-semibold">${product.price}</span>
              </p>
              <div className="flex gap-2">
                <Link className="btn btn-secondary" href="/checkout">
                  Go to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
