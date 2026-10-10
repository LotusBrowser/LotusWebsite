"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FaDiscord } from "react-icons/fa";

export default function SignIn() {
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ? { name: data.user.user_metadata?.full_name ?? data.user.email ?? "Discord member", avatar: data.user.user_metadata?.avatar_url } : null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ? { name: session.user.user_metadata?.full_name ?? session.user.email ?? "Discord member", avatar: session.user.user_metadata?.avatar_url } : null));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn() {
    await supabase.auth.signInWithOAuth({ provider: "discord", options: { redirectTo: `${window.location.origin}/auth/callback`, scopes: "identify guilds guilds.members.read" } });
  }

  async function signOut() { await supabase.auth.signOut(); }

  return user ? (
    <div className="user-chip">
      <img src={user.avatar ?? "/logo.png"} alt="" className="user-avatar" />
      <span className="user-name">{user.name}</span>
      <button className="nav-pill" onClick={signOut}>Sign out</button>
    </div>
  ) : (
    <button className="discord-login" onClick={signIn} aria-label="Login with Discord">
      <span className="discord-mark" aria-hidden="true"><FaDiscord /></span>
      <span className="login-label">Sign in</span>
    </button>
  );
}
