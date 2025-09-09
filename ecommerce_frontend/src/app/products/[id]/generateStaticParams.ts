import { API_BASE_URL } from "@/lib/config";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * Pre-generates product [id] params for static export by fetching products from the backend.
 */
export default async function generateStaticParams() {
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
