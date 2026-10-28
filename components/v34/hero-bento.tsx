import { cvData } from "@/data/cv";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon, LinkedinIcon } from "./icons";
import { TelemetryCard } from "./telemetry";

function IsometricCube() {
  return (
    <svg
      aria-hidden="true"
      className="v4-cube"
      fill="none"
      height={150}
      viewBox="0 0 160 160"
      width={150}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M80 10 136 42v66L80 150 24 108V42Z" />
        <path d="M24 42 80 76l56-34M80 76v74" />
        <path d="M24 42h12M136 42h-12M24 108h12M136 108h-12" opacity=".45" />
      </g>
      <g fill="var(--v4-surface)" stroke="currentColor" strokeWidth="1.5">
        <circle cx="80" cy="10" r="2.8" />
        <circle cx="24" cy="42" r="2.8" />
        <circle cx="136" cy="42" r="2.8" />
        <circle cx="24" cy="108" r="2.8" />
        <circle cx="136" cy="108" r="2.8" />
        <circle cx="80" cy="150" r="2.8" />
      </g>
      <circle cx="80" cy="76" fill="var(--v4-signal)" r="3.4" />
      <g fill="currentColor" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="6.5" letterSpacing=".12em" stroke="none">
        <text x="84" y="8">UI</text>
        <text x="140" y="39">API</text>
        <text x="2" y="39">STATE</text>
        <text x="140" y="113">BUILD</text>
      </g>
    </svg>
  );
}

function StatusPills() {
  return (
    <article className="v4-bento-card v4-status-card" aria-label="Current status">
      <div className="v4-bento-top">
        <span className="v4-label">03 / status</span>
        <span className="v4-bento-index">2026</span>
      </div>
      <div className="v4-status-list">
        <div className="v4-status-pill is-ink">
          <span className="v4-status-copy">
            <strong>Flutter</strong>
            <ArrowRightIcon size={14} />
            <strong>React</strong>
          </span>
          <ArrowUpRightIcon className="v4-pill-tail" size={13} />
        </div>
        <div className="v4-status-pill is-rust">
          <span className="v4-status-copy">
            <strong>DEPI + FlyRank AI</strong>
          </span>
          <ArrowUpRightIcon className="v4-pill-tail" size={13} />
        </div>
        <div className="v4-status-pill is-sage">
          <span className="v4-status-copy">
            <strong>Open to remote / hybrid</strong>
          </span>
          <ArrowUpRightIcon className="v4-pill-tail" size={13} />
        </div>
      </div>
    </article>
  );
}

function ConnectCard() {
  return (
    <article className="v4-bento-card v4-connect-card" aria-label="Connect with Ahmed">
      <div className="v4-bento-top">
        <span className="v4-label">04 / connect</span>
        <span className="v4-bento-index">direct</span>
      </div>
      <div className="v4-connect-list">
        <a className="v4-connect-row" href={cvData.contact.linkedin} rel="noreferrer" target="_blank">
          <span className="v4-connect-brand">
            <LinkedinIcon size={17} />
          </span>
          <span className="v4-connect-copy">
            <strong>LinkedIn</strong>
            <small>in/ahmed-hesham-8h</small>
          </span>
          <ArrowUpRightIcon className="v4-connect-arrow" size={15} />
        </a>
        <a className="v4-connect-row" href={cvData.contact.github} rel="noreferrer" target="_blank">
          <span className="v4-connect-brand">
            <GithubIcon size={17} />
          </span>
          <span className="v4-connect-copy">
            <strong>GitHub</strong>
            <small>@ahmed8ch</small>
          </span>
          <ArrowUpRightIcon className="v4-connect-arrow" size={15} />
        </a>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section className="v4-hero" aria-labelledby="v4-hero-title">
      <div className="v4-hero-copy">
        <p className="v4-eyebrow">
          <span className="v4-eyebrow-dot" />
          Software developer — Giza, Egypt
        </p>
        <h1 id="v4-hero-title">
          I make useful things
          <br />
          <em>feel considered.</em>
        </h1>
        <p className="v4-lede">
          I build mobile and web interfaces with a product eye — clear flows, real APIs, and enough
          personality to be remembered.
        </p>

        <figure className="v4-callout">
          <blockquote>interfaces should feel obvious before they feel clever</blockquote>
          <figcaption>
            <span>field note</span>
            <span>00 / principle</span>
          </figcaption>
        </figure>

        <div className="v4-hero-actions">
          <a className="v4-button is-solid" href="#work">
            See what I&apos;ve shipped
            <ArrowRightIcon size={15} />
          </a>
          <a className="v4-button is-quiet" href="#record">
            Review the track record
            <ArrowUpRightIcon size={14} />
          </a>
        </div>
      </div>

      <div className="v4-bento">
        <article className="v4-bento-card v4-identity">
          <div className="v4-bento-top">
            <span className="v4-label">01 / hello</span>
            <span className="v4-bento-index">AH / 26</span>
          </div>
          <IsometricCube />
          <div className="v4-identity-copy">
            <h2>Ahmed Hesham</h2>
            <p>Software developer with a product eye.</p>
          </div>
          <div className="v4-identity-foot">
            <span>B.Sc. Computer Engineering</span>
            <span>2026</span>
          </div>
        </article>

        <TelemetryCard />
        <StatusPills />
        <ConnectCard />
      </div>
    </section>
  );
}
