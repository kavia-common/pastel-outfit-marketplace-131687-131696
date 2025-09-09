"use client";
import { Container, Section } from "@/components/ui";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { checkoutSuccess } from "@/services/cart";
import { getAuth } from "@/lib/auth";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const { token } = getAuth();
  const [status, setStatus] = useState<"pending" | "ok" | "error">("pending");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        const res = await checkoutSuccess(token, sessionId);
        if (res?.orderId) setOrderId(res.orderId);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    })();
  }, [token, sessionId]);

  return (
    <Section>
      <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
        {status === "pending" && <p className="text-gray-700">Finalizing your order...</p>}
        {status === "ok" && (
          <>
            <h1 className="text-xl font-semibold text-gray-800">Thank you!</h1>
            <p className="mt-2 text-gray-700">Your payment was successful.</p>
            {orderId && <p className="mt-1 text-sm text-gray-500">Order ID: {orderId}</p>}
            <div className="mt-4">
              <Link className="text-pink-600 underline" href="/account/orders">View orders</Link>
            </div>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold text-gray-800">Payment not completed</h1>
            <p className="mt-2 text-gray-700">We couldn’t verify the payment.</p>
            <div className="mt-4">
              <Link className="text-pink-600 underline" href="/cart">Return to cart</Link>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Container>
      <Suspense fallback={<Section><div className="rounded-2xl border border-pink-100 bg-white p-8 text-center text-gray-700">Loading...</div></Section>}>
        <SuccessContent />
      </Suspense>
    </Container>
  );
}
