"use client";

import { ArrowUpRight, ExternalLink, Mail, MapPin, Move, Moon, Phone, Printer, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import DotGridBackground from "@/components/ui/dot-grid-background";
import { cvData } from "@/data/cv";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { versionLinks } from "@/data/version-links";

export default function V2Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("icareer-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  return (
    <main className={`v2-shell ${theme}`}>
      <GreatFloatingMenu links={versionLinks} current="V2" />
      <DotGridBackground
        cols={28}
        dotSize={3}
        dotSpacing={5}
        dotColor={theme === "dark" ? "#a78bfa" : "#6941c6"}
        backgroundColor={theme === "dark" ? "#131316" : "#f9fafb"}
        scaleFactor={7}
        inertiaDamping={0.92}
        inertia
      >
        <div className="v2-page">
          <header className="v2-header">
            <a className="v2-brand" href="#top">AH<span>•</span>L / CV v2</a>
            <div className="v2-actions">
              <span className="v2-drag-hint"><Move size={13} /> drag field</span>
              <button type="button" className="v2-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button type="button" className="v2-button" onClick={() => window.print()} aria-label="Print CV"><Printer size={14} /> PDF</button>
              <a className="v2-button" href="/" aria-label="Open original CV">v1 <ArrowUpRight size={13} /></a>
            </div>
          </header>

          <section className="v2-hero" id="top">
            <div>
              <p className="v2-kicker">Software developer · 2026</p>
              <h1>{cvData.contact.name}</h1>
              <p className="v2-summary">{cvData.summary}</p>
              <div className="v2-links">
                <a className="v2-primary" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Start a conversation <ArrowUpRight size={14} /></a>
                <a className="v2-link" href={cvData.contact.github} target="_blank" rel="noreferrer"><ExternalLink size={14} /> GitHub</a>
              </div>
            </div>
            <div className="v2-contact">
              <span className="v2-status">● available for opportunities</span>
              <p><MapPin size={14} /> {cvData.contact.location}</p>
              <p><Phone size={14} /> {cvData.contact.phone}</p>
              <p><Mail size={14} /> <a href={`mailto:${cvData.contact.email}`}>{cvData.contact.email}</a></p>
              <p><ExternalLink size={14} /> <a href={cvData.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a></p>
            </div>
          </section>

          <div className="v2-rule" />
          <div className="v2-layout">
            <div className="v2-main">
              <section className="v2-section">
                <div className="v2-section-title"><h2>Training & experience</h2><span>02 active tracks</span></div>
                <div className="v2-list">
                  {cvData.training.map((item) => (
                    <article className="v2-entry" key={`${item.role}-${item.institution}`}>
                      <div className="v2-entry-top"><div><h3>{item.role}</h3><p>{item.institution}</p></div><time>{item.period}</time></div>
                      <p className="v2-meta">{item.organization} · {item.mode} · {item.location}{item.isCurrent ? " · Current" : ""}</p>
                      <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                      {item.upcomingModules && <div className="v2-modules"><span>Upcoming modules</span>{item.upcomingModules.map((module) => <b key={module}>{module}</b>)}</div>}
                    </article>
                  ))}
                </div>
              </section>

              <section className="v2-section">
                <div className="v2-section-title"><h2>Selected projects</h2><span>03 shipped studies</span></div>
                <div className="v2-list">
                  {cvData.projects.map((project) => (
                    <article className="v2-entry" key={project.slug}>
                      <div className="v2-entry-top"><div><h3>{project.title}</h3><p>{project.subtitle}{project.type ? ` · ${project.type}` : ""}</p></div><time>{project.period}</time></div>
                      <div className="v2-pills">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                      <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className="v2-section">
                <div className="v2-section-title"><h2>Education</h2></div>
                {cvData.education.map((item) => <article className="v2-entry v2-entry-top" key={item.degree}><div><h3>{item.degree}</h3><p>{item.institution} · {item.location}</p></div><time>{item.graduationDate}</time></article>)}
              </section>
            </div>

            <aside className="v2-side">
              <section className="v2-section">
                <div className="v2-section-title"><h2>Capability matrix</h2></div>
                {cvData.skills.map((group) => <div className="v2-skill-group" key={group.category}><h3>{group.category}</h3><div className="v2-pills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}
              </section>
              <section className="v2-section">
                <div className="v2-section-title"><h2>Credentials</h2></div>
                {cvData.certifications.map((item) => <article className="v2-credential" key={item.title}><div className="v2-entry-top"><h3>{item.title}</h3>{item.hours && <time>{item.hours} hrs</time>}</div><p>{item.issuer} · {item.issuedDate}</p>{item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={12} /></a>}</article>)}
              </section>
              <section className="v2-section">
                <div className="v2-section-title"><h2>Volunteer</h2></div>
                {cvData.volunteer.map((item) => <article className="v2-credential" key={item.role}><div className="v2-entry-top"><h3>{item.role}</h3><time>{item.period}</time></div><p>{item.organization} · {item.location}</p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}
              </section>
            </aside>
          </div>

          <footer className="v2-footer">© {new Date().getFullYear()} Ahmed Hesham Lotfy <span>/</span> Software developer · Giza, Egypt</footer>
        </div>
      </DotGridBackground>
    </main>
  );
}
