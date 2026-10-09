"use client";

import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Mail, MapPin, Moon, Phone, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cvData } from "@/data/cv";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { ScrollFlyingCards } from "@/components/ui/scroll-flying-cards";
import { MagneticFilings } from "@/components/ui/magnetic-filings";
import { versionLinks } from "@/data/version-links";
import { PortfolioBrandLink } from "@/components/ui/portfolio-brand-link";

type Theme = "dark" | "light";

export default function V33Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const stored = window.localStorage.getItem("icareer-v33-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);
  useEffect(() => { window.localStorage.setItem("icareer-v33-theme", theme); }, [theme]);

  const cards = cvData.projects.map((project) => ({
    id: project.slug,
    title: project.title,
    description: project.highlights.join(" "),
    meta: `${project.subtitle} · ${project.period}`,
    tags: project.stack,
    icon: <Code2 size={38} strokeWidth={1.4} />,
  }));

  return (
    <main className={`v33-shell ${theme}`}>
      <MagneticFilings theme={theme} />
      <GreatFloatingMenu links={versionLinks} current="V3.3" />
      <header className="v33-header">
        <a className="v33-wordmark" href="#top"><span>AH</span> Ahmed Hesham</a>
        <div className="v33-header-actions">
          <div className="v33-header-socials">
            <PortfolioBrandLink brand="linkedin" href={cvData.contact.linkedin} label="LinkedIn" />
            <PortfolioBrandLink brand="github" href={cvData.contact.github} label="GitHub" />
          </div>
          <button type="button" className="v33-theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
      <div className="v33-wrap" id="top">
        <section className="v33-hero">
          <span className="v33-kicker">selected work / frontend development</span>
          <h1>Mobile products,<br /><em>carefully built.</em></h1>
          <p>I build clear interfaces, connect them to real APIs, and pay attention to the details that make a product easier to trust.</p>
          <a className="v33-cta" href="#projects">View selected work <ArrowUpRight size={15} /></a>
        </section>
        <section id="projects" className="v33-projects">
          <ScrollFlyingCards backgroundText="SHIPPED" cards={cards} />
        </section>
        <section className="v33-proof">
          <div><strong>30+</strong><span>screens shipped in Otlob</span></div>
          <div><strong>3</strong><span>products in this portfolio</span></div>
          <div><strong>2026</strong><span>computer engineering graduate</span></div>
        </section>
        <section className="v33-now">
          <div className="v33-section-heading"><span className="v33-kicker">current work</span><h2>What I&apos;m working<br /><em>on now.</em></h2></div>
          <div className="v33-now-grid">
            {cvData.training.map((item) => <article key={item.institution}><span className="v33-kicker">{item.period}</span><h3>{item.role}</h3><p>{item.highlights[0]}</p><small>{item.organization} · {item.location}</small></article>)}
            <article><GraduationCap size={20} /><span className="v33-kicker">education</span><h3>{cvData.education[0].degree}</h3><p>{cvData.education[0].institution}</p><small>{cvData.education[0].graduationDate}</small></article>
          </div>
        </section>
        <section className="v33-close">
          <span className="v33-kicker">contact</span>
          <h2>Need a frontend<br /><em>for the next release?</em></h2>
          <p><MapPin size={14} /> {cvData.contact.location} · available for remote work</p>
          <a className="v33-cta" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Email Ahmed</a>
          <a className="v33-phone" href={`tel:${cvData.contact.phone}`}><Phone size={14} /> {cvData.contact.phone}</a>
        </section>
        <footer className="v33-footer"><span>Ahmed Hesham · software developer</span><div><a href={cvData.contact.github} target="_blank" rel="noreferrer"><Code2 size={12} /> GitHub</a><a href={cvData.contact.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={12} /> LinkedIn</a></div></footer>
      </div>
    </main>
  );
}
