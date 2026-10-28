"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpIcon, BookmarkIcon, CheckIcon, SearchIcon } from "./icons";

type Category = "all" | "technology" | "science" | "business" | "sports";

type Story = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  summary: string;
  source: string;
  time: string;
  variant: number;
};

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "technology", label: "Tech" },
  { value: "science", label: "Science" },
  { value: "business", label: "Business" },
  { value: "sports", label: "Sports" },
];

const stories: Story[] = [
  {
    id: "quiet-software",
    category: "technology",
    title: "The quiet return of local-first software",
    summary: "Small teams are moving state back to the device, one sync layer at a time.",
    source: "Pulse Wire",
    time: "2h",
    variant: 0,
  },
  {
    id: "calmer-interfaces",
    category: "technology",
    title: "Small interfaces, longer attention",
    summary: "A look at products that choose fewer controls and clearer defaults.",
    source: "Pulse Wire",
    time: "4h",
    variant: 1,
  },
  {
    id: "frame-budget",
    category: "technology",
    title: "What a 60fps budget actually buys",
    summary: "Frame time as a design constraint, not a performance afterthought.",
    source: "Pulse Wire",
    time: "6h",
    variant: 2,
  },
  {
    id: "smaller-systems",
    category: "technology",
    title: "The case for smaller design systems",
    summary: "Fewer components, clearer rules, and a faster path from sketch to ship.",
    source: "Pulse Wire",
    time: "8h",
    variant: 0,
  },
  {
    id: "climate-signal",
    category: "science",
    title: "A calmer way to read the climate signal",
    summary: "Researchers translate dense datasets into a single readable pattern.",
    source: "Field Notes",
    time: "3h",
    variant: 2,
  },
  {
    id: "night-sky",
    category: "science",
    title: "Mapping the night sky from a phone",
    summary: "A small sensor, a large catalogue, and one very patient calibration step.",
    source: "Field Notes",
    time: "7h",
    variant: 0,
  },
  {
    id: "short-measurement",
    category: "science",
    title: "The long life of a short measurement",
    summary: "Why a single calibrated reading can outlast a decade of noisy data.",
    source: "Field Notes",
    time: "12h",
    variant: 1,
  },
  {
    id: "light-atlas",
    category: "science",
    title: "A map of everything the light touches",
    summary: "Astronomers turn a sky survey into a navigable, human-scale atlas.",
    source: "Field Notes",
    time: "14h",
    variant: 2,
  },
  {
    id: "small-loops",
    category: "business",
    title: "Why tiny teams ship in smaller loops",
    summary: "The operational case for fewer handoffs and shorter feedback cycles.",
    source: "Ledger",
    time: "5h",
    variant: 1,
  },
  {
    id: "fewer-features",
    category: "business",
    title: "The economics of fewer features",
    summary: "What happens when a roadmap is measured by clarity instead of volume.",
    source: "Ledger",
    time: "9h",
    variant: 2,
  },
  {
    id: "invisible-work",
    category: "business",
    title: "Pricing the invisible work",
    summary: "The maintenance, review, and context switching that never make it onto an invoice.",
    source: "Ledger",
    time: "13h",
    variant: 0,
  },
  {
    id: "small-team-compounding",
    category: "business",
    title: "The small-team compounding effect",
    summary: "How shorter decision paths turn into a durable shipping advantage.",
    source: "Ledger",
    time: "15h",
    variant: 1,
  },
  {
    id: "possession-map",
    category: "sports",
    title: "The strategy hiding in a possession map",
    summary: "A simple grid explains why the best move is often the least obvious one.",
    source: "Touchline",
    time: "6h",
    variant: 2,
  },
  {
    id: "recovery-first",
    category: "sports",
    title: "Training routines built for recovery",
    summary: "Coaches are designing the rest day before they design the session.",
    source: "Touchline",
    time: "11h",
    variant: 1,
  },
  {
    id: "shorter-squad",
    category: "sports",
    title: "The quiet advantage of a shorter squad",
    summary: "Rotation, recovery, and the tactics that emerge from fewer bodies.",
    source: "Touchline",
    time: "16h",
    variant: 0,
  },
  {
    id: "three-passes",
    category: "sports",
    title: "Reading a match in three passes",
    summary: "A coach's shorthand for turning movement into a decision.",
    source: "Touchline",
    time: "18h",
    variant: 2,
  },
];

