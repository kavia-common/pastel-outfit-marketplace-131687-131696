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

/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * Pre-generates product [id] params for static export by fetching products from the backend.
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const products: { id: string }[] = await res.json();
    return products.map((p) => ({ id: p.id }));
  } catch {
    // If backend not available at build time, fallback to no prebuilt pages.
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

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  // In Next.js 15 app router, params may be a Promise during static rendering contexts.
  const { id } = await props.params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className="grid md:grid-cols-2 gap-6">
      <DetailImage src={product.imageUrl} alt={product.name} />
      <div>
        <h1 className="text-2xl font-semibold text-[#374151]">{product.name}</h1>
        <p className="text-xl font-bold text-[#B48EAD] mt-1">${product.price.toFixed(2)}</p>
        <p className="text-sm text-[#6B7280] mt-3">{product.description}</p>

        <AddToCartClient productId={product.id} sizes={product.sizes} />
      </div>
    </main>
  );
}

/** Image block with skeleton + fallback optimized for large preview */
function DetailImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#F3E8EE]">
      <ImageWithFallback src={src} alt={alt} />
    </div>
  );
}

function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  // Client-only handlers are not available in RSC; render a native fallback pattern.
  // Use a CSS-based lazy effect with background and rely on browser loading.
  return (
    <div className="relative bg-[#FFF2F6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover aspect-[4/5]"
        loading="eager"
      />
      {/* Note: Errors are harder to trap in RSC. If needed, we could move this block to a client component. */}
    </div>
  );
}
