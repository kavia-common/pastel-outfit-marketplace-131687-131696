"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export default function NavBar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { cart } = useCart();

  const count = cart?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;

  return (
    <nav className="w-full sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-[rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-[#B48EAD]">
          Pastel Outfit Market
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-sm text-[#7AA3B8] hover:underline">
            Cart ({count})
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/orders" className="text-sm text-[#7AA3B8] hover:underline">
                Orders
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-sm text-[#C79F9F] hover:underline"
              >
                Logout{user?.name ? ` (${user.name})` : ""}
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-[#7AA3B8] hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
