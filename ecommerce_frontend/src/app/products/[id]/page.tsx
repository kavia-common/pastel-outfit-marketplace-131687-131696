/**
 * Product details page for static export.
 * Converts the previous client-side page into an RSC with dynamic param support.
 */

import { API_BASE_URL } from "@/lib/config";
import { notFound } from "next/navigation";
import AddToCartClient from "./_AddToCartClient";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  sizes?: string[];
};

export const dynamicParams = true;

// PUBLIC_INTERFACE
export async function generateStaticParams() {
  /**
   * This is duplicated to satisfy Next.js lookup; some environments use
   * page-level export, others use a colocated file. Keeping both is safe.
   */
  try {
    const res = await fetch(`${API_BASE_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const products: { id: string }[] = await res.json();
    return products.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Product;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <main className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl overflow-hidden border border-[#F3E8EE] bg-[#FFF2F6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-[#374151]">{product.name}</h1>
        <p className="text-xl font-bold text-[#B48EAD] mt-1">${product.price.toFixed(2)}</p>
        <p className="text-sm text-[#6B7280] mt-3">{product.description}</p>

        <AddToCartClient productId={product.id} sizes={product.sizes} />
      </div>
    </main>
  );
}
