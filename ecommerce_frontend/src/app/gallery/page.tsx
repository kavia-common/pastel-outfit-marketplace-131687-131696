"use client";

import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * GalleryPage shows a responsive grid of pastel outfit images with minimal hover effects.
 */
export default function GalleryPage() {
  const images = Array.from({ length: 18 }).map((_, i) => {
    const srcs = [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542326237-94b1c5a538d8?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
    ];
    return srcs[i % srcs.length];
  });

  return (
    <main className="container-px max-w-wrap py-8 md:py-10">
      <nav className="mb-4 text-sm">
        <Link href="/" className="text-slate-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-slate-700">Gallery</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">Pastel Gallery</h1>
        <p className="text-slate-600">
          Explore outfits in soothing pastel tones — a minimal, image-first showcase.
        </p>
      </header>

      <section className="card p-3 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-xl border border-slate-200/70 bg-white"
            >
              <div className="relative aspect-[4/5] bg-[var(--color-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Pastel look ${i + 1}`}
                  className="img-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Pastel Look #{i + 1}</p>
                  <span className="badge">Inspo</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
