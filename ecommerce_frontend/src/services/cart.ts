import { apiFetch } from "@/lib/api";

// Model the cart up to backend structure flexibility
export type CartItem = {
  productId: string;
  name?: string;
  price?: number;
  imageUrl?: string;
  qty: number;
};
export type Cart = {
  items: CartItem[];
};

export type Totals = {
  subtotal: number;
  tax?: number;
  total: number;
};

// PUBLIC_INTERFACE
export async function getCart(token: string) {
  return apiFetch<Cart>("/cart", { token });
}

// PUBLIC_INTERFACE
export async function addToCart(token: string, productId: string, qty: number = 1) {
  return apiFetch<object>("/cart/items", { method: "POST", token, body: { productId, qty } });
}

// PUBLIC_INTERFACE
export async function updateCartItem(token: string, productId: string, qty: number) {
  return apiFetch<object>(`/cart/items/${productId}`, { method: "PUT", token, body: { qty } });
}

// PUBLIC_INTERFACE
export async function removeCartItem(token: string, productId: string) {
  return apiFetch<object>(`/cart/items/${productId}`, { method: "DELETE", token });
}

// PUBLIC_INTERFACE
export async function clearCart(token: string) {
  return apiFetch<void>("/cart/clear", { method: "POST", token });
}

// PUBLIC_INTERFACE
export async function getTotals(token: string) {
  return apiFetch<Totals>("/cart/totals", { token });
}

// PUBLIC_INTERFACE
export async function createCheckoutSession(token: string) {
  return apiFetch<{ sessionId?: string; url?: string }>("/checkout/session", { method: "POST", token });
}

// PUBLIC_INTERFACE
export async function checkoutSuccess(token: string, sessionId: string) {
  return apiFetch<{ orderId?: string }>("/checkout/success", { token, query: { session_id: sessionId } });
}
