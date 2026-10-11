"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaBoxOpen, FaChevronDown, FaDesktop, FaGlobe, FaHandHoldingHeart, FaHome, FaTicketAlt, FaTimes } from "react-icons/fa";
import type { IconType } from "react-icons";
import { PRODUCT_LIST, SITE } from "../config/site";
import SignIn from "./SignIn";

const LINKS_BEFORE = [{ href: "/", label: "Home", Icon: FaHome }];

const LINKS_AFTER = [
  { href: "/tickets", label: "Tickets", Icon: FaTicketAlt },
  { href: "/sponsor", label: "Sponsored Projects", Icon: FaHandHoldingHeart },
];

const PRODUCT_ICONS: Record<string, IconType> = {
  lotus: FaGlobe,
  sysinfo: FaDesktop,
};

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !productsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setProductsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, productsOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [productsOpen]);

  const canHover = () => window.matchMedia("(min-width: 768px) and (hover: hover)").matches;
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  const productsActive = pathname.startsWith("/products");

  const renderLink = ({ href, label, Icon }: { href: string; label: string; Icon: IconType }) => (
    <li key={href}>
      <a
        href={href}
        className={`nav-pill ${isActive(href) ? "is-active" : ""}`}
        aria-current={pathname === href ? "page" : undefined}
      >
        <Icon aria-hidden="true" />
        {label}
      </a>
    </li>
  );

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="nav-inner">
        <a href="/" className="nav-logo-link" aria-label={`${SITE.name} home`}>
          <img src="/logo.png" alt="" className="nav-logo" />
          {SITE.name}
        </a>

        <div id="nav-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <ul className="nav-links">
            {LINKS_BEFORE.map(renderLink)}

            <li
              ref={dropdownRef}
              className={`nav-dropdown ${productsOpen ? "is-open" : ""}`}
              onMouseEnter={() => canHover() && setProductsOpen(true)}
              onMouseLeave={() => canHover() && setProductsOpen(false)}
            >
              <button
                type="button"
                className={`nav-pill ${productsActive ? "is-active" : ""}`}
                aria-expanded={productsOpen}
                aria-controls="products-menu"
                onClick={() => setProductsOpen((value) => !value)}
              >
                <FaBoxOpen aria-hidden="true" />
                Products
                <FaChevronDown className="nav-caret" aria-hidden="true" />
              </button>

              <div id="products-menu" className="dropdown-panel">
                <ul className="dropdown-list">
                  {PRODUCT_LIST.map((product) => {
                    const Icon = PRODUCT_ICONS[product.slug] ?? FaBoxOpen;
                    return (
                      <li key={product.slug}>
                        <a
                          href={product.href}
                          className={`dropdown-item ${isActive(product.href) ? "is-active" : ""}`}
                          aria-current={pathname === product.href ? "page" : undefined}
                        >
                          <span className="dropdown-icon"><Icon aria-hidden="true" /></span>
                          <span className="dropdown-text">
                            <span className="dropdown-name">{product.name}</span>
                            <span className="dropdown-desc">{product.shortBlurb}</span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            {LINKS_AFTER.map(renderLink)}
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
