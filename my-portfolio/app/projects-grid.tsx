"use client"
import { motion } from "framer-motion"
import Card from "./card"
import myJson from "./projects.json"

const container = {
    hidden: {},
    visible: {}
}

export default function ProjectsGrid() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-5 text-base font-medium justify-items-center pt-15 text-left"
        >
            {myJson.projects.map((project, index) => (
                <div key={project.title} className="w-full last:col-span-2 last:justify-self-center last:w-1/2 2xl:last:col-span-1 2xl:last:w-full">
                    <Card index={index} title={project.title} description={project.description} link={project.link} tags={project.tags}/>
                </div>
            ))}
        </motion.div>
    )
}
