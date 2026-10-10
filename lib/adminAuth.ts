import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const ADMIN_GUILD_ID = "929222478537056316";
export const ADMIN_ROLE_ID = "1548339923537494037";

export type AdminState = "admin" | "forbidden" | "signed-out";

export async function getAdminState(): Promise<AdminState> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return "signed-out";

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
  if (error || !data.user) return "signed-out";

  const meta = data.user.app_metadata ?? {};
  const allowed =
    meta.is_admin === true &&
    meta.discord_guild_id === ADMIN_GUILD_ID &&
    meta.discord_role_id === ADMIN_ROLE_ID;

  return allowed ? "admin" : "forbidden";
}
