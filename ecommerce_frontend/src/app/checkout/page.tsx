"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * PUBLIC_INTERFACE
 * CheckoutPage renders a simple, pastel-styled checkout form with summary.
 */
export default function CheckoutPage() {
  const router = useRouter();

  return (
    <main className="container-px max-w-wrap py-8 md:py-10">
      <nav className="mb-4 text-sm">
        <Link href="/" className="text-slate-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-slate-700">Checkout</span>
      </nav>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 card p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Order placed! (stub)");
              router.push("/");
            }}
          >
            <div className="md:col-span-2">
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full rounded-md border px-3 py-2"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="first">First Name</label>
              <input id="first" className="w-full rounded-md border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="last">Last Name</label>
              <input id="last" className="w-full rounded-md border px-3 py-2" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1" htmlFor="address">Address</label>
              <input id="address" className="w-full rounded-md border px-3 py-2" required />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="city">City</label>
              <input id="city" className="w-full rounded-md border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="postal">Postal Code</label>
              <input id="postal" className="w-full rounded-md border px-3 py-2" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1" htmlFor="card">Card Number</label>
              <input id="card" className="w-full rounded-md border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="exp">Expiry</label>
              <input id="exp" className="w-full rounded-md border px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="cvc">CVC</label>
              <input id="cvc" className="w-full rounded-md border px-3 py-2" required />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-2">
              <Link className="btn btn-ghost" href="/" aria-label="Cancel and go home">
                Cancel
              </Link>
              <button className="btn btn-primary" type="submit" aria-label="Place order">
                Place Order
              </button>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-5 card p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-[var(--color-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img-cover"
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop"
                alt=""
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">Pastel Outfit #1</p>
              <p className="text-sm text-slate-600">Size: M</p>
            </div>
            <p className="font-semibold">$72</p>
          </div>
          <div className="space-y-1 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$72</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-800 pt-2 border-t">
              <span>Total</span>
              <span>$72</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
