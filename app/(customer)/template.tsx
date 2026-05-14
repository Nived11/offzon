"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const routeOrder = ["/", "/offers", "/explore", "/alerts"];

let prevIndex = 0;

export default function CustomerTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = routeOrder.indexOf(pathname) !== -1 ? routeOrder.indexOf(pathname) : 0;
  
  const direction = currentIndex >= prevIndex ? 1 : -1;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < routeOrder.length - 1) {
        router.push(routeOrder[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        router.push(routeOrder[currentIndex - 1]);
      }
    },
    trackMouse: false,
    delta: 50, 
    swipeDuration: 500,
  });

  useEffect(() => {
    prevIndex = currentIndex;
  }, [currentIndex]);

  return (
    <div {...handlers} className="w-full min-h-[90vh] overflow-x-hidden">
      <motion.div
        key={pathname}
        initial={{ x: direction * 10, opacity: 1 }} 
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 0.35, 
          ease: "easeOut" 
        }}
        className="w-full pb-28 pt-2"
      >
        {children}
      </motion.div>
    </div>
  );
}