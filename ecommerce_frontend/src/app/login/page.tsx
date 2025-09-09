"use client";
import { Button, Container, Input, Section } from "@/components/ui";
import { login, me } from "@/services/auth";
import { setAuth } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(email, password);
      const token = res.token;
      const user = res.user || (await me(token));
      setAuth({ token, user });
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setErr(message);
    }
  };

  return (
    <Container>
      <Section className="mx-auto max-w-md">
        <form onSubmit={onSubmit} className="rounded-2xl border border-pink-100 bg-white p-6">
          <h1 className="text-xl font-semibold text-gray-800">Login</h1>
          <div className="mt-4 space-y-4">
            <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
          <div className="mt-6">
            <Button type="submit" variant="primary" className="w-full">Sign in</Button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            No account? <Link href="/signup" className="text-pink-600 underline">Create one</Link>
          </p>
        </form>
      </Section>
    </Container>
  );
}
