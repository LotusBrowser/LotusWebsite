import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { TicketUser } from "./ticketTypes";

// Anyone with this Discord role (in the guild below) gets the full ticket panel.
export const TICKET_STAFF_ROLE_ID = "1548339923537494037";
// The Discord server the role lives in. Override with DISCORD_GUILD_ID in your env.
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "929222478537056316";

/** Returns the signed-in Discord user (verified with Supabase), or null. */
export async function getTicketUser(): Promise<TicketUser | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {}
      },
    },
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const meta = user.user_metadata ?? {};
  const app = user.app_metadata ?? {};
  const isStaff =
    app.is_ticket_staff === true &&
    app.discord_guild_id === DISCORD_GUILD_ID &&
    app.discord_role_id === TICKET_STAFF_ROLE_ID;

  return {
    id: user.id,
    name: meta.custom_claims?.global_name ?? meta.full_name ?? meta.name ?? user.email ?? "Discord member",
    avatar: meta.avatar_url,
    isStaff,
  };
}
