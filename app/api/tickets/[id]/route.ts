import { NextResponse } from "next/server";
import { getTicketUser } from "../../../../lib/ticketAuth";
import { addMessage, deleteTicket, getTicket, setStatus } from "../../../../lib/tickets";
import { LIMITS } from "../../../../lib/ticketTypes";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

// Load a ticket only if the caller is staff or its owner. Anyone else gets "not found".
async function loadAllowed(id: string) {
  const user = await getTicketUser();
  if (!user) return { error: fail("Sign in with Discord first.", 401) } as const;
  const ticket = await getTicket(id);
  if (!ticket || (!user.isStaff && ticket.authorId !== user.id)) return { error: fail("Ticket not found.", 404) } as const;
  return { user, ticket } as const;
}

export async function GET(_request: Request, { params }: Ctx) {
  const result = await loadAllowed((await params).id);
  if ("error" in result) return result.error;
  return NextResponse.json({ ticket: result.ticket });
}

// Actions: { action: "reply", content } | { action: "close" } | { action: "reopen" } (staff only)
export async function POST(request: Request, { params }: Ctx) {
  const { id } = await params;
  const result = await loadAllowed(id);
  if ("error" in result) return result.error;
  const { user, ticket } = result;

  const body = await request.json().catch(() => null);

  switch (body?.action) {
    case "reply": {
      const content = typeof body.content === "string" ? body.content.trim() : "";
      if (!content || content.length > LIMITS.message) return fail(`Reply is required (max ${LIMITS.message} characters).`, 400);
      if (ticket.status === "closed" && !user.isStaff) return fail("This ticket is closed.", 403);
      return NextResponse.json({ ticket: await addMessage(id, user, content) });
    }
    case "close":
      return NextResponse.json({ ticket: await setStatus(id, "closed") });
    case "reopen":
      if (!user.isStaff) return fail("Only staff can reopen tickets.", 403);
      return NextResponse.json({ ticket: await setStatus(id, "open") });
    default:
      return fail("Unknown action.", 400);
  }
}

// Staff only.
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const result = await loadAllowed(id);
  if ("error" in result) return result.error;
  if (!result.user.isStaff) return fail("Only staff can delete tickets.", 403);
  await deleteTicket(id);
  return NextResponse.json({ ok: true });
}
