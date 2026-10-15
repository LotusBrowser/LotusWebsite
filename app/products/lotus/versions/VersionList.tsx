"use client";

import { useEffect, useState } from "react";

type Release = {
  version: string;
  url: string;
  sha256: string;
  size: number;
  notes?: string;
  date: string;
};

type Manifest = { version: string; versions?: Release[] };

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function VersionList() {
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [latest, setLatest] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/update")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<Manifest>;
      })
      .then((data) => {
        if (cancelled) return;
        setLatest(data.version);
        setReleases(data.versions ?? []);
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="version-status">Couldn&apos;t load the release list right now. Please try again in a moment.</p>;
  }
  if (!releases) return <p className="version-status">Loading versions&hellip;</p>;
  if (releases.length === 0) return <p className="version-status">No releases are available yet.</p>;

  return (
    <ul className="version-list">
      {releases.map((release) => (
        <li className="version-item" key={release.version}>
          <div className="version-head">
            <h2 className="version-name">
              Lotus {release.version}
              {release.version === latest && <span className="version-badge">Latest</span>}
            </h2>
            <a className="btn-lotus btn-green version-download" href={release.url} download>
              Download
            </a>
          </div>
          <p className="version-meta">
            {[formatDate(release.date), formatSize(release.size)].filter(Boolean).join(" · ")}
          </p>
          {release.notes && <p className="version-notes">{release.notes}</p>}
          <details className="version-hash">
            <summary>SHA-256</summary>
            <code>{release.sha256}</code>
          </details>
        </li>
      ))}
    </ul>
  );
}
