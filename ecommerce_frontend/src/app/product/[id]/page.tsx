import ClientProductDetail from "./ClientPage";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams supplies a small static set of product IDs for static export.
 */
export async function generateStaticParams() {
  const ids = Array.from({ length: 12 }).map((_, i) => String(i + 1));
  return ids.map((id) => ({ id }));
}

/**
 * PUBLIC_INTERFACE
 * ProductDetailPage is a server component wrapper that passes the dynamic param to
 * the client component. This allows using generateStaticParams while keeping
 * interactive UI in a client component.
 *
 * Note: In this project configuration, Next.js generates PageProps where `params` is a Promise.
 */
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ClientProductDetail id={id} />;
}
