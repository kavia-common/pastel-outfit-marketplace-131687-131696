"use client";

import useSWR from "swr";
import { api } from "@/lib/api";

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
};

const fetcher = async (path: string): Promise<Product[]> =>
  api.get<Product[]>(path);

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    "/products",
    fetcher
  );
  return {
    products: data,
    isLoading,
    isError: Boolean(error),
    error: error as Error | undefined,
    refresh: mutate,
  };
}

const fetchOne = async (path: string): Promise<Product> => api.get<Product>(path);

export function useProduct(id?: string) {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    id ? `/products/${id}` : null,
    fetchOne
  );
  return {
    product: data,
    isLoading,
    isError: Boolean(error),
    error: error as Error | undefined,
    refresh: mutate,
  };
}
