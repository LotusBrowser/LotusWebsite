import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ADMIN_GUILD_ID, ADMIN_ROLE_ID } from "../../../lib/adminAuth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const cookieStore = await cookies();
  const response = NextResponse.redirect(new URL("/", url.origin));

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
  let isAdmin = false;

  if (session.provider_token) {
    const memberResponse = await fetch(
      `https://discord.com/api/v10/users/@me/guilds/${ADMIN_GUILD_ID}/member`,
      {
        headers: { Authorization: `Bearer ${session.provider_token}` },
        cache: "no-store",
      },
    );

    if (memberResponse.ok) {
      const member = await memberResponse.json();
      isAdmin = Array.isArray(member.roles) && member.roles.includes(ADMIN_ROLE_ID);
    }
  }

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { cookies: { getAll: () => [], setAll: () => undefined } },
    );

    await adminClient.auth.admin.updateUserById(discordUser.id, {
      app_metadata: {
        ...discordUser.app_metadata,
        is_admin: isAdmin,
        discord_guild_id: ADMIN_GUILD_ID,
        discord_role_id: ADMIN_ROLE_ID,
      },
    });
  }

  return response;
}
