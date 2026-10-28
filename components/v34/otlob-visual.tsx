"use client";

import { useState } from "react";
import {
  ArrowUpRightIcon,
  BagIcon,
  HomeIcon,
  ReceiptIcon,
  SearchIcon,
} from "./icons";

function OttoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={74}
      viewBox="0 0 92 92"
      width={74}
    >
      <path
        d="M18 74V40a28 28 0 0 1 56 0v34l-9.3-6.5L55.4 74l-9.4-6.5L36.6 74Z"
        fill="var(--otto-fill)"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="37" cy="41" fill="currentColor" r="3.1" />
      <circle cx="55" cy="41" fill="currentColor" r="3.1" />
      <path d="M41 51c3 2.5 7 2.5 10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M18 55c-5-3-8-8-8-13M74 55c5-3 8-8 8-13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M31 68h30" opacity=".35" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OttoOutline() {
  return (
    <svg
      aria-hidden="true"
      className="v4-otto-outline"
      fill="none"
      height={166}
      viewBox="0 0 92 92"
      width={166}
    >
      <path
        d="M18 74V40a28 28 0 0 1 56 0v34l-9.3-6.5L55.4 74l-9.4-6.5L36.6 74Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="37" cy="41" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="55" cy="41" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M41 51c3 2.5 7 2.5 10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M18 55c-5-3-8-8-8-13M74 55c5-3 8-8 8-13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function FoodGlyph({ variant }: { variant: number }) {
  return (
    <svg aria-hidden="true" fill="none" height={40} viewBox="0 0 40 40" width={40}>
      <rect fill="var(--phone-surface)" height="39" stroke="var(--phone-line)" width="39" x=".5" y=".5" />
      {variant === 0 ? (
        <>
          <path d="M10 25h20l-2 6H12Z" fill="var(--phone-ink)" opacity=".9" />
          <path d="M12 25c0-5 3.5-8 8-8s8 3 8 8" stroke="var(--phone-ink)" strokeWidth="1.5" />
          <path d="M17 11v3M23 10v4" stroke="var(--phone-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      ) : variant === 1 ? (
        <>
          <path d="M9 24h22v3H9z" fill="var(--phone-ink)" opacity=".9" />
          <path d="M12 27c0 4 3.5 6 8 6s8-2 8-6" stroke="var(--phone-ink)" strokeWidth="1.5" />
          <path d="M14 19h12M17 14h6" stroke="var(--phone-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <path d="m10 26 10-14 10 14Z" fill="var(--phone-ink)" opacity=".9" />
          <path d="M14 24h12M17 20h6M12 29h16" stroke="var(--phone-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

type Copy = {
  greeting: string;
  prompt: string;
  search: string;
  chips: string[];
  ottoLabel: string;
  ottoTitle: string;
  ottoMeta: string;
  ottoLine: string;
  steps: string[];
  live: string;
  near: string;
  restaurants: { name: string; meta: string }[];
  tabs: string[];
  language: string;
};

const english: Copy = {
  greeting: "Good evening, Ahmed",
  prompt: "What are you craving?",
  search: "Search restaurants",
  chips: ["All", "Shawarma", "Koshary", "Pizza"],
  ottoLabel: "Otto / AI assist",
  ottoTitle: "Otto is on it.",
  ottoMeta: "Shawarma bowl · order 0248",
  ottoLine: "The kitchen is finishing your order.",
  steps: ["Confirmed", "Preparing", "On the way"],
  live: "live track",
  near: "Near you",
  restaurants: [
    { name: "Zaytoun Kitchen", meta: "Shawarma · Grills" },
    { name: "Koshary House", meta: "Koshary · Egyptian" },
    { name: "Cairo Bowl", meta: "Salads · Bowls" },
    { name: "Pizza Napoli", meta: "Pizza · Italian" },
  ],
  tabs: ["Home", "Search", "Orders", "Cart"],
  language: "EN",
};

const arabic: Copy = {
  greeting: "مساء الخير، أحمد",
  prompt: "ماذا تشتهي اليوم؟",
  search: "ابحث عن مطعم",
  chips: ["الكل", "شاورما", "كشري", "بيتزا"],
  ottoLabel: "أوتو / مساعد ذكي",
  ottoTitle: "أوتو يتابع طلبك",
  ottoMeta: "طبق شاورما · طلب 0248",
  ottoLine: "المطبخ يجهّز طلبك الآن.",
  steps: ["تم التأكيد", "قيد التحضير", "في الطريق"],
  live: "تتبع مباشر",
  near: "قريب منك",
  restaurants: [
    { name: "مطبخ الزيتون", meta: "شاورما · مشاوي" },
    { name: "بيت الكشري", meta: "كشري · مصري" },
    { name: "كايرو بول", meta: "سلطات · بول" },
    { name: "بيتزا نابولي", meta: "بيتزا · إيطالي" },
  ],
  tabs: ["الرئيسية", "البحث", "الطلبات", "السلة"],
  language: "AR",
};

const tabIcons = [HomeIcon, SearchIcon, ReceiptIcon, BagIcon];

export function OtlobVisual() {
  const [rtl, setRtl] = useState(false);
  const [surface, setSurface] = useState<"light" | "dark">("light");
  const copy = rtl ? arabic : english;

  return (
    <div className="v4-otlob">
      <div className="v4-otlob-controls">
        <div className="v4-control-group" role="group" aria-label="Text direction">
          <span className="v4-control-label">direction</span>
          <div className="v4-segment">
            <button aria-pressed={!rtl} onClick={() => setRtl(false)} type="button">
              LTR (English)
            </button>
            <button aria-pressed={rtl} onClick={() => setRtl(true)} type="button">
              RTL (Arabic)
            </button>
          </div>
        </div>
        <div className="v4-control-group" role="group" aria-label="Surface theme">
          <span className="v4-control-label">surface</span>
          <div className="v4-segment">
            <button aria-pressed={surface === "light"} onClick={() => setSurface("light")} type="button">
              Light Surface
            </button>
            <button aria-pressed={surface === "dark"} onClick={() => setSurface("dark")} type="button">
              Dark Surface
            </button>
          </div>
        </div>
      </div>

      <div className="v4-otlob-stage">
        <aside className="v4-otlob-annotation" aria-hidden="true">
          <span className="v4-stage-label">Otto / AI assist</span>
          <h4>
            The ghost that tracks
            <br />
            your shawarma.
          </h4>
          <p>A friendly order-state companion, designed for Otlob in Figma.</p>
          <OttoOutline />
          <div className="v4-annotation-specs">
            <span>Localized / EN + AR</span>
            <span>Layout / RTL ready</span>
          </div>
        </aside>

        <div className="v4-phone-wrap">
          <div
            aria-label={`Otlob app mockup, ${rtl ? "Arabic right-to-left" : "English left-to-right"}, ${surface} surface`}
            className="v4-phone"
            data-surface={surface}
            dir={rtl ? "rtl" : "ltr"}
            lang={rtl ? "ar" : "en"}
            role="img"
          >
            <div className="v4-phone-screen">
              <div className="v4-phone-status" aria-hidden="true">
                <span>9:41</span>
                <span className="v4-phone-signal">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="v4-phone-battery" />
              </div>

              <div className="v4-app-top">
                <span className="v4-app-brand">
                  <BagIcon size={14} />
                  otlob
                </span>
                <span className="v4-app-language">{copy.language}</span>
              </div>

              <div className="v4-app-greeting">
                <span>{copy.greeting}</span>
                <strong>{copy.prompt}</strong>
              </div>

              <div className="v4-app-search">
                <SearchIcon size={13} />
                <span>{copy.search}</span>
              </div>

              <div className="v4-app-chips">
                {copy.chips.map((chip, index) => (
                  <span className={index === 0 ? "is-active" : ""} key={chip}>
                    {chip}
                  </span>
                ))}
              </div>

              <div className="v4-otto-card">
                <div className="v4-otto-card-top">
                  <span>{copy.ottoLabel}</span>
                  <span className="v4-otto-live">
                    <i />
                    {copy.live}
                  </span>
                </div>
                <div className="v4-otto-main">
                  <span className="v4-otto-avatar">
                    <OttoMark />
                  </span>
                  <div>
                    <strong>{copy.ottoTitle}</strong>
                    <span>{copy.ottoMeta}</span>
                    <small>{copy.ottoLine}</small>
                  </div>
                </div>
                <ol className="v4-order-steps">
                  {copy.steps.map((step, index) => (
                    <li className={index < 2 ? "is-done" : "is-active"} key={step}>
                      <i />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="v4-app-near">{copy.near}</div>
              <div className="v4-restaurant-list">
                {copy.restaurants.map((restaurant, index) => (
                  <div className="v4-restaurant-row" key={restaurant.name}>
                    <FoodGlyph variant={index % 3} />
                    <span>
                      <strong>{restaurant.name}</strong>
                      <small>{restaurant.meta}</small>
                    </span>
                    <ArrowUpRightIcon size={12} />
                  </div>
                ))}
              </div>

              <div className="v4-app-tabs" aria-hidden="true">
                {copy.tabs.map((tab, index) => {
                  const TabIcon = tabIcons[index];
                  return (
                    <span className={index === 2 ? "is-active" : ""} key={tab}>
                      <TabIcon size={13} />
                      <small>{tab}</small>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="v4-otlob-readout" aria-live="polite">
            <span>dir=&quot;{rtl ? "rtl" : "ltr"}&quot;</span>
            <span>surface=&quot;{surface}&quot;</span>
            <span>locale=&quot;{rtl ? "ar-EG" : "en-US"}&quot;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
