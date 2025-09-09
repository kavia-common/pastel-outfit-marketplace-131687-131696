"use client";
import { Container, PastelBadge, Section, Button } from "@/components/ui";
import { getProduct, type Product } from "@/services/products";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { addToCart } from "@/services/cart";
import { getAuth } from "@/lib/auth";
import { Toast } from "@/components/ui";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [p, setP] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: "" });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const prod = await getProduct(id);
        setP(prod);
      } catch {
        setP(null);
      }
    })();
  }, [id]);

  const onAdd = async () => {
    const { token } = getAuth();
    if (!token) {
      setToast({ show: true, text: "Please login to add to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1500);
      return;
    }
    if (!p) return;
    try {
      await addToCart(token, p.id, qty);
      setToast({ show: true, text: "Added to cart!" });
      setTimeout(() => setToast({ show: false, text: "" }), 1200);
    } catch {
      setToast({ show: true, text: "Unable to add to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1200);
    }
  };

  if (!p) {
    return (
      <Container>
        <Section>
          <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center text-gray-500">
            Loading product...
          </div>
        </Section>
      </Container>
    );
  }

  const price = (p.price / 100).toFixed(2);

  return (
    <>
      <Container>
        <Section className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-pink-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imageUrl || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-2xl border border-pink-100 bg-white p-6">
            <h1 className="text-2xl font-semibold text-gray-800">{p.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags?.map((t) => (
                <PastelBadge key={t}>{t}</PastelBadge>
              ))}
            </div>
            <div className="mt-4 text-xl font-semibold text-gray-900">${price}</div>
            <p className="mt-4 text-gray-700">{p.description || "A beautiful pastel outfit with modern minimal aesthetics."}</p>
            <div className="mt-6 flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                className="w-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              />
              <Button variant="primary" onClick={onAdd}>Add to Cart</Button>
            </div>
          </div>
        </Section>
      </Container>
      <Toast text={toast.text} show={toast.show} />
    </>
  );
}
