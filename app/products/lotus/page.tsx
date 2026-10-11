import { DownloadButton } from "../../components";
import { SITE, PRODUCTS } from "../../config/site";

const svgProps = { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

const FEATURES = [
  {
    title: "Tabs that stay organized",
    text: "Drag to reorder tabs, and every link opens in the window you already have - Lotus never spawns a second copy of itself.",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="6" width="7" height="5" rx="1.5" />
        <rect x="11" y="6" width="7" height="5" rx="1.5" />
        <path d="M3 15h18" />
      </svg>
    ),
  },
  {
    title: "Search without the tracking",
    text: "The address bar and new tab page search with DuckDuckGo, and known tracker domains are blocked automatically wherever you browse.",
    icon: (
      <svg {...svgProps}>
        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    title: "Downloads shelf",
    text: "Files land in a Chrome-style shelf at the bottom of the window, with live progress instead of a popup.",
    icon: (
      <svg {...svgProps}>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 19h16" />
      </svg>
    ),
  },
  {
    title: "Bookmarks & history",
    text: "Star a page to pin it to the bookmarks bar, and jump back to anything you've visited from a searchable history panel.",
    icon: (
      <svg {...svgProps}>
        <path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
      </svg>
    ),
  },
  {
    title: "Find in page & zoom",
    text: "Search text on the current page, zoom in or out, and reach view-source or dev tools when you need them.",
    icon: (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Set it as your default",
    text: "Register Lotus as a browser option in Windows settings, and it'll ask for permission before a site can use your camera, mic or location.",
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    ),
  },
];

export const metadata = {
  title: "Lotus Browser - Lotus",
  description: "Lotus Browser is a fast, quiet browser for Windows - tabs, bookmarks and downloads, without the clutter.",
};

const BROWSER_TAGLINE =
  "Lotus Browser is a fast, quiet browser for Windows - tabs, bookmarks and downloads, without the clutter. Searches run on DuckDuckGo, so they aren't tracked back to you.";

export default function LotusBrowserPage() {
  return (
    <div>
      <header className="hero">
        <h1 className="hero-title">
          A browser that stays out
          <br />
          of your way.
        </h1>
        <p className="hero-tagline">{BROWSER_TAGLINE}</p>
        <div className="hero-divider" />

        <div className="screenshot-stack">
          <div className="screenshot-frame back">
            <img
              src="/assets/screenshot-settings.png"
              alt="Lotus Browser settings page showing bookmarks bar, tracker blocking, HTTPS-only mode and pop-up blocking toggles"
            />
          </div>
          <div className="screenshot-frame front">
            <img
              src="/assets/screenshot-newtab.png"
              alt="Lotus Browser new tab page with the DuckDuckGo-powered search box"
            />
          </div>
        </div>
        <p className="screenshot-caption">New tab search and privacy settings, both built in</p>
      </header>

      <section className="cta" id="download">
        <DownloadButton url={PRODUCTS.lotus.downloadUrl} />
        <p className="fine-print">
          Free · Windows 10 &amp; 11 ·{" "}
          <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">The Update Notes are in Our Discord</a>
        </p>
        <p className="fine-print">
          By downloading, you agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>

      <section className="feature-grid" aria-label="Features">
        {FEATURES.map((feature) => (
          <div className="feature-card" key={feature.title}>
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
