"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, LIMITS, type Category, type Ticket, type TicketSummary } from "../../lib/ticketTypes";
import SignInCard from "./SignInCard";
import { api, formatDate, useTicketSession } from "./useTicketSession";

type Filter = "open" | "closed" | "all";

export default function TicketsPage() {
  const router = useRouter();
  const { loading, user } = useTicketSession();
  const [tickets, setTickets] = useState<TicketSummary[] | null>(null);
  const [filter, setFilter] = useState<Filter>("open");
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    api<{ tickets: TicketSummary[] }>("/api/tickets")
      .then((data) => setTickets(data.tickets))
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (user) refresh();
  }, [user, refresh]);

  async function create(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { ticket } = await api<{ ticket: Ticket }>("/api/tickets", {
        method: "POST",
        body: JSON.stringify({ subject, category, message }),
      });
      router.push(`/tickets/${ticket.id}`);
    } catch (e: any) {
      setError(e.message);
      setBusy(false);
    }
  }

  const shown = (tickets ?? []).filter((t) => filter === "all" || t.status === filter);
  const openCount = (tickets ?? []).filter((t) => t.status === "open").length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <header className="page-card mb-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="display-title">Support Tickets</h1>
          {user?.isStaff && <span className="staff-badge">Support</span>}
        </div>
        <p className="lead mt-3">
          {user?.isStaff
            ? "You have full access to the ticket panel. Every ticket from every member shows up below."
            : "Need help with Lotus or found a bug? Open a ticket and we'll reply here."}
        </p>
      </header>

      {loading ? (
        <section className="page-card text-center"><p className="lead">Loading…</p></section>
      ) : !user ? (
        <SignInCard next="/tickets" />
      ) : (
        <>
          <section className="page-card" aria-labelledby="new-ticket">
            <h2 id="new-ticket" className="section-title">Open a new ticket</h2>
            <form className="ticket-form mt-4" onSubmit={create}>
              <label className="field">
                <span>Category</span>
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Subject</span>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={LIMITS.subject} required placeholder="Short summary of the problem" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={LIMITS.message} required rows={5} placeholder="Tell us what's going on" />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="btn-lotus btn-green" disabled={busy}>{busy ? "Creating…" : "Create ticket"}</button>
            </form>
          </section>

          <section className="page-card" aria-labelledby="ticket-list">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="ticket-list" className="section-title">{user.isStaff ? "All tickets" : "Your tickets"}</h2>
              <div className="ticket-tabs" role="tablist" aria-label="Filter tickets">
                {(["open", "closed", "all"] as Filter[]).map((f) => (
                  <button key={f} type="button" role="tab" aria-selected={filter === f} className={`tab ${filter === f ? "is-active" : ""}`} onClick={() => setFilter(f)}>
                    {f === "open" ? `Open (${openCount})` : f[0].toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {tickets === null ? (
              <p className="text-muted mt-4">Loading tickets…</p>
            ) : shown.length === 0 ? (
              <p className="text-muted mt-4">No {filter === "all" ? "" : filter} tickets yet.</p>
            ) : (
              <ul className="ticket-list mt-4">
                {shown.map((t) => (
                  <li key={t.id}>
                    <a className="ticket-row" href={`/tickets/${t.id}`}>
                      <span className="ticket-row-main">
                        <strong>{t.subject}</strong>
                        <small>
                          {t.category}
                          {user.isStaff && <> · {t.authorName}</>} · {t.messageCount} {t.messageCount === 1 ? "message" : "messages"} · updated {formatDate(t.updatedAt)}
                        </small>
                      </span>
                      <span className={`status-pill is-${t.status}`}>{t.status}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
