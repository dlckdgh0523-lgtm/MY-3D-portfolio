import { motion } from "motion/react";
import type { Project } from "../data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="rounded-[28px] p-7 transition hover:-translate-y-1"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 32px rgba(120, 100, 255, 0.08)",
      }}
    >
      <h3
        className="text-white"
        style={{ fontSize: "1.5rem", fontWeight: 600 }}
      >
        {project.title}
      </h3>

      <p
        className="mt-4 text-white/70"
        style={{ fontSize: "0.875rem", lineHeight: 1.85 }}
      >
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[#d8dcff]"
            style={{ fontSize: "0.75rem" }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white/85 transition-colors hover:bg-white/[0.1]"
          style={{ fontSize: "0.875rem" }}
        >
          Live
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white/85 transition-colors hover:bg-white/[0.1]"
          style={{ fontSize: "0.875rem" }}
        >
          GitHub
        </a>
      </div>
    </motion.article>
  );
}
