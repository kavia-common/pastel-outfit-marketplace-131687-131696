"use client";

import Link from "next/link";
import { Product } from "@/hooks/useProducts";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border border-[#F3E8EE] bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/5]">
          {!loaded && !error && <div className="absolute inset-0 skeleton" aria-hidden />}
          {!error ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover bg-[#FFF2F6] transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => {
                setError(true);
                setLoaded(true);
              }}
            />
          ) : (
            <div className="image-fallback w-full h-full">
              Image unavailable
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-[#6B7280] line-clamp-1">{product.name}</h3>
          <p className="text-base font-semibold text-[#B48EAD]">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}
