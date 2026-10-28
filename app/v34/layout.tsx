import type { Metadata } from "next";
import "./v34.css";

export const metadata: Metadata = {
  title: "Ahmed Hesham Lotfy — Software developer / V3.4",
  description:
    "The V3.4 master portfolio: shipped Flutter and web work, interactive interface specimens, and the track record behind them.",
  keywords: [
    "Ahmed Hesham Lotfy",
    "software developer",
    "Flutter",
    "React",
    "frontend",
    "Giza",
    "portfolio",
  ],
  authors: [{ name: "Ahmed Hesham Lotfy" }],
  openGraph: {
    title: "Ahmed Hesham Lotfy — Software developer / V3.4",
    description:
      "Shipped work, interactive interface specimens, and a product-minded track record.",
    type: "website",
  },
};

export default function V34Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
