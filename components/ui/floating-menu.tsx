"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type FloatingMenuItem = {
  label: string;
  href: string;
};

type FloatingMenuProps = {
  items: readonly FloatingMenuItem[];
  className?: string;
  triggerClassName?: string;
  navClassName?: string;
};

export function FloatingMenu({ items, className = "v31-floating-menu", triggerClassName = "v31-floating-trigger", navClassName }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} ${open ? "is-open" : ""}`}>
      <button type="button" className={triggerClassName} onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
        {open ? <X size={17} /> : <Menu size={17} />}
      </button>
      <nav className={navClassName} aria-label="Portfolio sections">
        {items.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
    </div>
  );
}
