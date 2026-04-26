"use client"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { useCallback } from "react"

export default function Hero() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springX = useSpring(mouseX, { stiffness: 400, damping: 40 })
    const springY = useSpring(mouseY, { stiffness: 400, damping: 40 })

    const spotlight = useMotionTemplate`radial-gradient(600px at ${springX}px ${springY}px, rgba(16, 185, 129, 0.13), transparent 80%)`

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }, [mouseX, mouseY])

    return (
        <div
            className="flex flex-col items-center gap-10 px-10 pt-42 pb-16 text-left w-full relative"
            onMouseMove={handleMouseMove}
        >
          <motion.div className="absolute inset-x-0 top-0 -bottom-60 pointer-events-none" style={{ background: spotlight }} />
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
            className="animate-bounce text-zinc-400 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
    )
}
