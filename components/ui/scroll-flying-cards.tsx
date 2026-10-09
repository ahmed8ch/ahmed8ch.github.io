"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type FlyingCard = { id: string; title: string; description: string; meta?: string; tags?: readonly string[]; icon?: ReactNode };

type ScrollFlyingCardsProps = {
  backgroundText?: string;
  cards: readonly FlyingCard[];
};

export function ScrollFlyingCards({ backgroundText = "WORK", cards }: ScrollFlyingCardsProps) {
  return (
    <div className="scroll-flying-cards" style={{ minHeight: `${(cards.length + 1) * 100}vh` }}>
      <div className="scroll-flying-backdrop">{backgroundText}</div>
      <div className="scroll-flying-stack">
        {cards.map((card, index) => <FlyingCardItem card={card} index={index} key={card.id} />)}
      </div>
    </div>
  );
}

function FlyingCardItem({ card, index }: { card: FlyingCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const even = index % 2 === 0;
  const y = useTransform(scrollYProgress, [0, .4, .6, 1], [220, 0, 0, -220]);
  const rotate = useTransform(scrollYProgress, [0, .4, .6, 1], [even ? -8 : 8, 0, 0, even ? 4 : -4]);
  const opacity = useTransform(scrollYProgress, [0, .3, .7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, .4, .6, 1], [.84, 1, 1, .9]);

  return (
    <div ref={ref} className="scroll-flying-slot">
      <motion.article style={{ y, rotate, opacity, scale }} className="scroll-flying-card">
        <span className="scroll-flying-number">0{index + 1}</span>
        <h3>{card.title}</h3>
        {card.meta && <span className="scroll-flying-meta">{card.meta}</span>}
        <p>{card.description}</p>
        {card.tags && <div className="scroll-flying-tags">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        <div className="scroll-flying-icon">{card.icon}</div>
      </motion.article>
    </div>
  );
}
