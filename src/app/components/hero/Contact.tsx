import { motion } from "motion/react";
import siteData from "../../data/portfolio";

const links = [
  {
    label: "Email",
    value: siteData.email,
    href: `mailto:${siteData.email}`,
    icon: (
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
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: siteData.githubUrl.replace("https://github.com/", "@"),
    href: siteData.githubUrl,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#67E8F9">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    value: siteData.blogUrl.replace("https://", ""),
    href: siteData.blogUrl,
    icon: (
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
  },
  {
    label: "Resume",
    value: "Download CV",
    href: siteData.resumeUrl,
    icon: (
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="12" y2="18" />
        <line x1="15" y1="15" x2="12" y2="18" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6">
      {/* Title */}
      <h2
        className="text-white mb-2 text-center"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 700,
          textShadow:
            "0 0 30px rgba(74,222,128,0.4), 0 0 60px rgba(74,222,128,0.15)",
        }}
      >
        Get in <span style={{ color: "#4ADE80" }}>Touch</span>
      </h2>
      <p
        className="text-gray-400 mb-10 text-center"
        style={{
          fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
          textShadow: "0 0 10px rgba(0,0,0,0.8)",
        }}
      >
        함께 만들고 싶은 것이 있다면 언제든 연락하세요
      </p>

      {/* Contact links */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-xl px-5 py-4 flex items-center gap-4 group cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            whileHover={{
              borderColor: "rgba(74,222,128,0.35)",
              boxShadow: "0 0 20px rgba(74,222,128,0.08)",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              {link.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <span
                className="font-mono block mb-0.5"
                style={{
                  color: "#4ADE80",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  opacity: 0.8,
                }}
              >
                {link.label}
              </span>
              <span
                className="font-mono block truncate"
                style={{
                  color: "#E2E8F0",
                  fontSize: "0.85rem",
                }}
              >
                {link.value}
              </span>
            </div>

            {/* Arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ADE80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        ))}
      </div>

      {/* Footer message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.6 }}
        className="mt-8 font-mono text-center"
        style={{
          color: "#9CA3AF",
          fontSize: "0.7rem",
          letterSpacing: "0.05em",
        }}
      >
        &copy; {new Date().getFullYear()} {siteData.name}. Built with passion.
      </motion.p>
    </div>
  );
}
