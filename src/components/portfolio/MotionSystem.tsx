import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export function MotionSystem() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 170, damping: 24, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 170, damping: 24, mass: 0.35 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, anchors: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovering(Boolean((e.target as HTMLElement).closest("a, button, .project-card")));
    };
    window.addEventListener("pointermove", move);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.removeEventListener("pointermove", move);
    };
  }, [reduced, x, y]);
  if (reduced) return null;
  return (
    <motion.div
      className="ai-cursor"
      style={{ x: sx, y: sy }}
      animate={{ scale: hovering ? 2.2 : 1 }}
      aria-hidden="true"
    >
      <span />
    </motion.div>
  );
}
export function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (sessionStorage.getItem("portfolio-booted") || reduced) {
      setVisible(false);
      return;
    }
    let step = 0;
    const interval = window.setInterval(() => {
      step += 10;
      setProgress(step);
      if (step >= 100) {
        window.clearInterval(interval);
        sessionStorage.setItem("portfolio-booted", "1");
        window.setTimeout(() => setVisible(false), 180);
      }
    }, 65);
    return () => window.clearInterval(interval);
  }, [reduced]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6 }}
          aria-label="Starting portfolio"
        >
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={36} strokeWidth={1} />
          </motion.div>
          <span className="eyebrow">INITIALIZING YOUR UNIVERSE</span>
          <span className="boot-number">
            {String(progress).padStart(3, "0")}
            <small>%</small>
          </span>
          <div className="boot-line">
            <motion.span animate={{ scaleX: progress / 100 }} />
          </div>
          <span className="mono-small">
            {progress < 40
              ? "CONNECTING NEURAL SYSTEMS"
              : progress < 80
                ? "ACTIVATING PARTICLE FIELD"
                : "ALL SYSTEMS NOMINAL"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
