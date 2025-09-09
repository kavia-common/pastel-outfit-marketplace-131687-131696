import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-px max-w-wrap py-16">
      <section className="card p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
          <h1 className="text-3xl font-semibold">404 — Page Not Found</h1>
          <p className="text-slate-600">
            The page you’re looking for doesn’t exist or was moved.
          </p>
          <Link href="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
