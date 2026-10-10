"use client";

import { SITE } from "../config/site";

// Lets the browser start the .exe download (native `download` behavior),
// then carries the visitor to the thank-you page where the lotus blooms.
export default function DownloadButton() {
  return (
    <a
      className="btn-lotus btn-green"
      href={SITE.downloadUrl}
      download
      onClick={() => {
        window.setTimeout(() => {
          window.location.href = "/thank-you";
        }, 600);
      }}
    >
      <img src="/logo.png" alt="" />
      Download for Windows
    </a>
  );
}
