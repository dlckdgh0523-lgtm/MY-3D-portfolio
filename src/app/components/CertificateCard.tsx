import { motion } from "motion/react";
import { Award } from "lucide-react";
import type { Certificate } from "../data/portfolio";

interface CertificateCardProps {
  cert: Certificate;
  index: number;
}

export function CertificateCard({ cert, index }: CertificateCardProps) {
  const isPlaceholder =
    !cert.imageUrl || cert.imageUrl.startsWith("YOUR_");

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="overflow-hidden rounded-[28px] transition hover:-translate-y-1"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 32px rgba(120, 100, 255, 0.08)",
      }}
    >
      {/* Thumbnail */}
      <div
        className="flex h-[240px] items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), #0a0c14",
        }}
      >
        {isPlaceholder ? (
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <Award size={40} className="text-[#6366f1]/30" />
            <span
              className="text-white/40"
              style={{ fontSize: "0.8rem" }}
            >
              CERTIFICATE IMAGE
            </span>
          </div>
        ) : (
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3
            className="text-white"
            style={{ fontSize: "1.5rem", fontWeight: 600 }}
          >
            {cert.title}
          </h3>
          <span className="text-white/50" style={{ fontSize: "0.875rem" }}>
            {cert.issuedAt}
          </span>
        </div>

        <p className="mt-2 text-[#cbd2ff]" style={{ fontSize: "0.875rem" }}>
          {cert.issuer}
        </p>

        <p
          className="mt-4 text-white/70"
          style={{ fontSize: "0.875rem", lineHeight: 1.85 }}
        >
          {cert.description}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[#d8dcff]"
              style={{ fontSize: "0.75rem" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-white/85 transition-colors hover:bg-white/[0.1]"
            style={{ fontSize: "0.875rem" }}
          >
            View Credential
          </a>
        </div>
      </div>
    </motion.article>
  );
}
