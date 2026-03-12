import { motion } from "motion/react";
import siteData from "../data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] p-8 md:p-12"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 0 32px rgba(120, 100, 255, 0.08)",
          }}
        >
          <p
            className="text-[#b8b9ff]"
            style={{ fontSize: "0.875rem", letterSpacing: "0.24em" }}
          >
            ABOUT
          </p>

          <h2
            className="text-white mt-4"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            {siteData.aboutTitle}
          </h2>

          <p
            className="mt-6 text-white/70 max-w-[860px]"
            style={{ fontSize: "1.05rem", lineHeight: 2 }}
          >
            {siteData.aboutDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
