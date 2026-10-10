import { supabase } from "./supabase";

/** Starts Discord sign-in and returns the visitor to `next` (a site path) afterwards. */
export async function signInWithDiscord(next: string = "/") {
  if (next.startsWith("/") && !next.startsWith("//")) {
    document.cookie = `lotus_next=${encodeURIComponent(next)}; path=/; max-age=600; samesite=lax`;
  }
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: "identify guilds guilds.members.read",
    },
  });
}
