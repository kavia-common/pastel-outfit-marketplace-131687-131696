"use client";
import { Container, FilterSidebar, ProductCard, Section } from "@/components/ui";
import { listProducts, type Product } from "@/services/products";
import { useEffect, useMemo, useState, useCallback } from "react";
import { addToCart } from "@/services/cart";
import { getAuth } from "@/lib/auth";
import { Toast } from "@/components/ui";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: "" });

  const tags = useMemo(() => {
    const s = new Set<string>();
    items.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).slice(0, 8);
  }, [items]);

  useEffect(() => {
    (async () => {
      try {
        const res = await listProducts({ q, tag, page, pageSize: 20 });
        setItems(res.items || []);
      } catch {
        setItems([]);
      }
    })();
  }, [q, tag, page]);

  const onAdd = useCallback(async (p: Product) => {
    const { token } = getAuth();
    if (!token) {
      setToast({ show: true, text: "Please login to add items to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1600);
      return;
    }
    try {
      await addToCart(token, p.id, 1);
      setToast({ show: true, text: "Added to cart!" });
      setTimeout(() => setToast({ show: false, text: "" }), 1300);
    } catch {
      setToast({ show: true, text: "Unable to add to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1300);
    }
  }, []);

  return (
    <>
      <Container>
        <Section className="grid gap-6 lg:grid-cols-[260px,1fr]">
          <FilterSidebar
            q={q}
            tag={tag}
            tags={tags}
            onChange={(v) => {
              setPage(1);
              setQ(v.q);
              setTag(v.tag);
            }}
          />
          <div>
            <div className="mb-4 flex items-end justify-between">
              <h1 className="text-xl font-semibold text-gray-800">Shop</h1>
              <div className="text-sm text-gray-500">Page {page}</div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => onAdd(p)} />
              ))}
            </div>
            {items.length === 0 && (
              <div className="mt-6 rounded-2xl border border-pink-100 bg-white p-8 text-center text-gray-500">
                No products found.
              </div>
            )}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </Section>
      </Container>
      <Toast text={toast.text} show={toast.show} />
    </>
  );
}
