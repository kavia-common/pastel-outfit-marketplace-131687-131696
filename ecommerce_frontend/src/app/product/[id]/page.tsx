import ClientProductDetail from "./ClientPage";
// Import the generated PageProps type from Next.js build types to satisfy TS expectation
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { PageProps } from "../../../../.next/types/app/product/[id]/page";

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
 * Note: We import the generated PageProps type so that the exported signature matches
 * the Next.js type expectations enforced during build-type checking.
 */
export default function ProductDetailPage({ params }: PageProps) {
  const { id } = (params as unknown as { id: string });
  return <ClientProductDetail id={id} />;
}
