"use client";

import useSWR from "swr";
import { api } from "@/lib/api";

export type Order = {
  id: string;
  createdAt: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
    size?: string;
  }[];
  total: number;
  status: "processing" | "paid" | "shipped" | "delivered" | "cancelled";
};

const fetcher = async () => api.get<Order[]>("/orders");

// PUBLIC_INTERFACE
export function useOrders() {
  /** Hook to fetch user's order history and perform checkout. */
  const { data, error, isLoading, mutate } = useSWR<Order[]>("/orders", fetcher);

  // PUBLIC_INTERFACE
  async function checkout(): Promise<{ orderId: string }> {
    const res = await api.post<{ orderId: string }>("/checkout", {});
    await mutate();
    return res;
  }

  return {
    orders: data,
    isLoading,
    isError: Boolean(error),
    error: error as Error | undefined,
    refresh: mutate,
    checkout,
  };
}
