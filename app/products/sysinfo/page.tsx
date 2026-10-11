import { SITE, PRODUCTS } from "../../config/site";

export const metadata = {
  title: "SysInfo by Lotus - Lotus",
  description: "Share your exact system specs with friends, easily. SysInfo builds a clean, shareable report of your hardware and OS.",
};

const svgProps = { className: "icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

const FEATURES = [
  {
    title: "The full hardware picture",
    text: "CPU, RAM modules and speeds, storage, GPU, displays, motherboard, BIOS/UEFI, network adapters, battery, audio and USB devices.",
    icon: (
      <svg {...svgProps}>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
      </svg>
    ),
  },
  {
    title: "Privacy filter built in",
    text: "Your computer name, username, domain, user profile path and MAC addresses are removed before the report is written.",
    icon: (
      <svg {...svgProps}>
        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    title: "Share with one flag",
    text: "Add -s to upload the report and get a short link, copied to your clipboard. Shared reports are kept for 30 days.",
    icon: (
      <svg {...svgProps}>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" />
      </svg>
    ),
  },
  {
    title: "Secure Boot and TPM",
    text: "Platform security status is included too. Run it as Administrator on Windows for the most complete results.",
    icon: (
      <svg {...svgProps}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    title: "Markdown reports",
    text: "Reports save as a .md file next to the program, ready to read in any editor or paste into Discord or a forum.",
    icon: (
      <svg {...svgProps}>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: "Nothing to install",
    text: "A single self-contained file for Windows x64 and Linux x64. The Windows build has the full feature set; Linux is reduced.",
    icon: (
      <svg {...svgProps}>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M4 19h16" />
      </svg>
    ),
  },
];

export default function SysInfoPage() {
  return (
    <div>
      <header className="hero">
        <p className="eyebrow">SysInfo by Lotus</p>
        <h1 className="hero-title">
          Share your exact specs,
          <br />
          easily.
        </h1>
        <p className="hero-tagline">{PRODUCTS.sysinfo.blurb}</p>
        <div className="hero-divider" />
      </header>

      <section className="cta" id="download">
        <a className="btn-lotus btn-green" href={PRODUCTS.sysinfo.downloadUrl} target="_blank" rel="noopener noreferrer">
          <img src="/logo.png" alt="" />
          Download SysInfo
        </a>
        <p className="fine-print">
          Free · Windows x64 &amp; Linux x64 ·{" "}
          <a href={PRODUCTS.sysinfo.sourceUrl} target="_blank" rel="noopener noreferrer">Source-available on GitHub</a>
        </p>
        <p className="fine-print">
          By downloading, you agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.{" "}
          <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">Questions? Ask in our Discord</a>
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

      <section className="page-card usage-card" aria-labelledby="usage-title">
        <h2 className="section-title" id="usage-title">How it works</h2>
        <p className="lead mt-2">Run it, and a Markdown report appears next to the program. Add a flag to get a link too.</p>
        <div className="code-block">
          <p><span className="code-note">Save a local report</span></p>
          <code>SysInfo.exe</code>
          <p><span className="code-note">Save a report and get a shareable link</span></p>
          <code>SysInfo.exe -s</code>
        </div>
        <p className="fine-print">
          Shared links are unlisted but open to anyone who has them. The privacy filter removes only the identifiers listed above, so look over a report before you share it.
        </p>
      </section>
    </div>
  );
}
