import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Release discovery for the Lotus desktop app. Everything is derived from
 * public/versions/<major.minor.patch>/Lotus.Installer.exe, so releasing is just
 * adding a folder (plus an optional notes.txt) and deploying.
 */
const VERSIONS_DIR = path.join(process.cwd(), "public", "versions");
export const INSTALLER = "Lotus.Installer.exe";
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

export type Release = {
  version: string;
  /** Relative on purpose: Lotus refuses anything that isn't https://browselotus.net. */
  url: string;
  sha256: string;
  size: number;
  notes?: string;
  /** Last-modified time of the installer, ISO 8601. */
  date: string;
};

function parse(v: string): [number, number, number] {
  const m = SEMVER.exec(v)!;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

export function compareVersions(a: string, b: string): number {
  const x = parse(a);
  const y = parse(b);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
}

function sha256(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    createReadStream(file)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolve(hash.digest("hex")))
      .on("error", reject);
  });
}

export function installerUrl(version: string): string {
  return `/versions/${version}/${INSTALLER}`;
}

/** All releases, newest first. Empty if there are none. */
export async function getReleases(): Promise<Release[]> {
  let entries;
  try {
    entries = await readdir(VERSIONS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const releases: Release[] = [];
  for (const e of entries) {
    if (!e.isDirectory() || !SEMVER.test(e.name)) continue;
    const dir = path.join(VERSIONS_DIR, e.name);
    const exe = path.join(dir, INSTALLER);

    let info;
    try {
      info = await stat(exe);
    } catch {
      continue; // folder without an installer: not a release
    }

    let notes: string | undefined;
    try {
      notes = (await readFile(path.join(dir, "notes.txt"), "utf8")).trim().slice(0, 500) || undefined;
    } catch {
      // notes are optional
    }

    releases.push({
      version: e.name,
      url: installerUrl(e.name),
      sha256: await sha256(exe),
      size: info.size,
      notes,
      date: info.mtime.toISOString(),
    });
  }

  return releases.sort((a, b) => compareVersions(b.version, a.version));
}

export async function getLatestRelease(): Promise<Release | undefined> {
  return (await getReleases())[0];
}
