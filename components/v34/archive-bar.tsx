"use client";

import { useEffect, useState } from "react";
import { archiveLinks } from "@/data/v34";
import { withBasePath } from "@/lib/base-path";
import { ArrowUpRightIcon, ChevronDownIcon } from "./icons";

export function ArchiveBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="v4-archive">
      <button
        aria-controls="v4-archive-list"
        aria-expanded={open}
        className="v4-archive-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="v4-archive-prompt">guest@ahmed8ch:~$</span>
        <span className="v4-archive-title">Design Archives / v1.0 — v3.3</span>
        <span className="v4-archive-current">current / v3.4</span>
        <ChevronDownIcon className={open ? "is-open" : ""} size={15} />
      </button>

      {open && (
        <div className="v4-archive-panel" id="v4-archive-list">
          <div className="v4-archive-panel-head">
            <span>Archived routes / all live</span>
            <span>Select a previous build</span>
          </div>
          <div className="v4-archive-links">
            {archiveLinks.map((link) => (
              <a href={withBasePath(link.href)} key={link.href}>
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.description}</small>
                </span>
                <ArrowUpRightIcon size={13} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
