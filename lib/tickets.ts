// Supabase-backed ticket store (tables: tickets, ticket_messages — see supabase/tickets.sql).
import { supabaseAdmin } from "./supabaseAdmin";
import type { Category, Ticket, TicketMessage, TicketStatus, TicketSummary } from "./ticketTypes";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Author = { id: string; name: string; avatar?: string; isStaff: boolean };

function check<T>(result: { data: T; error: { message: string } | null }): T {
  if (result.error) throw new Error(`tickets: ${result.error.message}`);
  return result.data;
}

const toSummary = (row: any): TicketSummary => ({
  id: row.id,
  subject: row.subject,
  category: row.category as Category,
  status: row.status as TicketStatus,
  authorId: row.author_id,
  authorName: row.author_name,
  authorAvatar: row.author_avatar ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  messageCount: row.ticket_messages?.[0]?.count ?? 0,
});

const toMessage = (row: any): TicketMessage => ({
  id: row.id,
  authorId: row.author_id,
  authorName: row.author_name,
  authorAvatar: row.author_avatar ?? undefined,
  staff: row.staff,
  content: row.content,
  createdAt: row.created_at,
});

export async function listTickets(opts: { ownerId?: string } = {}): Promise<TicketSummary[]> {
  let query = supabaseAdmin().from("tickets").select("*, ticket_messages(count)").order("updated_at", { ascending: false });
  if (opts.ownerId) query = query.eq("author_id", opts.ownerId);
  return (check(await query) ?? []).map(toSummary);
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  if (!UUID.test(id)) return undefined;
  const row: any = check(await supabaseAdmin().from("tickets").select("*, ticket_messages(*)").eq("id", id).maybeSingle());
  if (!row) return undefined;
  const messages = [...(row.ticket_messages ?? [])]
    .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))
    .map(toMessage);
  const { messageCount: _unused, ...summary } = toSummary(row);
  return { ...summary, messages };
}

export async function countOpenByOwner(ownerId: string): Promise<number> {
  const { count, error } = await supabaseAdmin()
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("author_id", ownerId)
    .eq("status", "open");
  if (error) throw new Error(`tickets: ${error.message}`);
  return count ?? 0;
}

async function insertMessage(ticketId: string, author: Author, content: string) {
  check(
    await supabaseAdmin().from("ticket_messages").insert({
      ticket_id: ticketId,
      author_id: author.id,
      author_name: author.name,
      author_avatar: author.avatar ?? null,
      staff: author.isStaff,
      content,
    }),
  );
}

export async function createTicket(author: Author, input: { subject: string; category: Category; message: string }): Promise<Ticket> {
  const row: any = check(
    await supabaseAdmin()
      .from("tickets")
      .insert({
        subject: input.subject,
        category: input.category,
        author_id: author.id,
        author_name: author.name,
        author_avatar: author.avatar ?? null,
      })
      .select("id")
      .single(),
  );
  await insertMessage(row.id, author, input.message);
  return (await getTicket(row.id))!;
}

export async function addMessage(id: string, author: Author, content: string): Promise<Ticket | undefined> {
  if (!(await getTicket(id))) return undefined;
  await insertMessage(id, author, content);
  check(await supabaseAdmin().from("tickets").update({ updated_at: new Date().toISOString() }).eq("id", id));
  return getTicket(id);
}

export async function setStatus(id: string, status: TicketStatus): Promise<Ticket | undefined> {
  if (!UUID.test(id)) return undefined;
  check(await supabaseAdmin().from("tickets").update({ status, updated_at: new Date().toISOString() }).eq("id", id));
  return getTicket(id);
}

export async function deleteTicket(id: string): Promise<boolean> {
  if (!UUID.test(id)) return false;
  const rows = check(await supabaseAdmin().from("tickets").delete().eq("id", id).select("id"));
  return (rows ?? []).length > 0;
}
