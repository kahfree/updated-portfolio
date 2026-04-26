"use client"
import { motion } from "framer-motion"
import Card from "./card"
import myJson from "./projects.json"

// variants with empty objects — this parent exists only to broadcast
// the "hidden"/"visible" state name to its children. FM propagates
// the active variant name down the tree, so every Card's variants
// respond to this parent's whileInView trigger without any extra wiring.
const container = {
    hidden: {},
    visible: {}
}

export default function ProjectsGrid() {
    return (
        /*
          whileInView: triggers the "visible" variant when this element
          enters the viewport, replacing the "hidden" initial state.

          viewport.once: animation fires once only — won't reset if user scrolls away and back.
          viewport.margin: "-80px" means FM waits until the element is 80px inside
          the viewport before triggering, so it doesn't fire too early.
        */
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-5 text-base font-medium justify-items-center pt-15 text-left"
        >
            {myJson.projects.map((project, index) => (
                <div key={project.title} className="w-full lg:last:col-span-2 lg:last:justify-self-center lg:last:w-1/2 2xl:last:col-span-1 2xl:last:w-full">
                    <Card title={project.title} description={project.description} link={project.link} tags={project.tags}/>
                </div>
            ))}
        </motion.div>
    )
}
