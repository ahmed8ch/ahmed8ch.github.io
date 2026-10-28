"use client";

import { useEffect, useState } from "react";
import { cvData } from "@/data/cv";
import { ArchiveBar } from "./archive-bar";
import { FieldNotes } from "./field-notes";
import { Hero } from "./hero-bento";
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  CloseIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MoonIcon,
  PrinterIcon,
  SunIcon,
} from "./icons";
import { PrintCV } from "./print-cv";
import { TrackRecord } from "./track-record";
import { WorkExplorer } from "./work-explorer";

type Theme = "light" | "dark";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Field notes", href: "#notes" },
  { label: "Record", href: "#record" },
  { label: "Contact", href: "#contact" },
] as const;

export function V4Portfolio() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("icareer-v34-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("icareer-v34-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections: Array<{ href: string; element: HTMLElement }> = [];
    for (const item of navItems) {
      const element = document.querySelector<HTMLElement>(item.href);
      if (element) sections.push({ href: item.href, element });
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 220);
      let current = "";
      for (const section of sections) {
        const top = section.element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = section.href;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = "#contact";
      }
      setActiveHref((previous) => (previous === current ? previous : current));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="v4-shell" data-theme={theme} id="top">
      <div className="v4-screen">
        <a className="v4-skip" href="#work">
          Skip to shipped work
        </a>

        <header className="v4-header">
          <div className="v4-header-inner">
            <a aria-label="Ahmed Hesham Lotfy, back to top" className="v4-brand" href="#top">
              <span className="v4-brand-mark" />
              <span>ahmed8ch</span>
              <span className="v4-brand-meta">/ v3.4</span>
            </a>

            <nav aria-label="Primary navigation" className="v4-nav">
              {navItems.map((item) => (
                <a
                  aria-current={item.href === activeHref ? "location" : undefined}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="v4-header-actions">
              <button
                aria-label="Print or export CV"
                className="v4-header-button v4-print-trigger"
                onClick={() => window.print()}
                type="button"
              >
                <PrinterIcon size={15} />
                <span>Print / Export CV</span>
              </button>
              <button
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-pressed={theme === "dark"}
                className="v4-theme-toggle"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                type="button"
              >
                {theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
              </button>
              <button
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="v4-menu-button"
                onClick={() => setMenuOpen((current) => !current)}
                type="button"
              >
                {menuOpen ? <CloseIcon size={17} /> : <MenuIcon size={17} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav aria-label="Mobile navigation" className="v4-mobile-nav">
              {navItems.map((item, index) => (
                <a
                  aria-current={item.href === activeHref ? "location" : undefined}
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                  <ArrowUpRightIcon size={14} />
                </a>
              ))}
              <div className="v4-mobile-meta">
                <span>Giza, Egypt</span>
                <span>Portfolio / V3.4</span>
              </div>
            </nav>
          )}
        </header>

        <main>
          <div className="v4-wrap">
            <Hero />
            <WorkExplorer />
            <FieldNotes />
            <TrackRecord />

            <section aria-labelledby="v4-contact-title" className="v4-section v4-contact" id="contact">
              <div className="v4-contact-copy">
                <span className="v4-kicker">04 / contact</span>
                <h2 id="v4-contact-title">
                  Let&apos;s build something
                  <br />
                  <em>worth opening twice.</em>
                </h2>
                <p>
                  Have a product, an interface, or a knotty frontend problem in mind? I&apos;d like
                  to hear what you are making and where the friction sits.
                </p>
                <a className="v4-button is-solid" href={`mailto:${cvData.contact.email}`}>
                  Start a conversation
                  <MailIcon size={15} />
                </a>
                <span className="v4-contact-location">
                  <MapPinIcon size={14} />
                  {cvData.contact.location} / open to remote or hybrid
                </span>
              </div>

              <div className="v4-contact-list" aria-label="Direct contact links">
                <a href={`mailto:${cvData.contact.email}`}>
                  <span>Email</span>
                  <strong>{cvData.contact.email}</strong>
                  <ArrowUpRightIcon size={14} />
                </a>
                <a href={`tel:${cvData.contact.phone.replaceAll(" ", "")}`}>
                  <span>Phone</span>
                  <strong>{cvData.contact.phone}</strong>
                  <ArrowUpRightIcon size={14} />
                </a>
                <a href={cvData.contact.linkedin} rel="noreferrer" target="_blank">
                  <span>LinkedIn</span>
                  <strong>in/ahmed-hesham-8h</strong>
                  <ArrowUpRightIcon size={14} />
                </a>
                <a href={cvData.contact.github} rel="noreferrer" target="_blank">
                  <span>GitHub</span>
                  <strong>@ahmed8ch</strong>
                  <ArrowUpRightIcon size={14} />
                </a>
              </div>
            </section>
          </div>
        </main>

        <footer className="v4-footer">
          <div className="v4-wrap">
            <ArchiveBar />
            <div className="v4-footer-line">
              <span>© {new Date().getFullYear()} Ahmed Hesham Lotfy</span>
              <span>Software developer / Giza, Egypt</span>
              <a href="#top">
                Back to top
                <ArrowUpIcon size={13} />
              </a>
            </div>
          </div>
        </footer>
      </div>

      <PrintCV />
    </div>
  );
}
