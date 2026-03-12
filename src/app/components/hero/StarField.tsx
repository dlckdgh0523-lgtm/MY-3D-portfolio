import { useRef, useEffect } from "react";

interface Star {
  angle: number;
  radius: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  orbitSpeed: number;
  sparkNext: number;
  sparkDuration: number;
  sparking: boolean;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  speed: number;
  tailLen: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

function createMeteor(w: number, h: number): Meteor {
  const edge = Math.floor(Math.random() * 4);
  let x = 0,
    y = 0;
  const angle = Math.random() * Math.PI * 0.6 - Math.PI * 0.3;

  switch (edge) {
    case 0:
      x = Math.random() * w;
      y = -40;
      break;
    case 1:
      x = w + 40;
      y = Math.random() * h;
      break;
    case 2:
      x = Math.random() * w;
      y = h + 40;
      break;
    case 3:
      x = -40;
      y = Math.random() * h;
      break;
  }

  const toCenterAngle = Math.atan2(h / 2 - y, w / 2 - x) + angle;
  const speed = 3 + Math.random() * 4;

  return {
    x,
    y,
    vx: Math.cos(toCenterAngle) * speed,
    vy: Math.sin(toCenterAngle) * speed,
    size: 3 + Math.random() * 5,
    life: 1,
    speed,
    tailLen: 60 + Math.random() * 100,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.08,
    opacity: 0.6 + Math.random() * 0.4,
  };
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
    };
    resize();

    const maxR = Math.sqrt(cx * cx + cy * cy);
    const count = Math.min(Math.floor(w * 0.4), 450);
    const stars: Star[] = [];
    const meteors: Meteor[] = [];
    let nextMeteorTime = 2 + Math.random() * 3;

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * maxR * 0.95 + maxR * 0.05;
      const orbitSpeed =
        (0.012 + Math.random() * 0.018) * (maxR / (radius + 100));

      stars.push({
        angle: Math.random() * Math.PI * 2,
        radius,
        size: Math.random() * 2.2 + 0.4,
        baseOpacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 2 + 0.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        orbitSpeed,
        sparkNext: Math.random() * 8 + 2,
        sparkDuration: 0.3 + Math.random() * 0.4,
        sparking: false,
      });
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      // Stars
      for (const s of stars) {
        s.angle += s.orbitSpeed * 0.016;

        const sx = cx + Math.cos(s.angle) * s.radius;
        const sy = cy + Math.sin(s.angle) * s.radius;

        const baseTwinkle =
          Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;

        if (!s.sparking && t > s.sparkNext) {
          s.sparking = true;
          s.sparkNext = t + s.sparkDuration;
        }
        let sparkMul = 1;
        if (s.sparking) {
          const remain = s.sparkNext - t;
          if (remain <= 0) {
            s.sparking = false;
            s.sparkNext = t + 4 + Math.random() * 10;
          } else {
            const progress = 1 - remain / s.sparkDuration;
            sparkMul = 1 + Math.sin(progress * Math.PI) * 2.5;
          }
        }

        const opacity = Math.min(s.baseOpacity * baseTwinkle * sparkMul, 1);

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 225, 255, ${opacity})`;
        ctx.fill();

        if (s.size > 1.2 || s.sparking) {
          const glowR = s.sparking ? s.size * 4 : s.size * 2.5;
          const glowA = s.sparking ? opacity * 0.18 : opacity * 0.07;
          ctx.beginPath();
          ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 215, 255, ${glowA})`;
          ctx.fill();
        }
      }

      // Meteor spawn
      if (t > nextMeteorTime) {
        const batch = 1 + Math.floor(Math.random() * 3);
        for (let b = 0; b < batch; b++) {
          meteors.push(createMeteor(w, h));
        }
        nextMeteorTime = t + 1.5 + Math.random() * 3;
      }

      // Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];

        m.x += m.vx;
        m.y += m.vy;
        m.rotation += m.rotSpeed;
        m.life -= 0.003;

        if (
          m.life <= 0 ||
          m.x < -200 ||
          m.x > w + 200 ||
          m.y < -200 ||
          m.y > h + 200
        ) {
          meteors.splice(i, 1);
          continue;
        }

        const fadeIn = Math.min(1, (1 - m.life) * 5);
        const fadeOut = Math.min(1, m.life * 4);
        const alpha = m.opacity * fadeIn * fadeOut;

        ctx.save();

        // Tail
        const tailX = m.x - (m.vx / m.speed) * m.tailLen;
        const tailY = m.y - (m.vy / m.speed) * m.tailLen;

        const tailGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        tailGrad.addColorStop(0, `rgba(140, 220, 255, ${alpha * 0.8})`);
        tailGrad.addColorStop(0.2, `rgba(80, 180, 255, ${alpha * 0.5})`);
        tailGrad.addColorStop(0.5, `rgba(60, 140, 230, ${alpha * 0.2})`);
        tailGrad.addColorStop(1, `rgba(40, 100, 200, 0)`);

        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = m.size * 0.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Wide tail glow
        const tailGrad2 = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        tailGrad2.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.15})`);
        tailGrad2.addColorStop(0.4, `rgba(60, 160, 240, ${alpha * 0.06})`);
        tailGrad2.addColorStop(1, `rgba(40, 120, 220, 0)`);
        ctx.strokeStyle = tailGrad2;
        ctx.lineWidth = m.size * 2.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Body
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rotation);

        const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, m.size * 4);
        glowGrad.addColorStop(0, `rgba(160, 230, 255, ${alpha * 0.5})`);
        glowGrad.addColorStop(0.3, `rgba(80, 190, 255, ${alpha * 0.2})`);
        glowGrad.addColorStop(0.6, `rgba(50, 140, 240, ${alpha * 0.06})`);
        glowGrad.addColorStop(1, `rgba(30, 100, 200, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, m.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        ctx.beginPath();
        for (let j = 0; j < 8; j++) {
          const a = (j / 8) * Math.PI * 2;
          const r = m.size * (0.7 + Math.sin(a * 3 + m.rotation * 2) * 0.3);
          if (j === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();

        const bodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, m.size);
        bodyGrad.addColorStop(0, `rgba(220, 245, 255, ${alpha})`);
        bodyGrad.addColorStop(0.4, `rgba(140, 210, 250, ${alpha * 0.9})`);
        bodyGrad.addColorStop(0.7, `rgba(80, 160, 220, ${alpha * 0.7})`);
        bodyGrad.addColorStop(1, `rgba(50, 120, 190, ${alpha * 0.5})`);
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-m.size * 0.2, -m.size * 0.2, m.size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 250, 255, ${alpha * 0.7})`;
        ctx.fill();

        ctx.restore();

        // Debris particles
        for (let p = 0; p < 3; p++) {
          const px =
            m.x - (m.vx / m.speed) * (Math.random() * m.tailLen * 0.4);
          const py =
            m.y - (m.vy / m.speed) * (Math.random() * m.tailLen * 0.4);
          const pOff = (Math.random() - 0.5) * m.size * 4;
          ctx.beginPath();
          ctx.arc(
            px + pOff,
            py + pOff,
            Math.random() * 1.5 + 0.3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(120, 210, 255, ${alpha * Math.random() * 0.5})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}