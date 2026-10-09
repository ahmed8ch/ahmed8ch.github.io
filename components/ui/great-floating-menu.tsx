"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/utils";

export type VersionLink = { label: string; href: string; description: string };

type GreatFloatingMenuProps = {
  links: readonly VersionLink[];
  current: string;
};

export function GreatFloatingMenu({ links, current }: GreatFloatingMenuProps) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"left" | "right">("right");
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSide = window.localStorage.getItem("icareer-menu-side");
    if (storedSide === "left" || storedSide === "right") setSide(storedSide);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("icareer-menu-side", side);
  }, [side]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, moved: false };
    setDragging(true);
    setDragX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || !event.currentTarget.hasPointerCapture(drag.pointerId)) return;
    if (Math.abs(event.clientX - drag.startX) > 4) drag.moved = true;
    if (drag.moved) {
      setDragX(Math.max(10, Math.min(window.innerWidth - 190, event.clientX - 89)));
      const nextSide = event.clientX < window.innerWidth / 2 ? "left" : "right";
      setSide(nextSide);
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(false);
    setDragX(null);
    if (drag.moved) {
      event.preventDefault();
      suppressClickRef.current = true;
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      suppressClickRef.current = false;
      return;
    }
    setOpen((value) => !value);
  };

  return (
    <div ref={rootRef} className={cn("great-version-menu", `is-${side}`, dragging && "is-dragging")} style={dragX === null ? undefined : { left: dragX, right: "auto" }}>
      <motion.div
        animate={{ width: open ? 292 : 156, height: open ? 500 : 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={cn("great-version-panel", open && "is-open")}
      >
        <button type="button" className="great-version-trigger" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClick={onClick} aria-expanded={open} aria-label={open ? "Close version menu" : "Open version menu"} title="Drag horizontally to dock this menu">
          <span>{dragging ? "dragging" : "versions"}</span>
          <span className="great-version-action">{open ? "Close" : current}</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="great-version-links" aria-label="Portfolio versions">
              <span className="great-version-label">Explore versions <small>6 routes · scroll</small></span>
              {links.map((link) => (
                <a className={link.label === current ? "is-current" : ""} href={link.href} key={link.href} onClick={() => setOpen(false)}>
                  <strong>{link.label}</strong><small>{link.description}</small>
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
