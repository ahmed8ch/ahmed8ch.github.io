"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Check,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Printer,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cvData } from "@/data/cv";
import { MagneticFilings } from "@/components/ui/magnetic-filings";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { versionLinks } from "@/data/version-links";

type Theme = "dark" | "light";

const socialLinks = [
  { label: "GitHub", href: cvData.contact.github, icon: Code2 },
  { label: "LinkedIn", href: cvData.contact.linkedin, icon: BriefcaseBusiness },
  { label: "Email", href: `mailto:${cvData.contact.email}`, icon: Mail },
] as const;

export default function V3Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [today, setToday] = useState("loading date");
  const [activeProject, setActiveProject] = useState(cvData.projects[0]?.slug ?? "");

  useEffect(() => {
    const stored = window.localStorage.getItem("icareer-v3-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
    setToday(new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(new Date()));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("icareer-v3-theme", theme);
  }, [theme]);

  const project = useMemo(
    () => cvData.projects.find((item) => item.slug === activeProject) ?? cvData.projects[0],
    [activeProject],
  );

  return (
    <main className={`v3-shell ${theme}`}>
      <GreatFloatingMenu links={versionLinks} current="V3" />
      <MagneticFilings theme={theme} />
      <div className="v3-noise" aria-hidden="true" />
      <nav className="v3-nav" aria-label="Primary navigation">
        <a className="v3-logo" href="#top">AH<span>✳</span>L</a>
        <div className={`v3-nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Story</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/" onClick={() => setMenuOpen(false)}>V1 <ArrowUpRight size={13} /></a>
        </div>
        <div className="v3-nav-actions">
          <button type="button" className="v3-icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" className="v3-icon-button v3-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div className="v3-content" id="top">
        <section className="v3-intro">
          <div className="v3-intro-copy">
            <p className="v3-eyebrow"><span className="v3-pulse" /> Software developer · Giza, Egypt</p>
            <h1>Hi, I&apos;m Ahmed.<br /><em>I build useful things.</em></h1>
            <p className="v3-lede">{cvData.summary}</p>
            <div className="v3-intro-actions">
              <a className="v3-button v3-button-primary" href="#work">See selected work <ArrowUpRight size={16} /></a>
              <a className="v3-button v3-button-quiet" href={`mailto:${cvData.contact.email}`}>Let&apos;s talk <Mail size={15} /></a>
            </div>
            <div className="v3-socials" aria-label="Social links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" aria-label={label}><Icon size={17} /></a>
              ))}
              <span className="v3-social-note">open to good problems</span>
            </div>
          </div>
          <aside className="v3-intro-card">
            <div className="v3-avatar">AH<span>✳</span></div>
            <div className="v3-card-label">A little about me</div>
            <p>Frontend-minded developer with a Flutter foundation, a growing React toolkit, and an unhealthy appreciation for thoughtful interfaces.</p>
            <button type="button" className="v3-spark-button" onClick={() => setSparkle(!sparkle)} aria-pressed={sparkle}>
              {sparkle ? <Check size={15} /> : <Sparkles size={15} />} {sparkle ? "signal received" : "send a tiny signal"}
            </button>
          </aside>
        </section>

        <section className="v3-metrics" aria-label="Quick facts">
          <div><span className="v3-card-label">Today</span><strong>{today}</strong><small>one day at a time</small></div>
          <div><span className="v3-card-label">Currently</span><strong>DEPI + FlyRank AI</strong><small>two active learning tracks</small></div>
          <div><span className="v3-card-label">Based in</span><strong><MapPin size={15} /> {cvData.contact.location}</strong><small>available for remote work</small></div>
        </section>

        <section className="v3-section" id="work">
          <div className="v3-section-heading"><div><span className="v3-kicker">01 / selected work</span><h2>Small products, real constraints.</h2></div><span className="v3-section-count">03 projects</span></div>
          <div className="v3-project-grid">
            {cvData.projects.map((item, index) => (
              <button type="button" className={`v3-project-card ${activeProject === item.slug ? "active" : ""}`} key={item.slug} onClick={() => setActiveProject(item.slug)}>
                <span className="v3-project-index">0{index + 1}</span>
                <span className="v3-project-title">{item.title}</span>
                <span className="v3-project-subtitle">{item.subtitle}</span>
                <span className="v3-project-arrow"><ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
          {project && (
            <article className="v3-project-detail">
              <div className="v3-project-detail-top"><div><span className="v3-kicker">{project.type ?? "independent project"}</span><h3>{project.title} <span>· {project.subtitle}</span></h3></div><time>{project.period}</time></div>
              <div className="v3-tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          )}
        </section>

        <section className="v3-two-column" id="story">
          <div className="v3-section">
            <div className="v3-section-heading"><div><span className="v3-kicker">02 / the story so far</span><h2>Learning in public, building with intent.</h2></div></div>
            <div className="v3-timeline">
              {cvData.training.map((item) => (
                <article key={`${item.role}-${item.institution}`} className="v3-timeline-item"><span className="v3-timeline-dot" /><div><time>{item.period}</time><h3>{item.role}</h3><p>{item.institution} · {item.mode} · {item.location}</p>{item.highlights.map((highlight) => <p className="v3-body" key={highlight}>{highlight}</p>)}{item.upcomingModules && <div className="v3-tag-row">{item.upcomingModules.map((module) => <span key={module}>{module}</span>)}</div>}</div></article>
              ))}
            </div>
          </div>
          <aside className="v3-side-stack">
            <div className="v3-mini-card"><span className="v3-card-label"><GraduationCap size={15} /> Education</span>{cvData.education.map((item) => <div key={item.degree}><h3>{item.degree}</h3><p>{item.institution} · {item.graduationDate}</p></div>)}</div>
            <div className="v3-mini-card"><span className="v3-card-label">The toolkit</span>{cvData.skills.map((group) => <div className="v3-skill-line" key={group.category}><span>{group.category}</span><p>{group.skills.join(" · ")}</p></div>)}</div>
          </aside>
        </section>

        <section className="v3-lower-grid">
          <div className="v3-mini-card"><span className="v3-card-label">Credentials</span>{cvData.certifications.map((item) => <div className="v3-credential" key={item.title}><h3>{item.title}</h3><p>{item.issuer} · {item.issuedDate}{item.hours ? ` · ${item.hours} hrs` : ""}</p>{item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer">verify <ArrowUpRight size={12} /></a>}</div>)}</div>
          <div className="v3-mini-card"><span className="v3-card-label"><Heart size={15} /> Beyond the screen</span>{cvData.volunteer.map((item) => <div key={item.role}><h3>{item.role}</h3><p>{item.organization} · {item.period}</p>{item.highlights.map((highlight) => <p className="v3-body" key={highlight}>{highlight}</p>)}</div>)}</div>
          <div className="v3-date-card"><CalendarDays size={28} /><span>Keep in touch</span><strong>Good work starts<br />with a conversation.</strong><a href={`mailto:${cvData.contact.email}`}>Email Ahmed <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="v3-contact" id="contact">
          <span className="v3-kicker">03 / contact</span><h2>Have a good problem?<br /><em>Let&apos;s make it less annoying.</em></h2>
          <div className="v3-contact-links"><a href={`mailto:${cvData.contact.email}`}><Mail size={18} /> {cvData.contact.email}</a><a href={`tel:${cvData.contact.phone.replaceAll(" ", "")}`}><Phone size={18} /> {cvData.contact.phone}</a><a href={cvData.contact.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a><a href={cvData.contact.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a></div>
        </section>

        <footer className="v3-footer"><span>© {new Date().getFullYear()} Ahmed Hesham Lotfy</span><span>made with curiosity &amp; too much coffee</span><button type="button" onClick={() => window.print()} aria-label="Print or download PDF"><Printer size={15} /> PDF</button></footer>
      </div>
    </main>
  );
}
