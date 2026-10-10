import { NextResponse } from "next/server";
import { getTicketUser } from "../../../lib/ticketAuth";
import { countOpenByOwner, createTicket, listTickets } from "../../../lib/tickets";
import { CATEGORIES, LIMITS, type Category } from "../../../lib/ticketTypes";

export const dynamic = "force-dynamic";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

// Staff see every ticket; everyone else sees only their own.
export async function GET() {
  const user = await getTicketUser();
  if (!user) return fail("Sign in with Discord first.", 401);
  const tickets = await listTickets(user.isStaff ? {} : { ownerId: user.id });
  return NextResponse.json({ tickets });
}

// Anyone signed in can open a ticket.
export async function POST(request: Request) {
  const user = await getTicketUser();
  if (!user) return fail("Sign in with Discord first.", 401);

  const body = await request.json().catch(() => null);
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const category = body?.category as Category;

  if (!subject || subject.length > LIMITS.subject) return fail(`Subject is required (max ${LIMITS.subject} characters).`, 400);
  if (!message || message.length > LIMITS.message) return fail(`Message is required (max ${LIMITS.message} characters).`, 400);
  if (!CATEGORIES.includes(category)) return fail("Pick a valid category.", 400);

  if (!user.isStaff && (await countOpenByOwner(user.id)) >= LIMITS.maxOpenPerUser) {
    return fail(`You already have ${LIMITS.maxOpenPerUser} open tickets. Close one before opening another.`, 429);
  }

  const ticket = await createTicket(user, { subject, category, message });
  return NextResponse.json({ ticket }, { status: 201 });
}
