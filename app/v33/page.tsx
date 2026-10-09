"use client";

import { ArrowUpRight, CloudRain, CloudSun, Code2, Database, Languages, Layers3, Mail, MapPin, Moon, Phone, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cvData } from "@/data/cv";
import { GreatFloatingMenu } from "@/components/ui/great-floating-menu";
import { ScrollFlyingCards } from "@/components/ui/scroll-flying-cards";
import { MagneticFilings } from "@/components/ui/magnetic-filings";
import { versionLinks } from "@/data/version-links";
import { PortfolioBrandLink } from "@/components/ui/portfolio-brand-link";

type Theme = "dark" | "light";
type WeatherState = { temperature: number; label: string } | { label: "Weather unavailable" } | null;

function weatherIcon(label: string) {
  if (label.toLowerCase().includes("rain")) return <CloudRain size={20} />;
  if (label.toLowerCase().includes("cloud")) return <CloudSun size={20} />;
  return <Sun size={20} />;
}

export default function V33Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherState>(null);
  useEffect(() => {
    const stored = window.localStorage.getItem("icareer-v33-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);
  useEffect(() => { window.localStorage.setItem("icareer-v33-theme", theme); }, [theme]);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current=temperature_2m,weather_code&timezone=Africa%2FCairo", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
        return response.json() as Promise<{ current?: { temperature_2m?: number; weather_code?: number } }>;
      })
      .then((data) => {
        const current = data.current;
        if (typeof current?.temperature_2m !== "number" || typeof current.weather_code !== "number") throw new Error("Weather response was incomplete");
        const labels: Record<number, string> = { 0: "Clear skies", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Foggy", 48: "Foggy", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorm" };
        setWeather({ temperature: current.temperature_2m, label: labels[current.weather_code] ?? "Changing skies" });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setWeather({ label: "Weather unavailable" });
      });
    return () => controller.abort();
  }, []);

  const cards = cvData.projects.map((project) => ({
    id: project.slug,
    title: project.title,
    description: project.highlights.join(" "),
    meta: `${project.subtitle} · ${project.period}`,
    tags: project.stack,
    icon: <Code2 size={34} strokeWidth={1.4} />,
  }));
  const skillGroups = [
    { label: "Build", icon: <Code2 size={19} />, items: cvData.skills.find((group) => group.category === "Programming Languages")?.skills ?? [] },
    { label: "Interfaces", icon: <Layers3 size={19} />, items: cvData.skills.find((group) => group.category === "Web & Mobile")?.skills ?? [] },
    { label: "Tools", icon: <Database size={19} />, items: cvData.skills.find((group) => group.category === "Developer Tools")?.skills ?? [] },
    { label: "Design", icon: <Languages size={19} />, items: cvData.skills.find((group) => group.category === "Design Tools")?.skills ?? [] },
  ];

  return (
    <main className={`v33-shell ${theme}`}>
      <MagneticFilings theme={theme} />
      <GreatFloatingMenu links={versionLinks} current="V3.3" />
      <header className="v33-header">
        <a className="v33-wordmark" href="#top"><span>Ahmed</span><span>Hesham</span></a>
        <div className="v33-header-actions">
          <div className="v33-header-socials">
            <PortfolioBrandLink brand="linkedin" href={cvData.contact.linkedin} label="LinkedIn" />
            <PortfolioBrandLink brand="github" href={cvData.contact.github} label="GitHub" />
          </div>
          <button type="button" className={`v33-theme-toggle ${theme}`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "light"}>
            {theme === "dark" ? <Sun className="v33-sun-icon" size={18} /> : <Moon className="v33-moon-icon" size={18} />}
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
              <li>I speak English and Arabic, and understand some Japanese when I hear it.</li>
              <li>I designed both the interface and the mascot for a food-ordering app.</li>
              <li>I enjoy turning complicated flows into screens people can actually use.</li>
            </ul>
          </aside>
        </section>
        <section id="projects" className="v33-projects">
          <div className="v33-project-heading"><span className="v33-kicker">selected work</span><h2>Things I&apos;ve shipped<br /><em>and learned from.</em></h2></div>
          <ScrollFlyingCards backgroundText="SHIPPED" cards={cards} />
        </section>
        <section className="v33-now">
          <div className="v33-section-heading"><h2>Still <em>learning.</em></h2><p>Two active tracks are helping me move from shipping mobile interfaces to building broader product systems.</p></div>
          <div className="v33-now-grid">
            {cvData.training.map((item) => <article key={item.institution}><span className="v33-kicker">{item.period}</span><h3>{item.role}</h3><p>{item.highlights[0]}</p><small>{item.organization} · {item.location}</small></article>)}
          </div>
        </section>
        <section className="v33-context" aria-label="Live details">
          <article className="v33-context-card v33-clock-card">
            <span className="v33-kicker">local time</span>
            <strong>{now ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "--:--"}</strong>
            <span>{now ? now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "Giza, Egypt"}</span>
          </article>
          <article className="v33-context-card v33-weather-card">
            <span className="v33-kicker">Giza weather</span>
            {weather && "temperature" in weather ? <><strong>{weather.temperature.toFixed(0)}°C</strong><span>{weatherIcon(weather.label)} {weather.label}</span></> : <><strong>{weather?.label ?? "--°"}</strong><span>Checking the sky...</span></>}
          </article>
          <a className="v33-linkedin-card" href={cvData.contact.linkedin} target="_blank" rel="noreferrer">
            <div className="v33-linkedin-top"><span>profile, but make it honest</span><span className="v33-linkedin-badge">in</span></div>
            <strong>Ahmed Hesham</strong>
            <span>Flutter developer · React trainee</span>
            <p>Connections: growing slowly, one useful conversation at a time.</p>
            <span className="v33-linkedin-action">View LinkedIn <ArrowUpRight size={14} /></span>
          </a>
        </section>
        <section className="v33-use">
          <div className="v33-section-heading"><h2>What I <em>use.</em></h2><p>The tools I keep close when I move from an idea to a working interface.</p></div>
          <div className="v33-use-grid">
            {skillGroups.map((group) => <article key={group.label}><div className="v33-use-label">{group.icon}<span>{group.label}</span></div><div className="v33-use-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
          </div>
        </section>
        <section className="v33-close">
          <span className="v33-kicker">contact</span>
          <h2>Let&apos;s build something<br /><em>worth opening twice.</em></h2>
          <p><MapPin size={14} /> {cvData.contact.location} · available for remote work</p>
          <a className="v33-cta" href={`mailto:${cvData.contact.email}`}><Mail size={15} /> Start a conversation</a>
          <a className="v33-phone" href={`tel:${cvData.contact.phone}`}><Phone size={14} /> {cvData.contact.phone}</a>
        </section>
        <footer className="v33-footer"><span>Ahmed Hesham · software developer</span><div><PortfolioBrandLink brand="github" href={cvData.contact.github} label="GitHub" /><PortfolioBrandLink brand="linkedin" href={cvData.contact.linkedin} label="LinkedIn" /></div></footer>
      </div>
    </main>
  );
}
