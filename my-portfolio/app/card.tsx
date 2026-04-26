"use client"
import { motion } from "framer-motion"
import { DiGithubBadge } from "react-icons/di";

interface ICardProps {
    title: string,
    description: string,
    link: string,
    tags: string[],
}

export default function Card(props: ICardProps) {
    const { title, description, link, tags } = props
    return (
        <div className="h-full hover:-translate-y-1.5 hover:shadow-xl transition-[transform,box-shadow] duration-150 rounded-3xl" style={{ willChange: "transform" }}>
        {/*
          variants: a named map of animation states { hidden: {...}, visible: {...} }.
          Instead of inline initial/animate values, you name states and reference them
          by string. The parent ProjectsGrid sets initial="hidden" whileInView="visible",
          and FM propagates those state names down to all children that have matching
          variants — so this card animates in sync with its siblings automatically.
        */}
        <motion.div
            className="flex flex-col h-full rounded-3xl overflow-hidden lg:text-center bg-[#f5f0e8] border border-stone-300"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="h-1 bg-emerald-600 w-full" />
            <div className="flex-grow px-6 pt-5 pb-2">
                <div className="font-bold text-2xl mb-2 text-black">{title}</div>
                <p className="text-stone-600 text-base leading-relaxed">{description}</p>
                <div className="border-t border-stone-200 my-4" />
                <div>
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-block bg-amber-400/10 border border-amber-400/50 text-amber-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-amber-400/20 hover:border-amber-400 hover:shadow-[0_0_10px_rgba(245,158,11,0.45)] transition-all duration-200"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="px-6 pb-5 pt-2 flex justify-center">
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn-shimmer flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 text-white text-sm font-semibold hover:bg-stone-700 transition-colors duration-200">
                    <DiGithubBadge className="text-xl" />
                    View on GitHub
                </a>
            </div>
        </motion.div>
        </div>
    )
}
