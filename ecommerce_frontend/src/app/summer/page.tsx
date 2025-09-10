import Image from "next/image";

/**
 * PUBLIC_INTERFACE
 * Summer Breeze page - a split hero with mosaic gallery using cool aqua pastel tones.
 */
export default function SummerPage() {
  const hero =
    "https://images.unsplash.com/photo-1520975661595-6459f2f9a5a0?auto=format&fit=crop&w=1400&q=60";
  const gallery = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1516826957135-700dedea698b?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1514324352421-608f5a86a8d0?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1520975588266-78a7dd70520a?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1536305030015-391e2feab1f6?auto=format&fit=crop&w=900&q=60",
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-sky-50 to-white" />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl overflow-hidden border border-black/5 bg-white/70">
            <div className="relative w-full h-80">
              <Image
                src={hero}
                alt="Summer pastel outfit"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h1 className="text-3xl font-semibold text-slate-800">
                Summer Breeze
              </h1>
              <p className="text-slate-600 mt-2">
                Airy fabrics and sunlit shades—float through summer in style.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1.5 text-sm rounded-full bg-sky-100 hover:bg-sky-200 text-slate-800 border border-sky-200">
                  Shop Collection
                </button>
                <button className="px-3 py-1.5 text-sm rounded-full bg-cyan-100 hover:bg-cyan-200 text-slate-800 border border-cyan-200">
                  Explore Looks
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4">
            <div className="grid grid-cols-3 gap-4">
              {gallery.slice(0, 3).map((src, i) => (
                <div key={i} className="relative h-40 rounded-xl overflow-hidden border border-black/5 bg-white/60">
                  <Image src={src} alt={`Summer ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="relative h-44 rounded-xl overflow-hidden border border-black/5 bg-white/60">
              <Image src={gallery[3]} alt="Summer wide" fill className="object-cover" />
            </div>
            <div className="relative h-44 rounded-xl overflow-hidden border border-black/5 bg-white/60">
              <Image src={gallery[4]} alt="Summer wide 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
