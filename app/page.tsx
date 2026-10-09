"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, Mail, MapPin, Moon, Phone, Printer, Sun } from "lucide-react";
import { cvData } from "@/data/cv";
import { AmbientCanvas } from "@/components/ui/ambient-canvas";
import { DotMatrix } from "@/components/ui/dot-matrix";
import { FluidTabs } from "@/components/ui/fluid-tabs";
import { GreatUIRow } from "@/components/ui/great-ui-row";
import { KobraToast } from "@/components/ui/kobra-toast";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { versionLinks } from "@/data/version-links";

export default function Home() {
  const [debug, setDebug] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("icareer-theme");
    if (storedTheme === "light" || storedTheme === "dark") setTheme(storedTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("icareer-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") {
        event.preventDefault();
        setDebug((current) => !current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!debug) return;
    console.info("ICAREER / ARCHITECTURAL SCHEMATIC\n├── identity\n├── experience\n│   ├── training\n│   └── projects\n├── capability matrix\n└── contact");
  }, [debug]);

  return (
    <main data-theme={theme} className={debug ? "debug-mode" : ""}>
      <AmbientCanvas />
      <GreatFloatingMenu links={versionLinks} current="V1" />
      <div className="page-shell">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Return to top">AH<span>•</span>L / CV</a>
          <div className="header-actions">
            <DotMatrix />
            <button type="button" className="icon-button theme-toggle" onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button type="button" className="icon-button" onClick={() => window.print()} aria-label="Print or download PDF"><Printer size={15} /><span>Print / PDF</span></button>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="caption hero-kicker">Software developer · 2026</p>
            <h1>{cvData.contact.name}</h1>
            <p className="hero-summary">{cvData.summary}</p>
            <div className="hero-actions">
              <a className="primary-button" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Start a conversation <ArrowUpRight size={15} /></a>
              <a className="text-link" href={cvData.contact.github} target="_blank" rel="noreferrer"><ExternalLink size={15} /> GitHub</a>
            </div>
          </div>
          <div className="hero-aside">
            <div className="signal-line"><span className="signal-dot" /> Current status · two active tracks</div>
            <dl className="contact-list">
              <div><dt><MapPin size={14} /> Location</dt><dd>{cvData.contact.location}</dd></div>
              <div><dt><Phone size={14} /> Phone</dt><dd>{cvData.contact.phone}</dd></div>
              <div><dt><Mail size={14} /> Email</dt><dd><a href={`mailto:${cvData.contact.email}`}>{cvData.contact.email}</a></dd></div>
              <div><dt><ExternalLink size={14} /> LinkedIn</dt><dd><a href={cvData.contact.linkedin} target="_blank" rel="noreferrer">Profile <ArrowUpRight size={12} /></a></dd></div>
              <div><dt><ExternalLink size={14} /> GitHub</dt><dd><a href={cvData.contact.github} target="_blank" rel="noreferrer">Profile <ArrowUpRight size={12} /></a></dd></div>
            </dl>
          </div>
        </section>

        <div className="rule" />
        <section className="content-grid">
          <div className="main-column">
            <section className="section-block">
              <div className="section-heading"><h2>Training & experience</h2><span className="caption tabular">02 active tracks</span></div>
              <div className="timeline">{cvData.training.map((item) => <GreatUIRow item={item} key={`${item.role}-${item.institution}`} />)}</div>
            </section>

            <section className="section-block projects-section">
              <div className="section-heading"><h2>Selected projects</h2><span className="caption tabular">03 shipped studies</span></div>
              <FluidTabs projects={cvData.projects} />
            </section>

            <section className="section-block print-only-section">
              <div className="section-heading"><h2>Education</h2></div>
              {cvData.education.map((item) => <div className="simple-row" key={item.degree}><div><h3>{item.degree}</h3><p>{item.institution} · {item.location}</p></div><span className="caption tabular">{item.graduationDate}</span></div>)}
            </section>
          </div>

          <aside className="side-column">
            <section className="section-block">
              <div className="section-heading"><h2>Capability matrix</h2></div>
              <div className="skills-list">{cvData.skills.map((group) => <div className="skill-group" key={group.category}><h3>{group.category}</h3><div className="pill-row">{group.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div></div>)}</div>
            </section>
            <section className="section-block">
              <div className="section-heading"><h2>Credentials</h2></div>
              <div className="credential-list">{cvData.certifications.map((item) => <article className="credential" key={item.title}><div className="credential-top"><h3>{item.title}</h3>{item.hours && <span className="caption tabular">{item.hours} hrs</span>}</div><p>{item.issuer} · {item.issuedDate}</p>{item.credentialUrl && <a className="text-link" href={item.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={12} /></a>}</article>)}</div>
            </section>
            <section className="section-block volunteer-block">
              <div className="section-heading"><h2>Volunteer</h2></div>
              {cvData.volunteer.map((item) => <div className="simple-row stacked" key={item.role}><div><h3>{item.role}</h3><p>{item.organization} · {item.location}</p></div><span className="caption tabular">{item.period}</span></div>)}
            </section>
          </aside>
        </section>

        <footer className="site-footer">
          <div><span className="caption">© {new Date().getFullYear()} Ahmed Hesham Lotfy</span><span className="footer-separator">/</span><span className="caption">Software developer · Giza, Egypt</span></div>
          <button type="button" className="deploy-trigger" onClick={() => setToastOpen(true)}>./deploy-prod.sh</button>
        </footer>
      </div>
      <KobraToast open={toastOpen} onClose={() => setToastOpen(false)} />
    </main>
  );
}
