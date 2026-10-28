"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cvData } from "@/data/cv";
import { caseStudies } from "@/data/v34";
import { ArrowUpRightIcon, ChevronDownIcon } from "./icons";
import { Connect4Visual } from "./connect4-visual";
import { OtlobVisual } from "./otlob-visual";
import { PulseVisual } from "./pulse-visual";

function Specimen({ slug }: { slug: string }) {
  if (slug === "otlob") return <OtlobVisual />;
  if (slug === "pulse-news") return <PulseVisual />;
  return <Connect4Visual />;
}

export function WorkExplorer() {
  const [activeSlug, setActiveSlug] = useState(cvData.projects[0]?.slug ?? "otlob");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = cvData.projects.find((item) => item.slug === activeSlug) ?? cvData.projects[0];
  const study = caseStudies[activeSlug] ?? caseStudies.otlob;

  const focusProject = (index: number) => {
    const next = cvData.projects[index];
    if (!next) return;
    setActiveSlug(next.slug);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = cvData.projects.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    focusProject(next);
  };

  return (
    <section aria-labelledby="v4-work-title" className="v4-section v4-work" id="work">
      <header className="v4-section-head">
        <div>
          <span className="v4-kicker">01 / shipped work</span>
          <h2 id="v4-work-title">
            Things I&apos;ve shipped
            <br />
            <em>and learned from.</em>
          </h2>
        </div>
        <p>
          Three builds, three different lessons. Select one, then use the live specimen instead of
          taking my word for it.
        </p>
        <span className="v4-section-count">03 projects / 2024—2026</span>
      </header>

      <div className="v4-explorer">
        <div className="v4-explorer-nav">
          <div aria-label="Choose a project" className="v4-tabs" role="group">
            {cvData.projects.map((item, index) => {
              const isActive = item.slug === activeSlug;
              return (
                <button
                  aria-controls="v4-work-copy v4-work-specimen"
                  aria-pressed={isActive}
                  className="v4-tab"
                  key={item.slug}
                  onClick={() => setActiveSlug(item.slug)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                >
                  <span className="v4-tab-index">{String(index + 1).padStart(2, "0")} /</span>
                  <span className="v4-tab-title">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <ArrowUpRightIcon className="v4-tab-arrow" size={15} />
                </button>
              );
            })}
          </div>

          <a className="v4-jump-specimen" href="#v4-work-specimen">
            <span>Open the {project.title} specimen</span>
            <ChevronDownIcon size={14} />
          </a>

          <p className="v4-sr-only" role="status">
            {project.title} case study selected. {study.index} interactive specimen ready.
          </p>

          <div className="v4-case-copy" id="v4-work-copy" key={project.slug}>
            <span className="v4-case-meta">
              {project.type ?? "personal build"} / {project.period}
            </span>
            <h3>
              {project.title}
              <span> / {project.subtitle}</span>
            </h3>

            <dl className="v4-case-notes">
              <div>
                <dt>Scope</dt>
                <dd>{study.scope}</dd>
              </div>
              <div>
                <dt>Architecture &amp; State</dt>
                <dd>{study.architecture}</dd>
              </div>
              <div>
                <dt>Interface System</dt>
                <dd>{study.interfaceSystem}</dd>
              </div>
            </dl>

            <div aria-label="Technology stack" className="v4-tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div aria-label={`${project.title} interactive specimen`} className="v4-explorer-view" id="v4-work-specimen" role="region">
          <div className="v4-view-head">
            <span>
              <i className="v4-view-dot" />
              Interactive specimen
            </span>
            <span>
              {study.index} / {project.title}
            </span>
          </div>
          <div className="v4-view-body">
            <Specimen slug={project.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
