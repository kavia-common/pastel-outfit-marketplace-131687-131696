"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { products, isLoading, isError } = useProducts();

  return (
    <main>
      <section className="mb-6 rounded-2xl p-6 bg-[var(--pastel-rose)] border border-[#F3E8EE]">
        <h1 className="text-2xl font-semibold text-[#374151]">Pastel Highlights</h1>
        <p className="text-sm text-[#6B7280]">Explore our curated pastel outfit collection.</p>
      </section>

      {isLoading && (
        <div className="card">Loading products...</div>
      )}
      {isError && (
        <div className="card text-red-500">
          Failed to load products. Ensure the backend is reachable at https://vscode-internal-14400-beta.beta01.cloud.kavia.ai:3001/api
        </div>
      )}

      <section className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
