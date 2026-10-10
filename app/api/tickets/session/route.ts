import { NextResponse } from "next/server";
import { getTicketUser } from "../../../../lib/ticketAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ user: await getTicketUser() });
}
