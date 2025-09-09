"use client";

import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function OrdersPage() {
  const { isLoggedIn } = useAuth();
  const { orders, isLoading, isError } = useOrders();

  if (!isLoggedIn) {
    return (
      <main className="card">
        <p className="text-sm text-[#6B7280]">
          Please <Link className="text-[#7AA3B8] hover:underline" href="/login">log in</Link> to view your orders.
        </p>
      </main>
    );
  }

  if (isLoading) return <div className="card">Loading orders...</div>;
  if (isError) return <div className="card text-red-500">Failed to load orders.</div>;

  return (
    <main>
      <h1 className="title mb-4">Order History</h1>
      {!orders || orders.length === 0 ? (
        <div className="card">
          <p className="text-sm text-[#6B7280]">No orders yet. <Link className="text-[#7AA3B8] hover:underline" href="/">Shop now</Link>.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#374151]">Order #{o.id}</p>
                  <p className="text-xs text-[#6B7280]">{new Date(o.createdAt).toLocaleString()} • {o.status}</p>
                </div>
                <p className="text-base font-semibold text-[#B48EAD]">${o.total.toFixed(2)}</p>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {o.items.map((it) => (
                  <div key={`${o.id}-${it.productId}-${it.size || "nosize"}`} className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.imageUrl} alt={it.name} className="w-14 h-14 rounded-lg object-cover bg-[#FFF2F6] border border-[#F3E8EE]" loading="lazy" />
                    <div>
                      <p className="text-sm text-[#374151]">{it.name}</p>
                      <p className="text-xs text-[#6B7280]">Qty {it.quantity}{it.size ? ` • Size ${it.size}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
