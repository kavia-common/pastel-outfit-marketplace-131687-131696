import { apiFetch } from "@/lib/api";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  imageUrl?: string;
  tags?: string[];
  stock?: number;
};

export type PagedProducts = {
  items: Product[];
  page: number;
  pageSize: number;
  total?: number;
};

// PUBLIC_INTERFACE
/** Fetch list of products with optional search and tag filter */
export async function listProducts(params: {
  q?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}) {
  return apiFetch<PagedProducts>("/products", {
    query: {
      q: params.q,
      tag: params.tag,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
    },
  });
}

// PUBLIC_INTERFACE
/** Fetch product by id */
export async function getProduct(id: string) {
  return apiFetch<Product>(`/products/${id}`);
}
