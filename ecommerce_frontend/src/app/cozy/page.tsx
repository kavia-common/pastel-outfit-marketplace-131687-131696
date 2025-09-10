import Image from "next/image";

/**
 * PUBLIC_INTERFACE
 * Cozy Neutrals page - minimalist editorial layout with warm beige pastels and a vertical scroller.
 */
export default function CozyPage() {
  const list = [
    {
      title: "Cream Knit Sweater",
      desc: "Snug fit, cloud-soft texture for gentle layering.",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=60",
    },
    {
      title: "Oatmeal Lounge Set",
      desc: "Relaxed silhouette for cozy afternoons.",
      img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=900&q=60",
    },
    {
      title: "Sandy Trench",
      desc: "Lightweight outerwear with subtle structure.",
      img: "https://images.unsplash.com/photo-1516826957135-700dedea698b?auto=format&fit=crop&w=900&q=60",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-50 via-rose-50 to-white" />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-800">Cozy Neutrals</h1>
          <p className="text-slate-600 mt-2">
            Warm undertones, soft textures, effortless comfort.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {list.map((item, idx) => (
              <article
                key={idx}
                className="rounded-2xl overflow-hidden border border-black/5 bg-white/70"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-full bg-amber-100 hover:bg-amber-200 text-slate-800 border border-amber-200">
                      Add to Cart
                    </button>
                    <button className="px-3 py-1.5 text-sm rounded-full bg-rose-100 hover:bg-rose-200 text-slate-800 border border-rose-200">
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="sticky top-24 self-start">
            <div className="rounded-2xl border border-black/5 bg-white/70 p-5">
              <h2 className="text-xl font-medium text-slate-800">Curator’s Note</h2>
              <p className="text-slate-600 mt-2">
                These neutral pieces are chosen for their soothing palette and
                tactile comfort—perfect for quiet days and soft moods.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• Palette: cream, oat, sand, almond</li>
                <li>• Fabrics: knit, cotton, cashmere blends</li>
                <li>• Fit: relaxed yet refined</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
