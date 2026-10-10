"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaHandHoldingHeart, FaHome, FaTicketAlt, FaTimes } from "react-icons/fa";
import { SITE } from "../config/site";
import SignIn from "./SignIn";

const LINKS = [
  { href: "/", label: "Home", Icon: FaHome },
  { href: "/tickets", label: "Tickets", Icon: FaTicketAlt },
  { href: "/sponsor", label: "Sponsored Projects", Icon: FaHandHoldingHeart },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="nav-inner">
        <a href="/" className="nav-logo-link" aria-label={`${SITE.name} home`}>
          <img src="/logo.png" alt="" className="nav-logo" />
          {SITE.name}
        </a>

        <div id="nav-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <ul className="nav-links">
            {LINKS.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-pill ${pathname === href || (href !== "/" && pathname.startsWith(href + "/")) ? "is-active" : ""}`}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-spacer" />

        <div className="nav-end">
          <SignIn />
          <button
            type="button"
            className="nav-pill nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
