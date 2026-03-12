import { motion } from "motion/react";
import siteData from "../../data/portfolio";

export default function SelectedWork() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6">
      {/* Section Title */}
      <h2
        className="text-white mb-2 text-center"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          textShadow:
            "0 0 30px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.15)",
        }}
      >
        Selected <span style={{ color: "#C084FC" }}>Work</span>
      </h2>
      <p
        className="text-gray-400 mb-10 text-center"
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
          textShadow: "0 0 10px rgba(0,0,0,0.8)",
        }}
      >
        실제 동작하는 서비스를 만드는 경험
      </p>

      <div className="flex flex-col gap-5 w-full max-w-2xl">
        {siteData.projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="rounded-xl px-6 py-5 group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            whileHover={{
              borderColor: "rgba(168,85,247,0.35)",
              boxShadow: "0 0 25px rgba(168,85,247,0.08)",
            }}
          >
            {/* Project header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3
                  className="font-mono mb-1"
                  style={{
                    color: "#E2E8F0",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    fontWeight: 700,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: "#9CA3AF",
                    fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                    lineHeight: 1.6,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-2 flex-shrink-0 mt-1">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 transition-colors"
                  style={{
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                  title="Live Demo"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C084FC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 transition-colors"
                  style={{
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                  title="GitHub"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#C084FC"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono rounded-full px-2.5 py-0.5"
                  style={{
                    fontSize: "0.65rem",
                    color: "#C084FC",
                    background: "rgba(168,85,247,0.08)",
                    border: "1px solid rgba(168,85,247,0.2)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
