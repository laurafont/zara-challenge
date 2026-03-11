"use client";

import type { ReactNode } from "react";
import styles from "./Carousel.module.scss";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function Carousel({
  children,
  className,
  "aria-label": ariaLabel,
}: CarouselProps) {
  return (
    <div
      className={`${styles.carousel} ${className ?? ""}`.trim()}
      role="list"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