function StoryThumb({ variant }: { variant: number }) {
  return (
    <svg aria-hidden="true" className="v4-story-thumb" fill="none" height={56} viewBox="0 0 56 56" width={56}>
      <rect fill="var(--pulse-thumb)" height="55" stroke="var(--pulse-line)" width="55" x=".5" y=".5" />
      {variant === 0 ? (
        <>
          <circle cx="20" cy="21" fill="var(--pulse-ink)" opacity=".9" r="7" />
          <path d="M10 43h36M10 36h24M10 29h17" stroke="var(--pulse-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      ) : variant === 1 ? (
        <>
          <rect fill="var(--pulse-ink)" height="24" opacity=".9" width="18" x="9" y="10" />
          <rect height="15" stroke="var(--pulse-ink)" width="19" x="29" y="10" />
          <path d="M9 43h38M9 36h26" stroke="var(--pulse-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <path d="M9 42 20 27l9 8 8-13 10 20Z" fill="var(--pulse-ink)" opacity=".9" />
          <circle cx="40" cy="16" r="4" stroke="var(--pulse-ink)" strokeWidth="1.5" />
          <path d="M9 48h38" stroke="var(--pulse-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

function PipelineArrow() {
  return (
    <div className="v4-map" aria-hidden="true">
      <svg fill="none" height={44} viewBox="0 0 44 44" width={44}>
        <path d="M5 22h30" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="m27 14 8 8-8 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
      <span>map</span>
    </div>
  );
}

export function PulseVisual() {
  const [category, setCategory] = useState<Category>("all");
  const [saved, setSaved] = useState<string[]>([]);
  const [canScrollTop, setCanScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = category === "all" ? stories : stories.filter((story) => story.category === category);
  const activeCategory = categories.find((item) => item.value === category) ?? categories[0];

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = 0;
    setCanScrollTop(false);
  }, [category]);

  const toggleSaved = (id: string) => {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sampleResponse = {
    status: "ok",
    totalResults: filtered.length,
    articles: filtered.slice(0, 2).map((story) => ({
      source: { name: story.source },
      title: story.title,
      category: story.category,
      publishedAt: story.time,
    })),
  };

  return (
    <div className="v4-pulse">
      <div className="v4-pulse-grid">
        <div className="v4-json-panel">
          <div className="v4-panel-head">
            <span>SAMPLE RESPONSE</span>
            <span className="v4-panel-dot" />
            <span>NewsAPI.org</span>
          </div>
          <div className="v4-json-request">
            GET /v2/top-headlines?category={category === "all" ? "general" : category}
          </div>
          <pre className="v4-json">{JSON.stringify(sampleResponse, null, 2)}</pre>
          <div className="v4-json-foot">
            <span>{activeCategory.label} feed</span>
            <span>{filtered.length.toString().padStart(2, "0")} results</span>
          </div>
        </div>

        <PipelineArrow />

        <div className="v4-pulse-phone" role="group" aria-label="Interactive Pulse News reader mockup">
          <div className="v4-pulse-head">
            <span className="v4-pulse-brand">Pulse</span>
            <span className="v4-pulse-badge">sample feed</span>
            <SearchIcon size={15} />
          </div>

          <div className="v4-pulse-cats" role="group" aria-label="Filter stories by category">
            {categories.map((item) => (
              <button
                aria-pressed={category === item.value}
                className={category === item.value ? "is-active" : ""}
                key={item.value}
                onClick={() => setCategory(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            aria-label="Scrollable article list"
            className="v4-pulse-scroll"
            onScroll={(event) => setCanScrollTop(event.currentTarget.scrollTop > 42)}
            ref={scrollRef}
            tabIndex={0}
          >
            <div className="v4-pulse-stories" key={category}>
              {filtered.map((story, index) => {
                const isSaved = saved.includes(story.id);
                return (
                  <article className="v4-story" key={story.id}>
                    <StoryThumb variant={story.variant} />
                    <div className="v4-story-copy">
                      <span className="v4-story-meta">
                        {story.category} / {story.time}
                      </span>
                      <h4>{story.title}</h4>
                      <p>{story.summary}</p>
                      <span className="v4-story-source">{index === 0 ? "Lead story" : story.source}</span>
                    </div>
                    <button
                      aria-label={isSaved ? `Remove ${story.title} from saved stories` : `Save ${story.title}`}
                      aria-pressed={isSaved}
                      className="v4-save"
                      onClick={() => toggleSaved(story.id)}
                      type="button"
                    >
                      {isSaved ? <CheckIcon size={13} /> : <BookmarkIcon size={13} />}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="v4-pulse-foot">
            <span>{activeCategory.label} / {filtered.length.toString().padStart(2, "0")}</span>
            <span>{saved.length > 0 ? `${saved.length} saved` : "tap to save"}</span>
          </div>

          {canScrollTop && (
            <button aria-label="Scroll article list back to top" className="v4-scroll-top" onClick={scrollToTop} type="button">
              <ArrowUpIcon size={14} />
              <span>Top</span>
            </button>
          )}
        </div>
      </div>

      <div className="v4-pulse-caption">
        <span>REST response</span>
        <ArrowRightIcon size={11} />
        <span>article model</span>
        <ArrowRightIcon size={11} />
        <span>reader card</span>
        <span>/ one-tap scroll-to-top</span>
      </div>
    </div>
  );
}
