export type CaseStudy = {
  index: string;
  scope: string;
  architecture: string;
  interfaceSystem: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  otlob: {
    index: "01",
    scope:
      "Graduation project. A Flutter client spanning 30+ screens: onboarding, authentication, restaurant browsing, favourites, cart, orders, account and support, connected to the team's .NET backend.",
    architecture:
      "Riverpod manages app state and GoRouter owns navigation. Hive, SharedPreferences and Flutter Secure Storage cover local and session data across the REST integration.",
    interfaceSystem:
      "A bilingual system with English/Arabic copy, RTL mirroring, light and dark themes, and a Figma kit covering palette, typography, logo, iconography and Otto, the AI assistant.",
  },
  "pulse-news": {
    index: "02",
    scope:
      "An API-driven Flutter reader that surfaces category-filtered headlines, summaries, images and article detail from NewsAPI.org.",
    architecture:
      "REST responses resolve into article models, a list state and a detail view; favourites, native sharing and WebView or browser handoff complete the reading loop.",
    interfaceSystem:
      "A card-first reader with category chips, a one-tap scroll-to-top control, native share actions and a focused in-app reading handoff.",
  },
  "connect-4": {
    index: "03",
    scope:
      "A PvP and PvAI Connect 4 game built in Pygame with score tracking and turn state.",
    architecture:
      "Board occupancy is evaluated across rows, columns and diagonals for win detection. The rule-based opponent prioritises immediate wins, then blocks immediate threats.",
    interfaceSystem:
      "A fixed 7x6 grid sits beside persistent side-panel controls, with turn feedback, score display and audio cues on play.",
  },
};

export const focusModules = [
  "React",
  "Next.js",
  "Node.js/Express.js",
  "NestJS",
  "Docker",
  "Unit Testing",
] as const;

export type FieldNote = {
  index: string;
  title: string;
  icon: "ghost" | "pyramid" | "bidi";
  copy: string;
};

export const fieldNotes: FieldNote[] = [
  {
    index: "01",
    title: "The Ghost Mascot",
    icon: "ghost",
    copy: "I designed an AI ghost mascot named Otto in Figma and brought him to life in my Flutter food app—he helps users track their shawarma instead of haunting them, unless the REST API times out.",
  },
  {
    index: "02",
    title: "Giza Architecture",
    icon: "pyramid",
    copy: "I live in Giza and still haven't visited the Pyramids—mostly because I'm too busy obsessing over modern UI architecture in VS Code to go inspect a 4,500-year-old monument.",
  },
  {
    index: "03",
    title: "Bidirectional Fluency",
    icon: "bidi",
    copy: "Fluent in Arabic and English, conversational in spoken Japanese, and battle-tested in making Flutter layouts survive the jump from Left-to-Right to Right-to-Left.",
  },
];

export const archiveLinks = [
  { label: "V1", href: "/", description: "industrial CV system" },
  { label: "V2", href: "/v2/", description: "side-gutter dot field" },
  { label: "V3", href: "/v3/", description: "first editorial experiment" },
  { label: "V3.1", href: "/v31/", description: "Ana-inspired zinc layout" },
  { label: "V3.2", href: "/v32/", description: "open notebook portfolio" },
  { label: "V3.3", href: "/v33/", description: "scroll-flying project cards" },
] as const;
