import React from "react";
import dynamic from "next/dynamic";

// Server-safe wrappers that import client Header/Footer without using ssr:false in a Server Component context.
// These wrappers are server components that render client components via dynamic import default behavior.

const ClientHeader = dynamic(() => import("./ui").then(m => m.Header), { ssr: true });
const ClientFooter = dynamic(() => import("./ui").then(m => m.Footer), { ssr: true });

// PUBLIC_INTERFACE
export function SiteHeader() {
  /** Server component wrapper for the client Header */
  return <ClientHeader />;
}

// PUBLIC_INTERFACE
export function SiteFooter() {
  /** Server component wrapper for the client Footer */
  return <ClientFooter />;
}
