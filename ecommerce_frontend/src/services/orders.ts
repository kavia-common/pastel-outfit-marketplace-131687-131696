import { apiFetch } from "@/lib/api";

export type OrderItem = {
  productId: string;
  name?: string;
  price?: number;
  qty: number;
  imageUrl?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt?: string;
};

// PUBLIC_INTERFACE
export async function getOrder(token: string, id: string) {
  return apiFetch<Order>(`/orders/${id}`, { token });
}

// PUBLIC_INTERFACE
export async function getMyOrders(token: string) {
  return apiFetch<Order[]>("/users/orders", { token });
}
