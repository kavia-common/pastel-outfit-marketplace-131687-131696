import Image from "next/image";

/**
 * PUBLIC_INTERFACE
 * Spring Pastels page - features a soft collage grid with subtle gradients and pastel outfit imagery.
 */
export default function SpringPage() {
  const items = [
    { id: 1, title: "Blush Cardigan", img: "https://images.unsplash.com/photo-1520974722070- lc0?auto=format&fit=crop&w=900&q=60".replace(" lc0","e0b0f8f8d7a1") },
    { id: 2, title: "Mint Midi Dress", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=60" },
    { id: 3, title: "Lavender Tee", img: "https://images.unsplash.com/photo-1520975764746-6cc0b5b9db62?auto=format&fit=crop&w=900&q=60" },
    { id: 4, title: "Butter Yellow Skirt", img: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=60" },
    { id: 5, title: "Powder Blue Blazer", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=60" },
    { id: 6, title: "Peach Knit Top", img: "https://images.unsplash.com/photo-1475178626620-a4d074967728?auto=format&fit=crop&w=900&q=60" },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-emerald-50 to-white" />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-800">Spring Pastels</h1>
          <p className="text-slate-600 mt-2">
            Breezy silhouettes and gentle hues for the perfect spring refresh.
          </p>
        </header>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.id}
              className="rounded-2xl overflow-hidden border border-black/5 bg-white/70 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-64">
                <Image
                  src={it.img}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-slate-800">{it.title}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Soft texture, light feel—curated for spring days.
                </p>
                <button className="mt-3 px-3 py-1.5 text-sm rounded-full bg-pink-100 hover:bg-pink-200 text-slate-800 border border-pink-200">
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
