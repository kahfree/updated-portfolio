"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

function scrollToWork(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("my-work");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      /* Logic:
         1. 'pb-64' and 'mb-[-200px]' makes the hitbox physically taller than it looks 
            without pushing the next section down.
         2. 'z-10' and 'relative' ensures the spotlight stays behind your text 
            but can slide behind the next section's SVG.
      */
      className="flex flex-col items-center gap-10 px-10 pt-42 pb-64 mb-[-200px] text-left w-full relative overflow-visible z-10"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.13) 0%, transparent 70%)",
          top: "-350px",
          left: "-350px",
          x: springX,
          y: springY,
          willChange: "transform",
        }}
      />

      <motion.h1
        className="max-w-lg lg:text-9xl text-7xl font-semibold text-left text-zinc-50 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="typewriter nocaret"></span>&nbsp;
      </motion.h1>

      <motion.p
        className="max-w-md lg:text-xl md:text-lg sm:text-md leading-8 text-zinc-200 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        Fullstack engineer. Knows what useEffect does. Mostly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a
          href="#my-work"
          onClick={scrollToWork}
          className="animate-bounce text-zinc-400 relative cursor-pointer hover:text-zinc-200 transition-colors duration-200 block p-4"
          aria-label="Scroll to My Work"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>

      {/* TRANSITION SVG 
          Place your SVG here at the bottom of this div. 
          The spotlight will follow the mouse behind it because of the 
          padding/negative margin combo above.
      */}
    </div>
  );
}
