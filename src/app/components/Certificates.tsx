import { motion } from "motion/react";
import siteData from "../data/portfolio";
import { CertificateCard } from "./CertificateCard";

export function Certificates() {
  return (
    <section
      id="certificates"
      className="relative py-24 px-6 sm:px-10 lg:px-16"
    >
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
            CERTIFICATES
          </p>
          <h2
            className="text-white mt-3"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            Learning Dashboard
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {siteData.certificates.map((cert, index) => (
            <CertificateCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
