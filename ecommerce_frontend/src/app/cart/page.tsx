"use client";
import { Container, Section, Button } from "@/components/ui";
import { useEffect, useState, useCallback } from "react";
import { clearCart, getCart, getTotals, removeCartItem, updateCartItem, createCheckoutSession, type CartItem } from "@/services/cart";
import { getAuth } from "@/lib/auth";
import Link from "next/link";

type CartState = { items: CartItem[] };

export default function CartPage() {
  const { token } = getAuth();
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [totals, setTotals] = useState<{ subtotal: number; total: number; tax?: number }>({ subtotal: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const c = await getCart(token);
      const t = await getTotals(token);
      setCart(c);
      setTotals(t);
    } catch {
      setCart({ items: [] });
      setTotals({ subtotal: 0, total: 0 });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    refresh();
  }, [token, refresh]);

  const onCheckout = async () => {
    if (!token) return;
    try {
      const res = await createCheckoutSession(token);
      if (res.url) {
        window.location.href = res.url;
      }
    } catch {
      // no-op
    }
  };

  if (!token) {
    return (
      <Container>
        <Section>
          <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
            <p className="text-gray-700">Please log in to view your cart.</p>
            <div className="mt-4">
              <Link href="/login" className="text-pink-600 underline">Go to Login</Link>
            </div>
          </div>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section className="grid gap-6 lg:grid-cols-[1fr,360px]">
        <div className="rounded-2xl border border-pink-100 bg-white">
          <div className="border-b border-pink-100 p-4 text-base font-semibold text-gray-800">Cart</div>
          <div className="divide-y divide-pink-100">
            {loading && <div className="p-6 text-gray-500">Loading...</div>}
            {!loading && cart.items.length === 0 && <div className="p-6 text-gray-500">Your cart is empty.</div>}
            {cart.items.map((it) => (
              <div key={it.productId} className="flex items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.imageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop"}
                  alt={it.name || "item"}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{it.name || "Product"}</div>
                  <div className="mt-1 text-xs text-gray-500">${((it.price || 0) / 100).toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={async (e) => {
                        const qty = Math.max(1, parseInt(e.target.value || "1", 10));
                        await updateCartItem(token, it.productId, qty);
                        refresh();
                      }}
                      className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
                    />
                    <button
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={async () => {
                        await removeCartItem(token, it.productId);
                        refresh();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.items.length > 0 && (
            <div className="border-t border-pink-100 p-4">
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={async () => {
                  await clearCart(token);
                  refresh();
                }}
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <h3 className="text-base font-semibold text-gray-800">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${(totals.subtotal / 100).toFixed(2)}</span>
            </div>
            {totals.tax !== undefined && (
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>${((totals.tax || 0) / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${(totals.total / 100).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="primary" className="w-full" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            You’ll be redirected to payment if Stripe is configured.
          </p>
        </div>
      </Section>
    </Container>
  );
}
