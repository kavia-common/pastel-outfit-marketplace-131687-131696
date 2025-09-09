import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-container py-10">
      <section className="card p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold text-gray-800">404 – Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
        <div className="mt-4">
          <Link href="/" className="text-pink-600 underline">Go home</Link>
        </div>
      </section>
    </main>
  );
}
