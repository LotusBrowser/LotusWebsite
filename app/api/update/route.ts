import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Update manifest for the Lotus desktop app:  GET /api/update
 *
 * There is no database or release API behind this. It is generated from the
 * folders in public/versions/<major.minor.patch>/Lotus.Installer.exe:
 *
 *   - the highest semantic version wins
 *   - sha256 + size are computed from the file itself
 *   - an optional notes.txt next to the exe becomes the "what's new" text
 *
 * `dynamic = "force-static"` makes Next run this once at build time, so the
 * installer is hashed per deploy (not per request) and the response is served
 * from the CDN. To release: add a new versions/<x.y.z>/ folder and deploy.
 */
export const dynamic = "force-static";

const VERSIONS_DIR = path.join(process.cwd(), "public", "versions");
const INSTALLER = "Lotus.Installer.exe";
const SEMVER = /^(\d+)\.(\d+)\.(\d+)$/;

function parse(v: string): [number, number, number] {
  const m = SEMVER.exec(v)!;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function compare(a: string, b: string): number {
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

export async function GET() {
  const entries = await readdir(VERSIONS_DIR, { withFileTypes: true });

  const candidates: string[] = [];
  for (const e of entries) {
    if (!e.isDirectory() || !SEMVER.test(e.name)) continue;
    try {
      await stat(path.join(VERSIONS_DIR, e.name, INSTALLER));
      candidates.push(e.name);
    } catch {
      // folder without an installer: not a release
    }
  }

  if (candidates.length === 0) {
    return NextResponse.json({ error: "No releases found" }, { status: 404 });
  }

  const version = candidates.sort(compare).at(-1)!;
  const exe = path.join(VERSIONS_DIR, version, INSTALLER);

  let notes: string | undefined;
  try {
    notes = (await readFile(path.join(VERSIONS_DIR, version, "notes.txt"), "utf8")).trim().slice(0, 500) || undefined;
  } catch {
    // notes are optional
  }

  const { size } = await stat(exe);

  return NextResponse.json(
    {
      version,
      // Relative on purpose: Lotus resolves it against the manifest URL and refuses
      // anything that isn't https://browselotus.net.
      url: `/versions/${version}/${INSTALLER}`,
      sha256: await sha256(exe),
      size,
      notes,
    },
    { headers: { "Cache-Control": "public, max-age=0, must-revalidate" } },
  );
}
