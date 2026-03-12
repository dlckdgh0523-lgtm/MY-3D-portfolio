import { motion } from "motion/react";
import siteData from "../data/portfolio";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="relative py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p
            className="text-[#b8b9ff]"
            style={{ fontSize: "0.875rem", letterSpacing: "0.24em" }}
          >
            PROJECTS
          </p>
          <h2
            className="text-white mt-3"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            Selected Work
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteData.projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
