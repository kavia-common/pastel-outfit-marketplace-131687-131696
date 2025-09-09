"use client";

import Link from "next/link";
import { Product } from "@/hooks/useProducts";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#F3E8EE] bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/5] bg-[#FFF2F6]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-[#6B7280]">{product.name}</h3>
          <p className="text-base font-semibold text-[#B48EAD]">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}
