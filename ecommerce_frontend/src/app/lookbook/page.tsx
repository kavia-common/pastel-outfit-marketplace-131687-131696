"use client";

import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * LookbookPage presents large, editorial-style hero panels with text overlays,
 * alternating image/text blocks, and soft pastel gradients.
 */
export default function LookbookPage() {
  const panels = [
    {
      title: "Soft Pastels. Bold You.",
      sub: "Dreamy hues for everyday ease.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Minimal Layers",
      sub: "Lightweight textures in blush and blue.",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Spring Essentials",
      sub: "Airy silhouettes, timeless shapes.",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <main>
      <section className="hero">
        <div className="container-px max-w-wrap py-8 md:py-12">
          <nav className="mb-4 text-sm">
            <Link href="/" className="text-slate-500 hover:underline">
              Home
            </Link>{" "}
            / <span className="text-slate-700">Lookbook</span>
          </nav>

          <header className="mb-4">
            <h1 className="text-3xl md:text-4xl font-semibold">Pastel Lookbook</h1>
            <p className="text-slate-600 mt-2">
              A visual journal — big imagery, soft colors, and calm compositions.
            </p>
          </header>
        </div>
      </section>

      <section className="container-px max-w-wrap py-6 md:py-10 space-y-6">
        {panels.map((p, idx) => (
          <div key={idx} className="card overflow-hidden">
            <div className="relative">
              <div className="product-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="img-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white drop-shadow">
                <h2 className="text-2xl md:text-4xl font-semibold">{p.title}</h2>
                <p className="opacity-95">{p.sub}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 flex flex-col justify-center">
                <span className="badge mb-2">Edit 01</span>
                <h3 className="text-2xl font-semibold mb-2">Blush & Breeze</h3>
                <p className="text-slate-600">
                  Gentle pinks meet airy fabrics. Pair with powder-blue accents for balance.
                </p>
              </div>
              <div className="relative bg-[var(--color-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"
                  alt="Blush & Breeze"
                  className="img-cover"
                />
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 md:[direction:rtl]">
              <div className="p-6 flex flex-col justify-center md:[direction:ltr]">
                <span className="badge mb-2">Edit 02</span>
                <h3 className="text-2xl font-semibold mb-2">Powder Blue Calm</h3>
                <p className="text-slate-600">
                  A serene palette anchored by powder blue. Clean lines, minimal details.
                </p>
              </div>
              <div className="relative bg-[var(--color-soft)] md:[direction:ltr]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1542326237-94b1c5a538d8?q=80&w=1600&auto=format&fit=crop"
                  alt="Powder Blue Calm"
                  className="img-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/gallery" className="btn btn-secondary">
            View Full Gallery
          </Link>
        </div>
      </section>
    </main>
  );
}
