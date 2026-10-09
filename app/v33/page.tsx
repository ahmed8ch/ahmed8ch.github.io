"use client";

import { ArrowUpRight, Code2, Mail, MapPin, Moon, Phone, Sun } from "lucide-react";
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
    icon: <Code2 size={34} strokeWidth={1.4} />,
  }));

  return (
    <main className={`v33-shell ${theme}`}>
      <MagneticFilings theme={theme} />
      <GreatFloatingMenu links={versionLinks} current="V3.3" />
      <header className="v33-header">
        <a className="v33-wordmark" href="#top">Ahmed Hesham</a>
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
          <div className="v33-hero-copy">
            <h1>Hi, I&apos;m Ahmed.</h1>
            <p className="v33-role">Software developer<br /><em>with a product eye.</em></p>
            <p>I build mobile products, shape the interface, and connect the pieces to real APIs.</p>
            <a className="v33-cta" href="#projects">See what I&apos;ve shipped <ArrowUpRight size={15} /></a>
          </div>
          <aside className="v33-facts" aria-label="Fun facts">
            <span className="v33-kicker">fun facts</span>
            <ul>
              <li>I live in Giza and still haven&apos;t visited the pyramids.</li>
              <li>I speak English, Arabic, and a little bit of RTL.</li>
              <li>I once turned a food-ordering app into 30+ screens.</li>
              <li>I like clean APIs almost as much as clean interfaces.</li>
            </ul>
          </aside>
        </section>
        <section id="projects" className="v33-projects">
          <div className="v33-project-heading"><span className="v33-kicker">selected work</span><h2>Things I&apos;ve shipped<br /><em>and learned from.</em></h2></div>
          <ScrollFlyingCards backgroundText="SHIPPED" cards={cards} />
        </section>
        <section className="v33-proof">
          <div><strong>30+</strong><span>screens shipped in Otlob</span></div>
          <div><strong>3</strong><span>products in this portfolio</span></div>
          <div><strong>4</strong><span>tools I reach for: Flutter, React, APIs, Git</span></div>
        </section>
        <section className="v33-now">
          <div className="v33-section-heading"><span className="v33-kicker">still learning</span><h2>Still <em>learning.</em></h2><p>Two active tracks are helping me move from shipping mobile interfaces to building broader product systems.</p></div>
          <div className="v33-now-grid">
            {cvData.training.map((item) => <article key={item.institution}><span className="v33-kicker">{item.period}</span><h3>{item.role}</h3><p>{item.highlights[0]}</p><small>{item.organization} · {item.location}</small></article>)}
          </div>
        </section>
        <section className="v33-close">
          <span className="v33-kicker">contact</span>
          <h2>Let&apos;s build something<br /><em>worth opening twice.</em></h2>
          <p><MapPin size={14} /> {cvData.contact.location} · available for remote work</p>
          <a className="v33-cta" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Email Ahmed</a>
          <a className="v33-phone" href={`tel:${cvData.contact.phone}`}><Phone size={14} /> {cvData.contact.phone}</a>
        </section>
        <footer className="v33-footer"><span>Ahmed Hesham · software developer</span><div><PortfolioBrandLink brand="github" href={cvData.contact.github} label="GitHub" /><PortfolioBrandLink brand="linkedin" href={cvData.contact.linkedin} label="LinkedIn" /></div></footer>
      </div>
    </main>
  );
}
