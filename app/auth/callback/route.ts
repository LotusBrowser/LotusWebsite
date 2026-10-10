import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { DISCORD_GUILD_ID, TICKET_STAFF_ROLE_ID } from "../../../lib/ticketAuth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const cookieStore = await cookies();

  // Where to send the visitor afterwards (set by signInWithDiscord); same-site paths only.
  const requested = decodeURIComponent(cookieStore.get("lotus_next")?.value ?? "/");
  const next = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  const response = NextResponse.redirect(new URL(next, url.origin));
  response.cookies.set("lotus_next", "", { path: "/", maxAge: 0 });

  if (!code) return response;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !authData.session?.user) {
    return NextResponse.redirect(new URL("/?auth=error", url.origin));
  }

  const session = authData.session;
  const discordUser = session.user;
  let isStaff = false;

  // Look up the member's roles in the Lotus Discord server with their own login token.
  if (session.provider_token) {
    const memberResponse = await fetch(
      `https://discord.com/api/v10/users/@me/guilds/${DISCORD_GUILD_ID}/member`,
      { headers: { Authorization: `Bearer ${session.provider_token}` }, cache: "no-store" },
    );

    if (memberResponse.ok) {
      const member = await memberResponse.json();
      isStaff = Array.isArray(member.roles) && member.roles.includes(TICKET_STAFF_ROLE_ID);
    }
  }

  // Record the result on the account (needs SUPABASE_SERVICE_ROLE_KEY).
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { cookies: { getAll: () => [], setAll: () => undefined } },
    );

    await adminClient.auth.admin.updateUserById(discordUser.id, {
      app_metadata: {
        ...discordUser.app_metadata,
        is_ticket_staff: isStaff,
        discord_guild_id: DISCORD_GUILD_ID,
        discord_role_id: TICKET_STAFF_ROLE_ID,
      },
    });
  }

  return response;
}
