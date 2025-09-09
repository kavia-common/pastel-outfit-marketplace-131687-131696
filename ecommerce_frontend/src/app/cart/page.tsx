"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function CartPage() {
  const { isLoggedIn } = useAuth();
  const { cart, isLoading, isError, removeFromCart } = useCart();
  const { checkout } = useOrders();
  const [checkingOut, setCheckingOut] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onCheckout = async () => {
    try {
      setCheckingOut(true);
      const res = await checkout();
      setMessage(`Order placed! ID: ${res.orderId}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Checkout failed";
      setMessage(msg);
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="card">
        <p className="text-sm text-[#6B7280]">
          Please <Link className="text-[#7AA3B8] hover:underline" href="/login">log in</Link> to view your cart.
        </p>
      </main>
    );
  }

  if (isLoading) return <div className="card">Loading cart...</div>;
  if (isError) return <div className="card text-red-500">Failed to load cart.</div>;

  const hasItems = (cart?.items?.length ?? 0) > 0;

  return (
    <main>
      <h1 className="title mb-4">Your Cart</h1>
      {!hasItems ? (
        <div className="card">
          <p className="text-sm text-[#6B7280]">Your cart is empty. Continue <Link className="text-[#7AA3B8] hover:underline" href="/">shopping</Link>.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="card">
              <ul className="space-y-3">
                {cart!.items.map((it) => (
                  <li key={`${it.productId}-${it.size || "nosize"}`} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.imageUrl} alt={it.name} className="w-20 h-20 rounded-xl object-cover bg-[#FFF2F6] border border-[#F3E8EE]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#374151]">{it.name}</p>
                      <p className="text-xs text-[#6B7280]">
                        Qty {it.quantity}{it.size ? ` • Size ${it.size}` : ""}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#B48EAD]">${(it.price * it.quantity).toFixed(2)}</p>
                    <button className="btn" onClick={() => removeFromCart(it.productId, it.size)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Subtotal</span>
                <span className="text-base font-semibold text-[#374151]">${cart?.total.toFixed(2)}</span>
              </div>
              <button
                className="btn primary w-full mt-4"
                onClick={onCheckout}
                disabled={checkingOut || !hasItems}
              >
                {checkingOut ? "Processing..." : "Checkout"}
              </button>
              {message && <p className="text-sm text-[#6B7280] mt-2">{message}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
