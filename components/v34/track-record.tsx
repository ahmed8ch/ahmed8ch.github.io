"use client";

import { cvData } from "@/data/cv";
import { focusModules } from "@/data/v34";
import { CheckIcon, ExternalIcon, PrinterIcon } from "./icons";

const matrixGroups = [
  { label: "Build", category: "Programming Languages" },
  { label: "Interface", category: "Web & Mobile" },
  { label: "Tools", category: "Developer Tools" },
  { label: "Design", category: "Design Tools" },
] as const;

const credentialLinks: Record<string, { href: string; label: string; note: string }> = {
  "Flutter Application Development": {
    href: "https://www.linkedin.com/in/ahmed-hesham-8h/overlay/Certifications/2006174317/treasury/?profileId=ACoAAETOWREBm7NY4RLzrni6oTTGKxX-YgEmBa0",
    label: "Verify",
    note: "LinkedIn credential",
  },
  "ALX Software Engineering Program — Foundations": {
    href: "https://www.linkedin.com/in/ahmed-hesham-8h/details/certifications/",
    label: "Profile record",
    note: "LinkedIn certification record",
  },
  "CCNA: Introduction to Networks": {
    href: "https://www.credly.com/badges/c4e186e4-0774-427a-83f6-0f35ab0f38b1",
    label: "Verify",
    note: "Credly badge",
  },
};

export function TrackRecord() {
  return (
    <section aria-labelledby="v4-record-title" className="v4-section v4-record" id="record">
      <header className="v4-section-head">
        <div>
          <span className="v4-kicker">03 / track record</span>
          <h2 id="v4-record-title">
            Two active tracks.
            <br />
            <em>One deliberate direction.</em>
          </h2>
        </div>
        <p>
          Training in public, building in parallel. Both tracks point at the same outcome: product
          systems I can take from interface to API.
        </p>
        <span className="v4-section-count">02 active / 2026</span>
      </header>

      <div className="v4-tracks">
        {cvData.training.map((item, index) => {
          const meta = Array.from(
            new Set(
              [
                item.mode,
                item.location,
                item.organization !== item.institution ? item.organization : "",
              ].filter(Boolean),
            ),
          );
          return (
            <article className="v4-track" key={`${item.role}-${item.institution}`}>
              <div className="v4-track-top">
                <span className="v4-track-status">
                  <i />
                  Active track {String(index + 1).padStart(2, "0")}
                </span>
                <span className="v4-track-period">{item.period}</span>
              </div>
              <span className="v4-track-org">{item.institution}</span>
              <h3>{item.role}</h3>
              <ul className="v4-track-list">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="v4-track-meta">
                {meta.map((entry) => (
                  <span key={entry}>{entry}</span>
                ))}
              </div>

              {item.upcomingModules && (
                <div className="v4-track-focus">
                  <span className="v4-track-focus-label">Active Full-Stack Track &amp; Focus</span>
                  <div className="v4-track-modules">
                    {focusModules.map((module) => (
                      <span key={module}>{module}</span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="v4-education">
        <span className="v4-education-label">Education</span>
        <div>
          <strong>{cvData.education[0]?.degree}</strong>
          <span>
            {cvData.education[0]?.institution} / {cvData.education[0]?.location}
          </span>
        </div>
        <span className="v4-education-date">{cvData.education[0]?.graduationDate}</span>
      </div>

      <div className="v4-record-grid">
        <div className="v4-matrix-panel">
          <div className="v4-panel-title">
            <div>
              <span className="v4-kicker">Capability matrix</span>
              <h3>Four working groups.</h3>
            </div>
            <span className="v4-panel-count">04 groups</span>
          </div>

          <div className="v4-matrix-rows">
            {matrixGroups.map((group, index) => {
              const skills = cvData.skills.find((item) => item.category === group.category)?.skills ?? [];
              return (
                <div className="v4-matrix-row" key={group.label}>
                  <span className="v4-matrix-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="v4-matrix-label">{group.label}</span>
                  <div className="v4-matrix-skills">
                    {skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="v4-credentials-panel">
          <div className="v4-panel-title">
            <div>
              <span className="v4-kicker">Verified credentials</span>
              <h3>Proof, with links.</h3>
            </div>
            <button className="v4-print" onClick={() => window.print()} type="button">
              <PrinterIcon size={14} />
              Print / Export CV
            </button>
          </div>

          <div className="v4-credential-rows">
            {cvData.certifications.map((item, index) => {
              const link = credentialLinks[item.title] ?? {
                href: cvData.contact.linkedin,
                label: "Profile",
                note: "LinkedIn profile",
              };
              return (
                <article className="v4-credential" key={item.title}>
                  <div className="v4-credential-main">
                    <span className="v4-matrix-index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>
                        {item.issuer} / {item.issuedDate}
                      </p>
                    </div>
                  </div>
                  <span className="v4-credential-hours">
                    {item.hours ? (
                      <>
                        <CheckIcon size={12} />
                        {item.hours} hrs
                      </>
                    ) : (
                      "program"
                    )}
                  </span>
                  <a
                    aria-label={`${link.label}: ${item.title} (${link.note})`}
                    className="v4-credential-link"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <ExternalIcon size={12} />
                  </a>
                </article>
              );
            })}
          </div>

          <p className="v4-credential-foot">
            Links open the issuing record. Print / Export uses the browser print dialog for a clean,
            text-first CV.
          </p>
        </div>
      </div>
    </section>
  );
}
