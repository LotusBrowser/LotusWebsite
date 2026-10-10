export const metadata = { title: "Sponsored Projects - Lotus" };

export default function SponsorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <header className="page-card mb-8 text-center">
        <h1 className="display-title">Sponsored Projects</h1>
        <p className="lead mt-3">
          Projects that the Developer of Lotus is a sponsor of.{" "}
          <b>Projects are not affiliated with Lotus, and the Developer of Lotus does not receive any revenue from them.</b>
        </p>
      </header>

      <section className="page-card project-card">
        <img
          className="icon"
          src="https://cdn.discordapp.com/icons/1375493762549157898/ed11c11980807420911bd729b933387d.webp?size=1024"
          alt=""
        />
        <h2 className="section-title">Clash of Power</h2>
        <p className="lead mt-2">Clash of Power is a Dragon Ball Z-inspired role-playing Discord server.</p>
        <div className="links">
          <a href="https://discord.gg/YmyjvGTAkz" target="_blank" rel="noopener noreferrer">Clash of Power - Discord</a>
        </div>
      </section>
    </div>
  );
}
