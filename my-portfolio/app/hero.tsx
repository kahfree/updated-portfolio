"use client";

import { motion, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useCallback } from "react";
import {
  ORB_FLEE_RADIUS,
  ORB_FLEE_MIN_DISTANCE,
  ORB_FLEE_MAX_TRIES,
  ORB_FLEE_COOLDOWN_MS,
  ORB_SPRING_STIFFNESS,
  ORB_SPRING_DAMPING,
  ORB_EDGE_PADDING,
  ORB_HERO_HEIGHT_FALLBACK_FRACTION,
  ORB_SIZE,
  ORB_BLINK_IDLE_THRESHOLD_MS,
  ORB_BLINK_INTERVAL_MS,
  ORB_BLINK_DIM_OPACITY,
  ORB_BLINK_DURATION,
  HEADING_ENTRANCE_DURATION,
  HEADING_ENTRANCE_OFFSET_Y,
  SUBTITLE_ENTRANCE_DURATION,
  SUBTITLE_ENTRANCE_DELAY,
  SUBTITLE_ENTRANCE_OFFSET_Y,
  ARROW_ENTRANCE_DURATION,
  ARROW_ENTRANCE_DELAY,
  SCROLL_ARROW_SIZE,
} from "./hero.constants";

function scrollToWork(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("my-work");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const dotX = useSpring(rawX, { stiffness: ORB_SPRING_STIFFNESS, damping: ORB_SPRING_DAMPING });
  const dotY = useSpring(rawY, { stiffness: ORB_SPRING_STIFFNESS, damping: ORB_SPRING_DAMPING });

  const orbOpacity = useMotionValue(1);
  const fleeing = useRef(false);
  const lastFleeTime = useRef(Date.now());

  const flee = useCallback((cursorRelX: number, cursorRelY: number, heroW: number, heroH: number) => {
    lastFleeTime.current = Date.now();
    let x: number, y: number, dist: number, tries = 0;
    do {
      x = ORB_EDGE_PADDING + Math.random() * (heroW - ORB_EDGE_PADDING * 2);
      y = ORB_EDGE_PADDING + Math.random() * (heroH - ORB_EDGE_PADDING * 2);
      dist = Math.hypot(x - cursorRelX, y - cursorRelY);
      tries++;
    } while (dist < ORB_FLEE_MIN_DISTANCE && tries < ORB_FLEE_MAX_TRIES);
    rawX.set(x);
    rawY.set(y);
  }, [rawX, rawY]);

  useEffect(() => {
    rawX.set(ORB_EDGE_PADDING + Math.random() * (window.innerWidth - ORB_EDGE_PADDING * 2));
    rawY.set(ORB_EDGE_PADDING + Math.random() * (window.innerHeight * ORB_HERO_HEIGHT_FALLBACK_FRACTION - ORB_EDGE_PADDING * 2));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastFleeTime.current >= ORB_BLINK_IDLE_THRESHOLD_MS) {
        animate(orbOpacity, [1, ORB_BLINK_DIM_OPACITY, 1, ORB_BLINK_DIM_OPACITY, 1], {
          duration: ORB_BLINK_DURATION,
          ease: "easeInOut",
        });
      }
    }, ORB_BLINK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [orbOpacity]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const hero = heroRef.current;
      if (!hero || fleeing.current) return;
      const rect = hero.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) return;
      const dist = Math.hypot(relX - rawX.get(), relY - rawY.get());
      if (dist < ORB_FLEE_RADIUS) {
        fleeing.current = true;
        flee(relX, relY, rect.width, rect.height);
        setTimeout(() => { fleeing.current = false; }, ORB_FLEE_COOLDOWN_MS);
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [flee, rawX, rawY]);

  return (
    <div
      ref={heroRef}
      className="flex flex-col items-center gap-10 px-10 pt-42 pb-64 mb-[-200px] text-left w-full relative overflow-visible z-10"
    >
      <motion.div
          className="absolute top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: dotX,
            y: dotY,
            opacity: orbOpacity,
            translateX: "-50%",
            translateY: "-50%",
            width: ORB_SIZE,
            height: ORB_SIZE,
            background: "radial-gradient(circle, #6ee7b7 0%, rgba(52,211,153,0.7) 45%, transparent 100%)",
            boxShadow: "0 0 18px 7px rgba(52,211,153,0.45), 0 0 36px 14px rgba(16,185,129,0.2)",
          }}
        />

      <motion.h1
        className="max-w-lg lg:text-9xl text-7xl font-semibold text-left text-zinc-50 relative"
        initial={{ opacity: 0, y: HEADING_ENTRANCE_OFFSET_Y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HEADING_ENTRANCE_DURATION, ease: "easeOut" }}
      >
        <span className="sr-only">Ethan Caffrey</span>
        <span aria-hidden="true" className="typewriter nocaret"></span>&nbsp;
      </motion.h1>

      <motion.p
        className="max-w-md lg:text-xl md:text-lg sm:text-md leading-8 text-zinc-200 text-center relative"
        initial={{ opacity: 0, y: SUBTITLE_ENTRANCE_OFFSET_Y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: SUBTITLE_ENTRANCE_DURATION, delay: SUBTITLE_ENTRANCE_DELAY, ease: "easeOut" }}
      >
        Fullstack engineer. Knows what useEffect does. Mostly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ARROW_ENTRANCE_DURATION, delay: ARROW_ENTRANCE_DELAY }}
      >
        <a
          href="#my-work"
          onClick={scrollToWork}
          className="animate-bounce text-zinc-400 hover:text-zinc-200 transition-colors duration-200 block p-4"
          aria-label="Scroll to My Work"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={SCROLL_ARROW_SIZE}
            height={SCROLL_ARROW_SIZE}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
