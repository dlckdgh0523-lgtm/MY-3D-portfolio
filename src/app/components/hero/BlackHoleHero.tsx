import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import siteData from "../../data/portfolio";
import StarField from "./StarField";
import About from "./About";
import SelectedWork from "./SelectedWork";
import TechStack from "./TechStack";
import Contact from "./Contact";

// ── JS method particle helpers ──
const jsMethods = siteData.floatingMethods.map((m) =>
  m.startsWith(".") ? m : `.${m}`
);

const particles = [...jsMethods, ...jsMethods, ...jsMethods];

// ── Pre-generate stable particle configs (avoids re-randomizing on re-render) ──
const particleConfigs = particles.map((method, index) => {
  const angle = Math.random() * Math.PI * 2;
  const radius = 380 + Math.random() * 180;
  return {
    method,
    index,
    startX: Math.cos(angle) * radius,
    startY: Math.sin(angle) * radius,
    duration: 10 + Math.random() * 8, // 10~18s — much slower, contemplative spiral
    delay: Math.random() * 10,
    initialScale: Math.random() * 0.6 + 0.8, // 0.8~1.4
  };
});

// ── Sections layout ──
const SECTIONS = [
  { id: "about", ry: -35, rx: 0 },
  { id: "center", ry: 0, rx: 0 },
  { id: "work", ry: 35, rx: 0 },
  { id: "techstack", ry: 0, rx: -35 },
  { id: "contact", ry: 0, rx: 35 },
] as const;

function findClosestSection(ry: number, rx: number) {
  let closest = SECTIONS[1];
  let minDist = Infinity;
  for (const s of SECTIONS) {
    const d = Math.sqrt((ry - s.ry) ** 2 + (rx - s.rx) ** 2);
    if (d < minDist) {
      minDist = d;
      closest = s;
    }
  }
  return { closest, minDist };
}

// ── Navigation indicator arrows ──
interface NavHintProps {
  direction: "left" | "right" | "up" | "down";
  label: string;
  visible: boolean;
}

function NavHint({ direction, label, visible }: NavHintProps) {
  const posStyle: Record<string, React.CSSProperties> = {
    left: {
      left: 24,
      top: "50%",
      transform: "translateY(-50%)",
    },
    right: {
      right: 24,
      top: "50%",
      transform: "translateY(-50%)",
    },
    up: {
      top: 80,
      left: "50%",
      transform: "translateX(-50%)",
    },
    down: {
      bottom: 32,
      left: "50%",
      transform: "translateX(-50%)",
    },
  };
  const arrows: Record<string, string> = {
    left: "\u2190",
    right: "\u2192",
    up: "\u2191",
    down: "\u2193",
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 50,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
        ...posStyle[direction],
      }}
      animate={{ opacity: visible ? 0.7 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <span
        style={{
          fontFamily: "monospace",
          color: "#67e8f9",
          fontSize: "0.8rem",
          textShadow: "0 0 10px rgba(34,211,238,0.5)",
        }}
      >
        {arrows[direction]} {label}
      </span>
    </motion.div>
  );
}

// ── Section 3D wrapper ──
interface Section3DProps {
  sectionRY: number;
  sectionRX: number;
  camRY: ReturnType<typeof useSpring>;
  camRX: ReturnType<typeof useSpring>;
  children: React.ReactNode;
  zIndex?: number;
}

function Section3D({
  sectionRY,
  sectionRX,
  camRY,
  camRX,
  children,
  zIndex = 5,
}: Section3DProps) {
  const opacity = useTransform(
    [camRY, camRX] as any,
    ([ry, rx]: number[]) => {
      const dist = Math.sqrt(
        (ry - sectionRY) ** 2 + (rx - sectionRX) ** 2
      );
      if (dist < 12) return 1;
      if (dist < 35) return Math.max(0, 1 - (dist - 12) / 23);
      return 0;
    }
  );

  const scale = useTransform(
    [camRY, camRX] as any,
    ([ry, rx]: number[]) => {
      const dist = Math.sqrt(
        (ry - sectionRY) ** 2 + (rx - sectionRX) ** 2
      );
      if (dist < 12) return 1;
      if (dist < 35) return 0.8 + 0.2 * Math.max(0, 1 - (dist - 12) / 23);
      return 0.7;
    }
  );

  const tx = useTransform(camRY, (ry: number) => (sectionRY - ry) * 30);
  const ty = useTransform(camRX, (rx: number) => (sectionRX - rx) * 30);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex,
        opacity,
        scale,
        x: tx,
        y: ty,
      }}
    >
      <div style={{ pointerEvents: "auto", maxHeight: "85vh", overflowY: "auto" }} className="scrollbar-hide">{children}</div>
    </motion.div>
  );
}

