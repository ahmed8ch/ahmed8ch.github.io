"use client";

import { useEffect, useState } from "react";
import { CloudIcon, FogIcon, MapPinIcon, MoonIcon, RainIcon, StormIcon, SunIcon } from "./icons";

type WeatherState =
  | { status: "loading" }
  | { status: "ready"; temperature: number; code: number; isDay: boolean; label: string }
  | { status: "error" };

const CAIRO = "Africa/Cairo";

const weatherLabels: Record<number, string> = {
  0: "Clear skies",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Severe storm",
};

function weatherKind(code: number): "clear" | "cloud" | "rain" | "storm" | "fog" {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 95) return "storm";
  if (code >= 51) return "rain";
  return "cloud";
}

function WeatherGlyph({ code, isDay }: { code?: number; isDay?: boolean }) {
  if (code === undefined) return <CloudIcon size={22} />;
  const kind = weatherKind(code);
  if (kind === "clear") return isDay === false ? <MoonIcon size={22} /> : <SunIcon size={22} />;
  if (kind === "fog") return <FogIcon size={22} />;
  if (kind === "storm") return <StormIcon size={22} />;
  if (kind === "rain") return <RainIcon size={22} />;
  return <CloudIcon size={22} />;
}

function cairoZone(now: Date | null): string {
  if (!now) return "EEST";
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: CAIRO,
    timeZoneName: "longOffset",
  })
    .formatToParts(now)
    .find((part) => part.type === "timeZoneName")?.value;
  if (offset === "GMT+03:00") return "EEST";
  if (offset === "GMT+02:00") return "EET";
  return offset ? offset.replace("GMT", "UTC") : "EEST";
}

export function TelemetryCard() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=30.0131&longitude=31.2089&current=temperature_2m,weather_code,is_day&timezone=Africa%2FCairo",
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
        return response.json() as Promise<{
          current?: { temperature_2m?: number; weather_code?: number; is_day?: number };
        }>;
      })
      .then((data) => {
        const current = data.current;
        if (typeof current?.temperature_2m !== "number" || typeof current.weather_code !== "number") {
          throw new Error("Weather response was incomplete");
        }
        setWeather({
          status: "ready",
          temperature: current.temperature_2m,
          code: current.weather_code,
          isDay: current.is_day !== 0,
          label: weatherLabels[current.weather_code] ?? "Changing skies",
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setWeather({ status: "error" });
      });
    return () => controller.abort();
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: CAIRO,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(now)
    : "--:--";
  const seconds = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: CAIRO,
        second: "2-digit",
      }).format(now)
    : "--";
  const date = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: CAIRO,
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
        .format(now)
        .toUpperCase()
    : "LOADING DATE";
  const zone = cairoZone(now);

  return (
    <article className="v4-bento-card v4-telemetry" aria-label="Live Giza telemetry">
      <div className="v4-bento-top">
        <span className="v4-label">02 / live telemetry</span>
        <span className="v4-live">
          <span className="v4-live-dot" />
          live
        </span>
      </div>

      <div className="v4-telemetry-clock">
        <time dateTime={now ? now.toISOString() : undefined}>
          {time}
          <span className="v4-telemetry-seconds">:{seconds}</span>
        </time>
      </div>

      <div className="v4-telemetry-meta">
        <span>{zone} / CAIRO</span>
        <span>{date}</span>
      </div>

      <div className="v4-telemetry-weather">
        <span className="v4-weather-glyph">
          <WeatherGlyph code={weather.status === "ready" ? weather.code : undefined} isDay={weather.status === "ready" ? weather.isDay : undefined} />
        </span>
        <span className="v4-weather-temp">
          {weather.status === "ready" ? `${weather.temperature.toFixed(0)}°` : "--°"}
        </span>
        <span className="v4-weather-label">
          {weather.status === "ready" ? weather.label : weather.status === "error" ? "Weather unavailable" : "Reading the sky"}
        </span>
        <span className="v4-weather-place">
          <MapPinIcon size={11} />
          Giza, Egypt
        </span>
      </div>
    </article>
  );
}
