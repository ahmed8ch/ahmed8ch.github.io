import type { ReactNode } from "react";

export type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

type StrokeIconProps = IconProps & {
  children: ReactNode;
};

function StrokeIcon({ size = 18, className, strokeWidth = 1.5, children }: StrokeIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

type FillIconProps = IconProps & {
  children: ReactNode;
};

function FillIcon({ size = 18, className, children }: FillIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6.5 17.5 17.5 6.5" />
      <path d="M9 6.5h8.5V15" />
    </StrokeIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </StrokeIcon>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </StrokeIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </StrokeIcon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </StrokeIcon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20.4 14.4A8.6 8.6 0 0 1 9.6 3.6a8.6 8.6 0 1 0 10.8 10.8Z" />
    </StrokeIcon>
  );
}

export function PrinterIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7 8V3.5h10V8" />
      <rect height="9" rx="1.5" width="16" x="4" y="8" />
      <path d="M7 14h10v6.5H7Z" />
      <path d="M17 11h.01" />
    </StrokeIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect height="13" rx="1.5" width="17" x="3.5" y="5.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </StrokeIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M8 3.5h2l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v2A2.5 2.5 0 0 1 18 18.5 16 16 0 0 1 5.5 6 2.5 2.5 0 0 1 8 3.5Z" />
    </StrokeIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </StrokeIcon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 14v4.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 5 5h4.5" />
    </StrokeIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </StrokeIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </StrokeIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </StrokeIcon>
  );
}

export function ResetIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 5v5h5" />
      <path d="M5.5 15a8 8 0 1 0 .8-8.2L4 10" />
    </StrokeIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </StrokeIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </StrokeIcon>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7.5 18.5h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.7 1.5 3.5 3.5 0 0 0 1.3 6.5Z" />
    </StrokeIcon>
  );
}

export function RainIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7.5 15.5h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.7 1.5 3.5 3.5 0 0 0 1.3 6.5Z" />
      <path d="M8 19v1.5M12 19v1.5M16 19v1.5" />
    </StrokeIcon>
  );
}

export function StormIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7.5 15.5h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.7 1.5 3.5 3.5 0 0 0 1.3 6.5Z" />
      <path d="m12.5 17.5-2 4h4l-2 3" />
    </StrokeIcon>
  );
}

export function FogIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M7.5 14.5h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.7 1.5 3.5 3.5 0 0 0 1.3 6.5Z" />
      <path d="M4 19h16M6 22h12" />
    </StrokeIcon>
  );
}

export function GhostIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 20V10a6 6 0 0 1 12 0v10l-2.4-1.6L13.2 20l-2.4-1.6L8.4 20Z" />
      <circle cx="9.5" cy="10" fill="currentColor" r=".9" stroke="none" />
      <circle cx="14.5" cy="10" fill="currentColor" r=".9" stroke="none" />
      <path d="M10 13.5c1.2 1 2.8 1 4 0" />
    </StrokeIcon>
  );
}

export function PyramidIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m12 3 9 17H3Z" />
      <path d="m12 3 2.6 17M12 3 9.4 20" />
      <path d="M7.2 14h9.6" />
    </StrokeIcon>
  );
}

export function BidiIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M3.5 7.5h12M3.5 11.5h8" />
      <path d="m13.5 4.5 3 3-3 3" />
      <path d="M20.5 16.5h-12M20.5 12.5h-8" />
      <path d="m10.5 13.5-3 3 3 3" />
    </StrokeIcon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 10v9h12v-9" />
    </StrokeIcon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </StrokeIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </StrokeIcon>
  );
}

export function BookmarkIcon({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <StrokeIcon {...props} strokeWidth={strokeWidth}>
      <path d="M6 4h12v17l-6-4-6 4V4Z" />
    </StrokeIcon>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.5 9.5-1.6 4.4-4.4 1.6 1.6-4.4 4.4-1.6Z" />
    </StrokeIcon>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2v-17Z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </StrokeIcon>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M12 .6a11.4 11.4 0 0 0-3.6 22.22c.57.1.78-.25.78-.55v-2.16c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.53-.29-5.19-1.27-5.19-5.65 0-1.25.45-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .95-.31 3.12 1.17a10.8 10.8 0 0 1 5.68 0c2.17-1.48 3.12-1.17 3.12-1.17.62 1.58.23 2.74.11 3.03.73.8 1.17 1.82 1.17 3.07 0 4.39-2.67 5.36-5.21 5.64.41.36.77 1.07.77 2.16v3.19c0 .3.2.65.79.54A11.4 11.4 0 0 0 12 .6Z" />
    </FillIcon>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <FillIcon {...props}>
      <path d="M5.1 3.36A2.35 2.35 0 1 1 .4 3.36a2.35 2.35 0 0 1 4.7 0ZM.63 7.1h4.47V21.4H.63V7.1Zm7.2 0h4.29v1.96h.06c.6-1.13 2.07-2.31 4.26-2.31 4.56 0 5.4 3 5.4 6.9v7.75h-4.47v-6.87c0-1.64-.03-3.75-2.29-3.75-2.29 0-2.64 1.79-2.64 3.63v6.99H7.83V7.1Z" />
    </FillIcon>
  );
}
