"use client";
import { Button, Container, Section } from "@/components/ui";
import { useEffect, useState } from "react";
import { me } from "@/services/auth";
import { clearAuth, getAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [profile, setProfile] = useState<{ name?: string; email?: string } | null>(null);
  const router = useRouter();
  const { token, user } = getAuth();

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const u = await me(token);
        setProfile(u);
      } catch {
        setProfile(user || null);
      }
    })();
  }, [token, user]);

  if (!token) {
    return (
      <Container>
        <Section>
          <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
            <p className="text-gray-700">Please log in to view your account.</p>
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
      <Section className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-pink-100 bg-white p-6">
          <h1 className="text-xl font-semibold text-gray-800">Account</h1>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-900">{profile?.name || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900">{profile?.email || "—"}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/account/orders" className="text-pink-600 underline">View order history</Link>
            <Button
              variant="ghost"
              onClick={() => {
                clearAuth();
                router.push("/");
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </Section>
    </Container>
  );
}
