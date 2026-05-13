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
    delta: 50, // കുറച്ചധികം വലിച്ചാൽ മാത്രം പേജ് മാറാൻ (ബാന്നറുകൾ സ്ക്രോൾ ചെയ്യാൻ എളുപ്പത്തിന്)
    swipeDuration: 500,
  });

  // ആനിമേഷൻ തുടങ്ങിയ ശേഷം പഴയ ഇൻഡക്സ് അപ്ഡേറ്റ് ചെയ്യുക
  useEffect(() => {
    prevIndex = currentIndex;
  }, [currentIndex]);

  return (
    // {...handlers} കൊടുത്തതുകൊണ്ട് ഈ സ്ക്രീനിൽ എവിടെ സ്വൈപ്പ് ചെയ്താലും വർക്ക് ആകും
    <div {...handlers} className="w-full min-h-[90vh] overflow-x-hidden">
      <motion.div
        key={pathname}
        // direction അനുസരിച്ച് കൃത്യമായി ഓർഡറിൽ വരും
        initial={{ x: direction * 40, opacity: 0.5 }} 
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