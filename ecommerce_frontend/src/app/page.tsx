"use client";
import { Carousel, Container, Hero, ProductCard, Section } from "@/components/ui";
import { useEffect, useState, useCallback } from "react";
import { listProducts, type Product } from "@/services/products";
import { getAuth } from "@/lib/auth";
import { addToCart } from "@/services/cart";
import { Toast } from "@/components/ui";

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [toast, setToast] = useState<{ show: boolean; text: string }>({ show: false, text: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await listProducts({ page: 1, pageSize: 8 });
        setFeatured(res.items || []);
      } catch {
        // ignore failures for demo
      }
    })();
  }, []);

  const onAdd = useCallback(async (p: Product) => {
    const { token } = getAuth();
    if (!token) {
      setToast({ show: true, text: "Please login to add items to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1800);
      return;
    }
    try {
      await addToCart(token, p.id, 1);
      setToast({ show: true, text: "Added to cart!" });
      setTimeout(() => setToast({ show: false, text: "" }), 1500);
    } catch {
      setToast({ show: true, text: "Unable to add to cart." });
      setTimeout(() => setToast({ show: false, text: "" }), 1500);
    }
  }, []);

  return (
    <>
      <Container>
        <Hero />
        <Section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Carousel
            images={[
              "https://images.unsplash.com/photo-1520975954732-35dd222996f2?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1600&auto=format&fit=crop",
            ]}
          />
          <div className="flex flex-col justify-center rounded-2xl border border-pink-100 bg-white p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Soft, Subtle, Stylish</h2>
            <p className="mt-3 text-gray-700">
              Discover modern silhouettes in dreamy hues. Pastels that speak softly and stand out effortlessly.
            </p>
            <div className="mt-6 text-gray-500 text-sm">
              Free returns. Eco packaging. Made with love.
            </div>
          </div>
        </Section>

        <Section id="featured">
          <div className="mb-4 flex items-end justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Featured</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => onAdd(p)} />
            ))}
            {featured.length === 0 && (
              <div className="col-span-full rounded-2xl border border-pink-100 bg-white p-8 text-center text-gray-500">
                No featured products available.
              </div>
            )}
          </div>
        </Section>
      </Container>
      <Toast text={toast.text} show={toast.show} />
    </>
  );
}
