"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../config/site";

export default function Footer() {
  const contentRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [full, setFull] = useState(0);
  const [reveal, setReveal] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Scroll-driven reveal
  const update = useCallback(() => {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const next = window.scrollY - (maxScroll - fullRef.current);
    setReveal(Math.round(Math.min(Math.max(next, 0), fullRef.current)));
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      fullRef.current = el.scrollHeight;
      setFull(el.scrollHeight);
      document.documentElement.style.setProperty("--footer-full-h", `${el.scrollHeight}px`);
      update();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => setDismissed(false), [reveal]);

  const height = pinned ? full : dismissed ? 0 : reveal;
  const open = height >= full && full > 0;

  const toggle = () => {
    setAnimate(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnimate(false), 400);
    if (open) {
      setPinned(false);
      if (reveal > 0) setDismissed(true);
    } else {
      setPinned(true);
    }
  };

  return (
    <footer className="site-footer">
      <button
        type="button"
        className="footer-bricks"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="footer-panel"
        aria-label={open ? "Collapse footer" : "Expand footer"}
      />
      <div
        id="footer-panel"
        className={`footer-panel${animate ? " is-animating" : ""}`}
        style={{ height }}
        inert={height <= 0}
      >
        <div ref={contentRef} className="footer-inner">
          <div className="legal-links">
            <a href="/products/lotus">Lotus Browser</a>·<a href="/products/sysinfo">SysInfo</a>·
            <a href="/privacy">Privacy Policy</a>·<a href="/terms">Terms of Service</a>·<a href="/license">Software License</a>·
            <a href={SITE.discordUrl} target="_blank" rel="noopener noreferrer">Lotus Discord</a>·
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <p>© 2026 {SITE.name}. <a href={SITE.licenseUrl} target="_blank" rel="noopener noreferrer">Source-Available License</a></p>
        </div>
      </div>
    </footer>
  );
}