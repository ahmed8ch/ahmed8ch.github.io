import type { ReactNode } from "react";

type Brand = "github" | "linkedin";

type PortfolioBrandLinkProps = {
  brand: Brand;
  href: string;
  label: string;
};

const brandPaths: Record<Brand, ReactNode> = {
  github: <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.22c.57.1.78-.25.78-.55v-2.16c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.53-.29-5.19-1.27-5.19-5.65 0-1.25.45-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .95-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.17-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.17 1.82 1.17 3.07 0 4.39-2.67 5.36-5.21 5.64.41.36.77 1.07.77 2.16v3.19c0 .3.2.65.79.54A11.4 11.4 0 0 0 12 .6Z" />,
  linkedin: <path d="M5.1 3.36A2.35 2.35 0 1 1 .4 3.36a2.35 2.35 0 0 1 4.7 0ZM.63 7.1h4.47V21.4H.63V7.1Zm7.2 0h4.29v1.96h.06c.6-1.13 2.07-2.31 4.26-2.31 4.56 0 5.4 3 5.4 6.9v7.75h-4.47v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63v6.99H7.83V7.1Z" />,
};

export function PortfolioBrandLink({ brand, href, label }: PortfolioBrandLinkProps) {
  return (
    <a className="portfolio-brand-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <svg aria-hidden="true" viewBox="0 0 24 24" role="img">{brandPaths[brand]}</svg>
      <span>{label}</span>
    </a>
  );
}
