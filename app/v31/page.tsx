"use client";

import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Code2, Mail, MapPin, Moon, Phone, Printer, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cvData } from "@/data/cv";
import { FloatingMenu } from "@/components/ui/floating-menu";
import { MagneticFilings } from "@/components/ui/magnetic-filings";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { versionLinks } from "@/data/version-links";

type Theme = "dark" | "light";

const menuItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export default function V31Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeProject, setActiveProject] = useState(cvData.projects[0]?.slug ?? "");
  const [today, setToday] = useState("");
  const project = useMemo(() => cvData.projects.find((item) => item.slug === activeProject) ?? cvData.projects[0], [activeProject]);

  useEffect(() => {
    const saved = window.localStorage.getItem("icareer-v31-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    setToday(new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date()));
  }, []);

  useEffect(() => { window.localStorage.setItem("icareer-v31-theme", theme); }, [theme]);

  return (
    <main className={`v31-shell ${theme}`}>
      <GreatFloatingMenu links={versionLinks} current="V3.1" />
      <MagneticFilings theme={theme} />
      <a className="v31-skip-link" href="#work">Skip to selected work</a>
      <header className="v31-header">
        <a className="v31-mark" href="#top">AH<span>•</span>L</a>
        <div className="v31-header-links">
          {menuItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </div>
        <div className="v31-header-actions">
          <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button type="button" onClick={() => window.print()} aria-label="Print or download PDF"><Printer size={16} /></button>
        </div>
      </header>
      <FloatingMenu items={menuItems} />

      <div className="v31-wrap" id="top">
        <section className="v31-hero">
          <div>
            <p className="v31-overline"><span className="v31-live-dot" /> available for thoughtful work</p>
            <h1>Software developer<br /><span>with a product eye.</span></h1>
            <p className="v31-intro">{cvData.summary}</p>
            <div className="v31-hero-links">
              <a className="v31-primary" href="#work">Explore the work <ArrowUpRight size={15} /></a>
              <a href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Get in touch</a>
            </div>
          </div>
          <div className="v31-calendar">
            <CalendarDays size={17} />
            <span>today</span>
            <strong>{today || "loading…"}</strong>
            <small>Giza, Egypt · open to remote</small>
          </div>
        </section>

        <section className="v31-bento" aria-label="Quick profile">
          <div className="v31-bento-wide"><span>01</span><strong>Flutter → React</strong><p>Building a wider frontend toolkit while staying close to real product problems.</p></div>
          <div><span>02</span><strong>DEPI + FlyRank AI</strong><p>Two active tracks, one curious engineer.</p></div>
          <div><span>03</span><strong><MapPin size={15} /> Giza, Egypt</strong><p>Available for remote opportunities.</p></div>
        </section>

        <section className="v31-section" id="work">
          <div className="v31-heading"><div><span className="v31-overline">selected work</span><h2>Things I&apos;ve shipped and learned from.</h2></div><span className="v31-count">03</span></div>
          <div className="v31-work-list">
            {cvData.projects.map((item, index) => (
              <button type="button" className={activeProject === item.slug ? "selected" : ""} onClick={() => setActiveProject(item.slug)} key={item.slug}>
                <span>0{index + 1}</span><strong>{item.title}</strong><small>{item.subtitle}</small><ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          {project && <article className="v31-work-detail"><div><span className="v31-overline">{project.type ?? "independent project"} · {project.period}</span><h3>{project.title}</h3><p>{project.highlights[0]}</p></div><div className="v31-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><ul>{project.highlights.slice(1).map((item) => <li key={item}>{item}</li>)}</ul></article>}
        </section>

        <section className="v31-section v31-experience" id="experience">
          <div className="v31-heading"><div><span className="v31-overline">experience &amp; education</span><h2>Still learning. Already building.</h2></div></div>
          <div className="v31-experience-grid">
            <div className="v31-timeline">{cvData.training.map((item) => <article key={`${item.role}-${item.institution}`}><time>{item.period}</time><div><h3>{item.role}</h3><p>{item.institution} · {item.mode} · {item.location}</p>{item.highlights.map((highlight) => <p className="v31-detail" key={highlight}>{highlight}</p>)}</div></article>)}</div>
            <aside className="v31-side-card"><span className="v31-overline">education</span>{cvData.education.map((item) => <div key={item.degree}><h3>{item.degree}</h3><p>{item.institution} · {item.graduationDate}</p></div>)}<span className="v31-overline v31-side-label">toolkit</span><p>{cvData.skills.flatMap((group) => group.skills).join(" · ")}</p></aside>
          </div>
        </section>

        <section className="v31-bottom-grid">
          <div className="v31-list-card"><span className="v31-overline">credentials</span>{cvData.certifications.map((item) => <div key={item.title}><strong>{item.title}</strong><p>{item.issuer} · {item.issuedDate}</p></div>)}</div>
          <div className="v31-list-card"><span className="v31-overline">beyond the screen</span>{cvData.volunteer.map((item) => <div key={item.role}><strong>{item.role}</strong><p>{item.organization} · {item.period}</p></div>)}</div>
          <div className="v31-note-card"><Code2 size={20} /><strong>Make it clear.<br />Make it useful.</strong><a href={`mailto:${cvData.contact.email}`}>Start a conversation <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="v31-contact" id="contact"><span className="v31-overline">contact</span><h2>Let&apos;s build something<br /><span>worth opening twice.</span></h2><div><a href={`mailto:${cvData.contact.email}`}><Mail size={17} /> {cvData.contact.email}</a><a href={`tel:${cvData.contact.phone.replaceAll(" ", "")}`}><Phone size={17} /> {cvData.contact.phone}</a><a href={cvData.contact.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn</a><a href={cvData.contact.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a></div></section>
        <footer className="v31-footer"><span>Ahmed Hesham Lotfy · software developer</span><a href="/">return to V1 <ArrowUpRight size={12} /></a></footer>
      </div>
    </main>
  );
}
