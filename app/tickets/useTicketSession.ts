"use client";

import { useEffect, useState } from "react";
import type { TicketUser } from "../../lib/ticketTypes";

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

export function useTicketSession() {
  const [state, setState] = useState<{ loading: boolean; user: TicketUser | null }>({ loading: true, user: null });

  useEffect(() => {
    api<{ user: TicketUser | null }>("/api/tickets/session")
      .then(({ user }) => setState({ loading: false, user }))
      .catch(() => setState({ loading: false, user: null }));
  }, []);

  return state;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
