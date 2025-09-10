"use client";

import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * AboutPage shares brand story and pastel lifestyle with text blocks and mixed imagery.
 */
export default function AboutPage() {
  return (
    <main className="container-px max-w-wrap py-8 md:py-10">
      <nav className="mb-4 text-sm">
        <Link href="/" className="text-slate-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-slate-700">About</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">About Pastel Market</h1>
        <p className="text-slate-600">
          Minimal designs. Calm palettes. Everyday ease.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-7 card overflow-hidden">
          <div className="product-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="img-cover"
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
              alt="Pastel lifestyle"
            />
          </div>
        </div>
        <div className="lg:col-span-5 card p-5 md:p-6">
          <span className="badge mb-2">Our Story</span>
          <h2 className="text-2xl font-semibold mb-2">Designed for Calm</h2>
          <p className="text-slate-600 leading-relaxed">
            We believe clothing can bring a sense of calm to your day. Our collections
            focus on pastel palettes and simple forms that are easy to pair and wear.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            From brunch to evening walks, our looks are made to feel effortless and
            comfortable—without compromising on style.
          </p>
        </div>
      </section>

      <section className="card p-4 md:p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3">Values</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-700">
          <li className="p-4 rounded-lg bg-[var(--color-soft)]">
            • Soft color theory for peace and balance
          </li>
          <li className="p-4 rounded-lg bg-[var(--color-soft)]">
            • Sustainable, high-quality materials
          </li>
          <li className="p-4 rounded-lg bg-[var(--color-soft)]">
            • Minimal, image-first design
          </li>
        </ul>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542326237-94b1c5a538d8?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        ].map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-slate-200/70">
            <div className="relative aspect-[5/4] bg-[var(--color-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`About mosaic ${i + 1}`} className="img-cover" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
