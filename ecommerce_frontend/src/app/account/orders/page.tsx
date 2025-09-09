"use client";
import { Container, Section } from "@/components/ui";
import { useEffect, useState } from "react";
import { getMyOrders, type Order } from "@/services/orders";
import { getAuth } from "@/lib/auth";
import Link from "next/link";

export default function OrdersPage() {
  const { token } = getAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await getMyOrders(token);
        setOrders(res || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (!token) {
    return (
      <Container>
        <Section>
          <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
            <p className="text-gray-700">Please log in to view your orders.</p>
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
      <Section>
        <div className="rounded-2xl border border-pink-100 bg-white">
          <div className="border-b border-pink-100 p-4 text-base font-semibold text-gray-800">Order History</div>
          <div className="divide-y divide-pink-100">
            {loading && <div className="p-6 text-gray-500">Loading...</div>}
            {!loading && orders.length === 0 && <div className="p-6 text-gray-500">No orders yet.</div>}
            {orders.map((o) => (
              <div key={o.id} className="p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-800">Order #{o.id}</div>
                  <div className="text-gray-600">${((o.total || 0) / 100).toFixed(2)}</div>
                </div>
                <div className="mt-1 text-gray-500">
                  {Array.isArray(o.items) ? o.items.length : 0} items • {new Date(o.createdAt || Date.now()).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </Container>
  );
}
