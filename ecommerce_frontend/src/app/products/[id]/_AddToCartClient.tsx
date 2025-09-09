"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function AddToCartClient({
  productId,
  sizes,
}: {
  productId: string;
  sizes?: string[];
}) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onAdd = async () => {
    try {
      setAdding(true);
      await addToCart(productId, 1, size);
      setMessage("Added to cart!");
      setTimeout(() => setMessage(null), 1500);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to add to cart";
      setMessage(msg);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="mt-6">
      {sizes && sizes.length > 0 && (
        <div className="mt-4">
          <label className="label">Size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((s) => (
              <button
                key={s}
                className={`btn ${size === s ? "accent" : ""}`}
                onClick={() => setSize(s)}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button className="btn primary" onClick={onAdd} disabled={adding}>
          {adding ? "Adding..." : "Add to Cart"}
        </button>
        {message && <span className="text-sm text-[#6B7280]">{message}</span>}
      </div>
    </div>
  );
}
