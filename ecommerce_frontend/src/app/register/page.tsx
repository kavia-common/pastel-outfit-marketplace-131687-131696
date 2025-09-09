"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register(email, password, name);
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-md mx-auto">
      <div className="card">
        <h1 className="title mb-4">Create your account</h1>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <label className="label" htmlFor="name">Name</label>
            <input id="name" className="input" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
          <button type="submit" className="btn primary w-full" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="text-sm text-[#6B7280] mt-3">
          Already have an account? <Link className="text-[#7AA3B8] hover:underline" href="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