// ── MAIN HERO COMPONENT ──
export default function BlackHoleHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const rawRY = useMotionValue(0);
  const rawRX = useMotionValue(0);

  const camRY = useSpring(rawRY, { stiffness: 80, damping: 25, mass: 0.9 });
  const camRX = useSpring(rawRX, { stiffness: 80, damping: 25, mass: 0.9 });

  const [currentSection, setCurrentSection] = useState("center");

  useEffect(() => {
    const unsub = camRY.on("change", () => {
      const ry = camRY.get();
      const rx = camRX.get();
      const { closest } = findClosestSection(ry, rx);
      setCurrentSection(closest.id);
    });
    return unsub;
  }, [camRY, camRX]);

  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const snapToNearest = () => {
    const ry = rawRY.get();
    const rx = rawRX.get();
    const { closest, minDist } = findClosestSection(ry, rx);
    if (minDist > 3) {
      rawRY.set(closest.ry);
      rawRX.set(closest.rx);
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.15;
      const newRY = Math.max(
        -45,
        Math.min(45, rawRY.get() + dx * sensitivity)
      );
      const newRX = Math.max(
        -45,
        Math.min(45, rawRX.get() + dy * sensitivity)
      );
      rawRY.set(newRY);
      rawRX.set(newRX);
    };

    const onUp = () => {
      draggingRef.current = false;
      setIsDragging(false);
      snapTimerRef.current = setTimeout(snapToNearest, 600);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Stars background - z-index 1 */}
      <StarField />

      {/* BlackHole (center) - z-index 5 */}
      <Section3D
        sectionRY={0}
        sectionRX={0}
        camRY={camRY}
        camRX={camRX}
        zIndex={5}
      >
        <div
          style={{
            position: "relative",
            width: 600,
            height: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Black Hole visuals */}
          {/* Outer glow */}
          <div
            style={{
              position: "absolute",
              width: 380,
              height: 380,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(255,140,50,0.035) 0%, rgba(255,110,40,0.015) 20%, rgba(255,80,20,0.004) 40%, transparent 55%)",
            }}
          />
          {/* Accretion disk */}
          <div
            style={{
              position: "absolute",
              width: 480,
              height: 480,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, transparent 35%, rgba(255,150,50,0.08) 42%, rgba(255,120,40,0.22) 47%, rgba(255,110,30,0.32) 50%, rgba(255,130,50,0.22) 53%, rgba(255,160,60,0.08) 58%, rgba(200,120,40,0.03) 66%, rgba(150,90,30,0.008) 72%, transparent 78%)",
              boxShadow:
                "0 0 60px 20px rgba(255,140,50,0.012), 0 0 100px 40px rgba(255,100,30,0.005), inset 0 0 40px 12px rgba(255,140,60,0.015)",
            }}
          />
          {/* Photon ring */}
          <div
            style={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "transparent",
              border: "1px solid rgba(255,220,180,0.12)",
              boxShadow:
                "0 0 30px 8px rgba(255,200,150,0.08), 0 0 60px 15px rgba(255,180,130,0.04), inset 0 0 25px 6px rgba(255,200,150,0.05)",
            }}
          />
          {/* Dark core */}
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, #000 50%, rgba(0,0,0,0.98) 65%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.4) 90%, transparent 100%)",
              boxShadow: "0 0 60px 30px rgba(0,0,0,0.7), 0 0 100px 50px rgba(0,0,0,0.3)",
            }}
          />

          {/* Swirling JS method particles */}
          {particleConfigs.map((p) => (
            <motion.div
              key={`${p.method}-${p.index}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                fontFamily: "monospace",
                color: "#67e8f9",
                fontSize: "clamp(0.9rem, 1.6vw, 1.35rem)",
                fontWeight: 700,
                letterSpacing: "0.05em",
                pointerEvents: "none",
                zIndex: 10,
                whiteSpace: "nowrap",
                willChange: "transform, opacity, filter",
              }}
              initial={{
                x: p.startX,
                y: p.startY,
                scale: p.initialScale,
                opacity: 0,
                filter: "blur(1px)",
              }}
              animate={{
                x: 0,
                y: 0,
                scale: [
                  p.initialScale,          // 0% — full size, just appeared
                  p.initialScale * 0.92,    // 15% — barely shrinking
                  p.initialScale * 0.75,    // 35% — noticeably smaller
                  p.initialScale * 0.5,     // 55% — half size, receding
                  p.initialScale * 0.2,     // 80% — very small, far away
                  0,                        // 100% — gone
                ],
                rotate: 480,
                opacity: [
                  0,      // 0% — fade in
                  0.9,    // 15% — clearly visible
                  0.8,    // 35% — still bright
                  0.5,    // 55% — fading with distance
                  0.15,   // 80% — barely visible
                  0,      // 100% — vanished
                ],
                filter: [
                  "blur(0.5px)",   // 0% — slight entrance softness
                  "blur(0px)",     // 15% — sharpest, closest to viewer
                  "blur(0.8px)",   // 35% — starting to lose focus
                  "blur(2.5px)",   // 55% — clearly going deeper
                  "blur(5px)",     // 80% — very blurry, far away
                  "blur(8px)",     // 100% — dissolved into the void
                ],
                textShadow: [
                  "0 0 8px rgba(103,232,249,0.9), 0 0 20px rgba(34,211,238,0.5), 0 0 35px rgba(34,211,238,0.2)",
                  "0 0 6px rgba(103,232,249,0.7), 0 0 14px rgba(34,211,238,0.4)",
                  "0 0 4px rgba(103,232,249,0.4), 0 0 8px rgba(34,211,238,0.2)",
                  "0 0 2px rgba(103,232,249,0.2), 0 0 4px rgba(34,211,238,0.08)",
                  "0 0 1px rgba(103,232,249,0.05)",
                  "0 0 0px rgba(103,232,249,0)",
                ],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {p.method}
            </motion.div>
          ))}

          {/* Main copy */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              pointerEvents: "none",
              textAlign: "center",
              width: "max-content",
              maxWidth: "90vw",
            }}
          >
            <h1
              style={{
                color: "white",
                marginBottom: 16,
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                textShadow:
                  "0 0 40px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              Node.js{" "}
              <span
                style={{
                  color: "#22d3ee",
                  textShadow:
                    "0 0 20px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.15)",
                }}
              >
                backend
              </span>
            </h1>
            <p
              style={{
                color: "#d1d5db",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                textShadow: "0 0 20px rgba(0,0,0,0.8)",
              }}
            >
              {"배우는 것을 흡수하여 자신의 것으로 만듭니다."}
            </p>
          </div>
        </div>
      </Section3D>

      {/* About (left - drag left) */}
      <Section3D
        sectionRY={-35}
        sectionRX={0}
        camRY={camRY}
        camRX={camRX}
        zIndex={4}
      >
        <About />
      </Section3D>

      {/* Work (right - drag right) */}
      <Section3D
        sectionRY={35}
        sectionRX={0}
        camRY={camRY}
        camRX={camRX}
        zIndex={4}
      >
        <SelectedWork />
      </Section3D>

      {/* TechStack (up - drag up) */}
      <Section3D
        sectionRY={0}
        sectionRX={-35}
        camRY={camRY}
        camRX={camRX}
        zIndex={4}
      >
        <TechStack />
      </Section3D>

      {/* Contact (right - drag right) */}
      <Section3D
        sectionRY={0}
        sectionRX={35}
        camRY={camRY}
        camRX={camRX}
        zIndex={4}
      >
        <Contact />
      </Section3D>

      {/* Navigation hints */}
      {/* From center */}
      <NavHint direction="left" label="About" visible={currentSection === "center"} />
      <NavHint direction="right" label="Work" visible={currentSection === "center"} />
      <NavHint direction="up" label="Tech Stack" visible={currentSection === "center"} />
      <NavHint direction="down" label="Contact" visible={currentSection === "center"} />

      {/* From about */}
      <NavHint direction="right" label="Black Hole" visible={currentSection === "about"} />
      <NavHint direction="up" label="Tech Stack" visible={currentSection === "about"} />
      <NavHint direction="down" label="Contact" visible={currentSection === "about"} />

      {/* From work */}
      <NavHint direction="left" label="Black Hole" visible={currentSection === "work"} />
      <NavHint direction="up" label="Tech Stack" visible={currentSection === "work"} />
      <NavHint direction="down" label="Contact" visible={currentSection === "work"} />

      {/* From techstack */}
      <NavHint direction="down" label="Black Hole" visible={currentSection === "techstack"} />
      <NavHint direction="left" label="About" visible={currentSection === "techstack"} />
      <NavHint direction="right" label="Work" visible={currentSection === "techstack"} />

      {/* From contact */}
      <NavHint direction="up" label="Black Hole" visible={currentSection === "contact"} />
      <NavHint direction="left" label="About" visible={currentSection === "contact"} />
      <NavHint direction="right" label="Work" visible={currentSection === "contact"} />

      {/* Drag instruction */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          pointerEvents: "none",
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isDragging ? 0 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(4px)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1.5"
          >
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span
            style={{
              fontFamily: "monospace",
              color: "#67e8f9",
              fontSize: "0.75rem",
              textShadow: "0 0 8px rgba(34,211,238,0.4)",
            }}
          >
            CLICK & DRAG TO EXPLORE
          </span>
        </div>
      </motion.div>
    </section>
  );
}