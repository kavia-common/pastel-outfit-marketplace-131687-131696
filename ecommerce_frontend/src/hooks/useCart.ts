"use client";

import useSWR from "swr";
import { api } from "@/lib/api";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

const cartFetcher = async (): Promise<Cart> => api.get<Cart>("/cart");

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to fetch and mutate the current user's cart. */
  const { data, error, isLoading, mutate } = useSWR<Cart>("/cart", cartFetcher);

  // PUBLIC_INTERFACE
  const addToCart = async (productId: string, quantity = 1, size?: string) => {
    await api.post("/cart/add", { productId, quantity, size });
    await mutate();
  };

  // PUBLIC_INTERFACE
  const removeFromCart = async (productId: string, size?: string) => {
    await api.post("/cart/remove", { productId, size });
    await mutate();
  };

  return {
    cart: data,
    isLoading,
    isError: Boolean(error),
    error: error as Error | undefined,
    refresh: mutate,
    addToCart,
    removeFromCart,
  };
}
