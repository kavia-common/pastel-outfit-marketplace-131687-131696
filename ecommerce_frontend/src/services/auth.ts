import { apiFetch } from "@/lib/api";
import type { User } from "@/lib/auth";

// PUBLIC_INTERFACE
/** Login and return token + user */
export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  return apiFetch<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

// PUBLIC_INTERFACE
/** Signup and return token + user if backend provides; otherwise success status */
export async function signup(name: string, email: string, password: string): Promise<{ token?: string; user?: User }> {
  return apiFetch<{ token?: string; user?: User }>("/auth/signup", {
    method: "POST",
    body: { name, email, password },
  });
}

// PUBLIC_INTERFACE
/** Get current profile */
export async function me(token: string) {
  return apiFetch<User>("/users/me", { token });
}
