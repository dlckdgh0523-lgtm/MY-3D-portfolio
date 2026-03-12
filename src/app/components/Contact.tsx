import { motion } from "motion/react";
import siteData from "../data/portfolio";

export function Contact() {
  const links = [
    {
      label: "Email",
      value: siteData.email,
      href: `mailto:${siteData.email}`,
    },
    {
      label: "GitHub",
      value: siteData.githubUrl,
      href: siteData.githubUrl,
    },
    {
      label: "Blog",
      value: siteData.blogUrl,
      href: siteData.blogUrl,
    },
    {
      label: "Resume",
      value: siteData.resumeUrl,
      href: siteData.resumeUrl,
    },
  ];

  return (
    <section
      id="contact"
      className="relative pb-28 pt-8 px-6 sm:px-10 lg:px-16"
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
            CONTACT
          </p>

          <h2
            className="text-white mt-3"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            함께 만들 이야기
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white/75 transition-colors hover:bg-white/[0.08]"
              >
                <span style={{ fontSize: "0.875rem" }}>{link.label}</span>
                <div className="mt-2 text-white" style={{ fontSize: "0.95rem" }}>
                  {link.value}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
