import { motion } from "motion/react";
import siteData from "../../data/portfolio";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6">
      {/* Section Title */}
      <h2
        className="text-white mb-2 text-center"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          textShadow:
            "0 0 30px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.15)",
        }}
      >
        About <span style={{ color: "#22D3EE" }}>Me</span>
      </h2>
      <p
        className="text-gray-400 mb-8 text-center max-w-lg"
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
          textShadow: "0 0 10px rgba(0,0,0,0.8)",
        }}
      >
        {siteData.aboutTitle}
      </p>

      {/* About Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl px-6 py-5 mb-10 max-w-2xl w-full"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(34,211,238,0.15)",
          boxShadow: "0 0 30px rgba(34,211,238,0.05)",
        }}
      >
        <p
          className="text-gray-300 leading-relaxed text-center"
          style={{
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
          }}
        >
          {siteData.aboutDescription}
        </p>
      </motion.div>

      {/* Learning Dashboard / Certificates */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="h-px flex-1"
            style={{ background: "rgba(34,211,238,0.2)" }}
          />
          <span
            className="font-mono tracking-widest uppercase"
            style={{
              color: "#67E8F9",
              fontSize: "0.7rem",
              textShadow: "0 0 10px rgba(34,211,238,0.4)",
            }}
          >
            Learning Dashboard
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(34,211,238,0.2)" }}
          />
        </div>

        <div className="flex flex-col gap-4">
          {siteData.certificates.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-lg px-5 py-4 flex gap-4 items-start group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                borderColor: "rgba(34,211,238,0.35)",
                boxShadow: "0 0 20px rgba(34,211,238,0.1)",
              }}
            >
              {/* Certificate icon */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  border: "1px solid rgba(34,211,238,0.25)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#67E8F9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 15l-2 5l2-2l2 2l-2-5z" />
                  <circle cx="12" cy="9" r="6" />
                  <path d="M9 9l1.5 1.5L14 7" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono truncate"
                    style={{
                      color: "#E2E8F0",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    {cert.title}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#67E8F9"
                    strokeWidth="2"
                    className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="font-mono"
                    style={{
                      color: "#67E8F9",
                      fontSize: "0.7rem",
                      opacity: 0.8,
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "0.65rem",
                    }}
                  >
                    · {cert.issuedAt}
                  </span>
                </div>
                <p
                  style={{
                    color: "#9CA3AF",
                    fontSize: "0.78rem",
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono rounded-full px-2 py-0.5"
                      style={{
                        fontSize: "0.6rem",
                        color: "#67E8F9",
                        background: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
