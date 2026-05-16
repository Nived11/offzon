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
    // e.stopPropagation() മാത്രം ഉപയോഗിക്കുന്നു. ഇത് പേജ് മാറുന്നത് തടയും, 
    // പക്ഷേ സ്ക്രോളിങ്ങിനെ (Scroll Down/Up) ബ്ലോക്ക് ചെയ്യില്ല!
    const prevent = (e: TouchEvent) => e.stopPropagation();
    const el = ref.current;
    
    if (el) {
      el.addEventListener("touchstart", prevent, { passive: true });
      el.addEventListener("touchmove", prevent, { passive: true });
      el.addEventListener("touchend", prevent, { passive: true }); // ഇതും കൂടി ആഡ് ചെയ്തു
    }
    return () => {
      if (el) {
        el.removeEventListener("touchstart", prevent);
        el.removeEventListener("touchmove", prevent);
        el.removeEventListener("touchend", prevent);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}