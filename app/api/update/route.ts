import { NextResponse } from "next/server";
import { getReleases } from "../../../lib/releases";

/**
 * Update manifest for the Lotus desktop app:  GET /api/update
 *
 * There is no database or release API behind this. It is generated from the
 * folders in public/versions/<major.minor.patch>/Lotus.Installer.exe (see
 * lib/releases.ts):
 *
 *   - the top-level fields describe the highest semantic version, exactly as the
 *     desktop app expects: { version, url, sha256, size, notes }
 *   - `versions` lists every release, newest first, for the previous versions page
 *
 * `dynamic = "force-static"` makes Next run this once at build time, so the
 * installers are hashed per deploy (not per request) and the response is served
 * from the CDN. To release: add a new versions/<x.y.z>/ folder and deploy.
 */
export const dynamic = "force-static";

export async function GET() {
  const releases = await getReleases();

  if (releases.length === 0) {
    return NextResponse.json({ error: "No releases found" }, { status: 404 });
  }

  const [latest] = releases;

  return NextResponse.json(
    {
      version: latest.version,
      url: latest.url,
      sha256: latest.sha256,
      size: latest.size,
      notes: latest.notes,
      versions: releases,
    },
    { headers: { "Cache-Control": "public, max-age=0, must-revalidate" } },
  );
}
