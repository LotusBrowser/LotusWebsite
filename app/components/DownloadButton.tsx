"use client";

import { PRODUCTS } from "../config/site";

type Props = {
  url?: string;
  thankYouHref?: string;
  label?: string;
};

export default function DownloadButton({
  url = PRODUCTS.lotus.downloadUrl,
  thankYouHref = "/thank-you",
  label = "Download for Windows",
}: Props) {
  return (
    <a
      className="btn-lotus btn-green"
      href={url}
      download
      onClick={() => {
        window.setTimeout(() => {
          window.location.href = thankYouHref;
        }, 600);
      }}
    >
      <img src="/logo.png" alt="" />
      {label}
    </a>
  );
}
