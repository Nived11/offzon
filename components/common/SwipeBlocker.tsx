"use client";
import React, { useRef, useEffect } from "react";

interface SwipeBlockerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SwipeBlocker({ children, className = "", style }: SwipeBlockerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prevent = (e: TouchEvent) => e.stopPropagation();
    const el = ref.current;
    if (el) {
      el.addEventListener("touchstart", prevent, { passive: true });
      el.addEventListener("touchmove", prevent, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("touchstart", prevent);
        el.removeEventListener("touchmove", prevent);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}