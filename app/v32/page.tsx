"use client";

import { ArrowUpRight, CalendarDays, Code2, Mail, MapPin, Moon, Phone, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cvData } from "@/data/cv";
import { FloatingMenu } from "@/components/ui/floating-menu";
import { MagneticFilings } from "@/components/ui/magnetic-filings";
import { PortfolioBrandLink } from "@/components/ui/portfolio-brand-link";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { versionLinks } from "@/data/version-links";

type Theme = "dark" | "light";

const menuItems = [
  { label: "Work", href: "#work" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
] as const;

const fieldNotes = [
  "interfaces should feel obvious before they feel clever",
  "small details are still product decisions",
  "currently moving from Flutter into React",
] as const;

export default function V32Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeProject, setActiveProject] = useState(cvData.projects[0]?.slug ?? "");
  const [noteIndex, setNoteIndex] = useState(0);
  const [today, setToday] = useState("");
  const project = useMemo(
    () => cvData.projects.find((item) => item.slug === activeProject) ?? cvData.projects[0],
    [activeProject],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("icareer-v32-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    setToday(new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date()));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("icareer-v32-theme", theme);
  }, [theme]);

  return (
    <main className={`v32-shell ${theme}`}>
      <GreatFloatingMenu links={versionLinks} current="V3.2" />
      {/* THESIS: an open notebook for product-minded engineering, not a public CV. OWN-WORLD: zinc paper, red-pencil signal, ruled lines. STORY: meet Ahmed Hesham, inspect three real builds, then start a conversation. FIRST VIEWPORT: compact wordmark, one sentence, one proof strip, one clear work action. FORM: editorial notebook with a tactile field-note interaction. */}
      <MagneticFilings theme={theme} />
      <a className="v32-skip" href="#work">Skip to work</a>
      <header className="v32-header">
        <a className="v32-wordmark" href="#top"><span className="v32-monogram">AH</span><span>Ahmed Hesham</span></a>
        <nav className="v32-desktop-nav" aria-label="Primary navigation">
          {menuItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="v32-header-actions">
          <div className="v32-header-socials">
            <PortfolioBrandLink brand="linkedin" href={cvData.contact.linkedin} label="LinkedIn" />
            <PortfolioBrandLink brand="github" href={cvData.contact.github} label="GitHub" />
          </div>
          <button type="button" className="v32-theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
      <FloatingMenu items={menuItems} className="v32-floating-menu" triggerClassName="v32-floating-trigger" navClassName="v32-floating-nav" />

      <div className="v32-wrap" id="top">
        <section className="v32-opening">
          <div className="v32-opening-copy">
            <span className="v32-kicker"><i /> software developer · Giza, Egypt</span>
            <h1>I make useful things<br /><em>feel considered.</em></h1>
            <p>I build mobile and web interfaces with a product eye — clear flows, real APIs, and enough personality to be remembered.</p>
            <a className="v32-cta" href="#work">See what I&apos;ve shipped <ArrowUpRight size={15} /></a>
          </div>
          <aside className="v32-margin-note">
            <span>01 / hello</span>
            <strong>Ahmed<br />Hesham</strong>
            <p>Developer, visual thinker, and occasional over-polisher of tiny interface details.</p>
            <div className="v32-date"><CalendarDays size={14} /><span>today</span><strong>{today || "loading…"}</strong></div>
          </aside>
        </section>

        <section className="v32-proof-strip" aria-label="Current focus">
          <span>currently</span>
          <strong>Flutter → React</strong>
          <span>3 shipped builds · learning in public</span>
          <span className="v32-proof-location"><MapPin size={13} /> open to remote frontend roles</span>
        </section>

        <section className="v32-section" id="work">
          <div className="v32-section-heading">
            <span className="v32-kicker">selected work</span>
            <h2>Things I&apos;ve shipped<br /><em>and learned from.</em></h2>
            <p>Three projects, three different lessons. Choose one and stay awhile.</p>
          </div>
          <div className="v32-work">
            <div className="v32-project-list">
              {cvData.projects.map((item, index) => (
                <button
                  type="button"
                  className={activeProject === item.slug ? "is-selected" : ""}
                  aria-pressed={activeProject === item.slug}
                  onClick={() => setActiveProject(item.slug)}
                  key={item.slug}
                >
                  <span>0{index + 1}</span>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
            {project && (
              <article className="v32-project-detail" aria-live="polite">
                <div className="v32-project-meta">{project.type ?? "personal build"} <span>·</span> {project.period}</div>
                <h3>{project.title}</h3>
                <p className="v32-project-lead">{project.highlights[0]}</p>
                <ul>{project.highlights.slice(1).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <div className="v32-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            )}
          </div>
        </section>

        <section className="v32-now" id="now">
          <div>
            <span className="v32-kicker">the now page</span>
            <h2>Still learning.<br /><em>Already building.</em></h2>
          </div>
          <div className="v32-now-copy">
            <p>Three threads are shaping what I build next. They are related, but they are not the same thing.</p>
            <div className="v32-now-line"><span>learning with</span><strong>DEPI · React frontend development</strong></div>
            <div className="v32-now-line"><span>interning with</span><strong>FlyRank AI · backend and AI foundations</strong></div>
            <div className="v32-now-line"><span>coming from</span><strong>Computer Engineering · graduated 2026</strong></div>
          </div>
        </section>

        <section className="v32-field-notes" aria-label="Field notes">
          <div><Code2 size={17} /><span>field note / {String(noteIndex + 1).padStart(2, "0")}</span></div>
          <button type="button" onClick={() => setNoteIndex((current) => (current + 1) % fieldNotes.length)} aria-label="Show another field note">
            “{fieldNotes[noteIndex]}” <ArrowUpRight size={15} />
          </button>
        </section>

        <section className="v32-contact" id="contact">
          <span className="v32-kicker">say hello</span>
          <h2>Let&apos;s build something<br /><em>worth opening twice.</em></h2>
          <p>Have a product, an interface, or a knotty frontend problem in mind?</p>
          <a className="v32-cta" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Start a conversation</a>
          <div className="v32-contact-links">
            <a href={`tel:${cvData.contact.phone.replaceAll(" ", "")}`}><Phone size={15} /> {cvData.contact.phone}</a>
            <a href={`mailto:${cvData.contact.email}`}><Mail size={15} /> {cvData.contact.email}</a>
          </div>
        </section>

        <footer className="v32-footer">
          <span>Ahmed Hesham · software developer</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </main>
  );
}
