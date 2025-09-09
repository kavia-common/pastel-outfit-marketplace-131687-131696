"use client";
import { Button, Container, Input, Section } from "@/components/ui";
import { signup, me, login } from "@/services/auth";
import { setAuth } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const s = await signup(name, email, password);
      // if backend doesn't return token, attempt immediate login
      let token = s.token;
      let user = s.user;
      if (!token) {
        const l = await login(email, password);
        token = l.token;
        user = l.user;
      }
      if (token && !user) {
        user = await me(token);
      }
      if (token && user) {
        setAuth({ token, user });
        router.push("/");
      } else {
        router.push("/login");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setErr(message);
    }
  };

  return (
    <Container>
      <Section className="mx-auto max-w-md">
        <form onSubmit={onSubmit} className="rounded-2xl border border-pink-100 bg-white p-6">
          <h1 className="text-xl font-semibold text-gray-800">Create account</h1>
          <div className="mt-4 space-y-4">
            <Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
          <div className="mt-6">
            <Button type="submit" variant="primary" className="w-full">Sign up</Button>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-pink-600 underline">Login</Link>
          </p>
        </form>
      </Section>
    </Container>
  );
}
