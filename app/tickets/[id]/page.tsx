"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LIMITS, type Ticket } from "../../../lib/ticketTypes";
import SignInCard from "../SignInCard";
import { api, formatDate, useTicketSession } from "../useTicketSession";

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { loading, user } = useTicketSession();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    api<{ ticket: Ticket }>(`/api/tickets/${id}`)
      .then((data) => { setTicket(data.ticket); setError(""); })
      .catch((e) => setError(e.message));
  }, [id]);

  // Load, then poll so new replies show up without a refresh.
  useEffect(() => {
    if (!user) return;
    refresh();
    const timer = setInterval(refresh, 15_000);
    return () => clearInterval(timer);
  }, [user, refresh]);

  async function act(body: object) {
    setBusy(true);
    setError("");
    try {
      const data = await api<{ ticket: Ticket }>(`/api/tickets/${id}`, { method: "POST", body: JSON.stringify(body) });
      setTicket(data.ticket);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(event: React.FormEvent) {
    event.preventDefault();
    if (await act({ action: "reply", content: reply })) setReply("");
  }

  async function remove() {
    if (!confirm("Delete this ticket for good?")) return;
    setBusy(true);
    try {
      await api(`/api/tickets/${id}`, { method: "DELETE" });
      router.push("/tickets");
    } catch (e: any) {
      setError(e.message);
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <p className="mb-4"><a className="home-link" href="/tickets">&larr; All tickets</a></p>

      {loading ? (
        <section className="page-card text-center"><p className="lead">Loading…</p></section>
      ) : !user ? (
        <SignInCard next={`/tickets/${id}`} />
      ) : !ticket ? (
        <section className="page-card text-center">
          <p className="lead">{error || "Loading ticket…"}</p>
        </section>
      ) : (
        <>
          <header className="page-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="section-title">{ticket.subject}</h1>
              <span className={`status-pill is-${ticket.status}`}>{ticket.status}</span>
            </div>
            <p className="text-muted mt-2 text-sm">
              {ticket.category} · opened by {ticket.authorName} · {formatDate(ticket.createdAt)}
            </p>
            <div className="ticket-actions mt-4">
              {ticket.status === "open" ? (
                <button type="button" className="btn-small" disabled={busy} onClick={() => act({ action: "close" })}>Close ticket</button>
              ) : user.isStaff ? (
                <button type="button" className="btn-small" disabled={busy} onClick={() => act({ action: "reopen" })}>Reopen ticket</button>
              ) : null}
              {user.isStaff && <button type="button" className="btn-small is-danger" disabled={busy} onClick={remove}>Delete</button>}
            </div>
          </header>

          <section className="page-card" aria-label="Conversation">
            <ul className="thread">
              {ticket.messages.map((m) => (
                <li key={m.id} className={`bubble ${m.staff ? "is-staff" : ""}`}>
                  <img className="user-avatar" src={m.authorAvatar ?? "/logo.png"} alt="" />
                  <div>
                    <div className="bubble-head">
                      <strong>{m.authorName}</strong>
                      {m.staff && <span className="staff-badge">Staff</span>}
                      <time>{formatDate(m.createdAt)}</time>
                    </div>
                    <p className="bubble-body">{m.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {ticket.status === "open" || user.isStaff ? (
            <section className="page-card">
              <form className="ticket-form" onSubmit={sendReply}>
                <label className="field">
                  <span>{ticket.status === "closed" ? "Reply (this ticket is closed)" : "Reply"}</span>
                  <textarea value={reply} onChange={(e) => setReply(e.target.value)} maxLength={LIMITS.message} required rows={4} placeholder="Write a reply" />
                </label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="btn-lotus btn-green" disabled={busy}>Send reply</button>
              </form>
            </section>
          ) : (
            <section className="page-card text-center">
              <p className="lead">This ticket is closed. Open a new one if you still need help.</p>
            </section>
          )}
        </>
      )}
    </div>
  );
}
