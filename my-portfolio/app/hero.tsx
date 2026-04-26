"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

function scrollToWork(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("my-work");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}

const FLEE_RADIUS = 130;
const EDGE_PAD = 60;

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // useMotionValue: a reactive number FM can read without causing React re-renders.
  // Much cheaper than useState for values that change every animation frame.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // useSpring: wraps a MotionValue and returns a new one that "springs" toward
  // the source value. stiffness = how snappy, damping = how much it resists bounce.
  // When rawX changes instantly, dotX follows with a smooth spring animation.
  const dotX = useSpring(rawX, { stiffness: 280, damping: 22 });
  const dotY = useSpring(rawY, { stiffness: 280, damping: 22 });

  const [ready, setReady] = useState(false);
  const fleeing = useRef(false);

  const flee = useCallback((cursorRelX: number, cursorRelY: number, heroW: number, heroH: number) => {
    let x: number, y: number, dist: number, tries = 0;
    do {
      x = EDGE_PAD + Math.random() * (heroW - EDGE_PAD * 2);
      y = EDGE_PAD + Math.random() * (heroH - EDGE_PAD * 2);
      dist = Math.hypot(x - cursorRelX, y - cursorRelY);
      tries++;
    } while (dist < FLEE_RADIUS * 1.8 && tries < 30);
    // .set() directly updates a MotionValue — the spring then animates toward it.
    rawX.set(x);
    rawY.set(y);
  }, [rawX, rawY]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    rawX.set(rect.width * 0.65);
    rawY.set(rect.height * 0.35);
    setReady(true);
  }, [rawX, rawY]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const hero = heroRef.current;
      if (!hero || fleeing.current) return;
      const rect = hero.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      if (relX < 0 || relX > rect.width || relY < 0 || relY > rect.height) return;
      const dist = Math.hypot(relX - rawX.get(), relY - rawY.get());
      if (dist < FLEE_RADIUS) {
        fleeing.current = true;
        flee(relX, relY, rect.width, rect.height);
        setTimeout(() => { fleeing.current = false; }, 500);
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
      {ready && (
        // motion.div = a regular div that FM can animate.
        // Passing a MotionValue to style.x/y lets FM update the CSS transform
        // directly on the DOM node, bypassing React's render cycle entirely.
        <motion.div
          className="absolute top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: dotX,       // FM reads dotX each frame and sets transform: translateX()
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: 12,
            height: 12,
            background: "radial-gradient(circle, #6ee7b7 0%, rgba(52,211,153,0.7) 45%, transparent 100%)",
            boxShadow: "0 0 18px 7px rgba(52,211,153,0.45), 0 0 36px 14px rgba(16,185,129,0.2)",
          }}
        />
      )}

      {/*
        initial: the starting state before the animation plays.
        animate: the target state FM animates toward on mount.
        transition: controls timing — duration in seconds, ease curve, optional delay.
        FM interpolates between initial and animate automatically.
      */}
      <motion.h1
        className="max-w-lg lg:text-9xl text-7xl font-semibold text-left text-zinc-50 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="typewriter nocaret"></span>&nbsp;
      </motion.h1>

      {/* delay: 0.2 staggers this after the h1, creating a cascading entrance */}
      <motion.p
        className="max-w-md lg:text-xl md:text-lg sm:text-md leading-8 text-zinc-200 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        Fullstack engineer. Knows what useEffect does. Mostly.
      </motion.p>

      {/* delay: 0.6 — arrow fades in last, after heading and subtitle have settled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <a
          href="#my-work"
          onClick={scrollToWork}
          className="animate-bounce text-zinc-400 hover:text-zinc-200 transition-colors duration-200 block p-4"
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
    </div>
  );
}
