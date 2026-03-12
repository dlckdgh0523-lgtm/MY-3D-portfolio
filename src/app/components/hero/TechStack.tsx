import { motion } from "motion/react";
import siteData from "../../data/portfolio";

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Language: { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.4)", text: "#C084FC", glow: "rgba(168,85,247,0.3)" },
  Frontend: { bg: "rgba(34,211,238,0.12)", border: "rgba(34,211,238,0.4)", text: "#67E8F9", glow: "rgba(34,211,238,0.3)" },
  Backend: { bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.4)", text: "#86EFAC", glow: "rgba(74,222,128,0.3)" },
  Database: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.4)", text: "#FCD34D", glow: "rgba(251,191,36,0.3)" },
  DevOps: { bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.4)", text: "#FDA4AF", glow: "rgba(251,113,133,0.3)" },
  AI: { bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.4)", text: "#93C5FD", glow: "rgba(96,165,250,0.3)" },
};

export default function TechStack() {
  const categories = Array.from(new Set(siteData.techStack.map((t) => t.category)));

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6">
      <h2
        className="text-white mb-2 text-center"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          textShadow: "0 0 30px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.15)",
        }}
      >
        Tech <span style={{ color: "#22D3EE" }}>Stack</span>
      </h2>
      <p
        className="text-gray-400 mb-10 text-center"
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
          textShadow: "0 0 10px rgba(0,0,0,0.8)",
        }}
      >
        끊임없이 확장하는 기술 궤도
      </p>

      <div className="flex flex-wrap gap-8 justify-center">
        {categories.map((cat) => {
          const color = categoryColors[cat] || categoryColors.AI;
          const techs = siteData.techStack.filter((t) => t.category === cat);
          return (
            <div key={cat} className="flex flex-col gap-3 min-w-[140px]">
              <span
                className="text-xs tracking-widest uppercase mb-1"
                style={{ color: color.text, textShadow: `0 0 8px ${color.glow}` }}
              >
                {cat}
              </span>
              {techs.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="relative rounded-lg px-4 py-2.5"
                  style={{
                    background: color.bg,
                    border: `1px solid ${color.border}`,
                    boxShadow: `0 0 12px ${color.glow}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="font-mono"
                      style={{
                        color: color.text,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      {tech.name}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        color: color.text,
                        fontSize: "0.7rem",
                        opacity: 0.7,
                      }}
                    >
                      {tech.level}%
                    </span>
                  </div>
                  {/* Level bar */}
                  <div
                    className="mt-1.5 h-[2px] rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color.text }}
                      initial={{ width: 0 }}
                      animate={{ width: `${tech.level}%` }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
