// File-backed ticket store (data/tickets.json) with an in-memory fallback.
// All writes go through a lock so concurrent requests can't clobber each other.
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Category, Ticket, TicketMessage, TicketStatus, TicketSummary } from "./ticketTypes";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "tickets.json");

let memory: Ticket[] | null = null;
let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.then(() => undefined, () => undefined);
  return run;
}

async function load(): Promise<Ticket[]> {
  if (memory) return memory;
  try {
    const parsed = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    memory = Array.isArray(parsed) ? parsed : [];
  } catch {
    memory = [];
  }
  return memory;
}

async function save(tickets: Ticket[]) {
  memory = tickets;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), "utf-8");
  } catch (error) {
    console.error("tickets: could not write data/tickets.json, keeping in memory only", error);
  }
}

const summarize = ({ messages, ...rest }: Ticket): TicketSummary => ({ ...rest, messageCount: messages.length });

export async function listTickets(opts: { ownerId?: string } = {}): Promise<TicketSummary[]> {
  const all = await load();
  return all
    .filter((t) => !opts.ownerId || t.authorId === opts.ownerId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map(summarize);
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  return (await load()).find((t) => t.id === id);
}

export async function countOpenByOwner(ownerId: string): Promise<number> {
  return (await load()).filter((t) => t.authorId === ownerId && t.status === "open").length;
}

type Author = { id: string; name: string; avatar?: string; isStaff: boolean };

const makeMessage = (author: Author, content: string): TicketMessage => ({
  id: randomUUID(),
  authorId: author.id,
  authorName: author.name,
  authorAvatar: author.avatar,
  staff: author.isStaff,
  content,
  createdAt: new Date().toISOString(),
});

export function createTicket(author: Author, input: { subject: string; category: Category; message: string }) {
  return withLock(async () => {
    const all = await load();
    const now = new Date().toISOString();
    const ticket: Ticket = {
      id: randomUUID(),
      subject: input.subject,
      category: input.category,
      status: "open",
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      createdAt: now,
      updatedAt: now,
      messages: [makeMessage(author, input.message)],
    };
    await save([...all, ticket]);
    return ticket;
  });
}

export function addMessage(id: string, author: Author, content: string) {
  return withLock(async () => {
    const all = await load();
    const ticket = all.find((t) => t.id === id);
    if (!ticket) return undefined;
    ticket.messages.push(makeMessage(author, content));
    ticket.updatedAt = new Date().toISOString();
    await save(all);
    return ticket;
  });
}

export function setStatus(id: string, status: TicketStatus) {
  return withLock(async () => {
    const all = await load();
    const ticket = all.find((t) => t.id === id);
    if (!ticket) return undefined;
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    await save(all);
    return ticket;
  });
}

export function deleteTicket(id: string) {
  return withLock(async () => {
    const all = await load();
    if (!all.some((t) => t.id === id)) return false;
    await save(all.filter((t) => t.id !== id));
    return true;
  });
}
