"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { AuthResponse, clearAuth, getToken, getUser, saveAuth } from "@/lib/auth";

type LoginInput = { email: string; password: string };
type RegisterInput = { email: string; password: string; name?: string };

async function loginRequest(payload: LoginInput): Promise<AuthResponse> {
  return api.post<AuthResponse>("/auth/login", payload);
}
async function registerRequest(payload: RegisterInput): Promise<AuthResponse> {
  return api.post<AuthResponse>("/auth/register", payload);
}

export function useAuth() {
  // Keep user state in SWR keyed by token; revalidate on focus
  const { data, mutate } = useSWR("auth_user", async () => {
    const user = getUser();
    const token = getToken();
    if (user && token) return { user, token };
    return null;
  });

  const isLoggedIn = Boolean(data?.token);

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });
    saveAuth(res);
    await mutate({ user: res.user, token: res.token }, { revalidate: false });
    return res.user;
  };

  const register = async (email: string, password: string, name?: string) => {
    const res = await registerRequest({ email, password, name });
    saveAuth(res);
    await mutate({ user: res.user, token: res.token }, { revalidate: false });
    return res.user;
  };

  const logout = async () => {
    clearAuth();
    await mutate(null, { revalidate: false });
  };

  return {
    user: data?.user ?? null,
    token: data?.token ?? null,
    isLoggedIn,
    login,
    register,
    logout,
  };
}
