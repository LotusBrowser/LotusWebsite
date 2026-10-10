import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>·<a href="/terms">Terms of Service</a>·
          <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">Lotus Discord</a>·
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">GitHub Source</a>
        </div>
        <p>{SITE.name} created with ❤ by {SITE.creator}</p>
      </div>
    </footer>
  );
}
