"use client";

import { FaDiscord } from "react-icons/fa";
import { signInWithDiscord } from "../../lib/discordAuth";

export default function SignInCard({ next }: { next: string }) {
  return (
    <section className="page-card text-center">
      <h2 className="section-title">Sign in to continue</h2>
      <p className="lead mt-3">Tickets use your Discord account, so we know who to reply to.</p>
      <div className="mt-6 flex justify-center">
        <button type="button" className="btn-lotus btn-green" onClick={() => signInWithDiscord(next)}>
          <FaDiscord aria-hidden="true" /> Sign in with Discord
        </button>
      </div>
    </section>
  );
}
