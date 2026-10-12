import { lazy, Suspense, useEffect, useState, type ReactNode, type FormEvent } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Check,
  Download,
  Github,
  Linkedin,
  MapPin,
  Menu,
  Rocket,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profile, projects, skills } from "@/data/portfolio";
import { BootSequence, MotionSystem } from "./MotionSystem";
const Universe = lazy(() => import("./Universe"));
const navigation = ["About", "Projects", "Skills", "Experience", "Contact"];
const roles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Heading({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span className="dot" />
          {label}
        </span>
        <h2>{children}</h2>
      </div>
      <span className="section-number">/{number}</span>
    </div>
  );
}
function Specks() {
  const reduced = useReducedMotion();
  return (
    <div className="space-specks" aria-hidden="true">
      {Array.from({ length: 35 }, (_, i) => (
        <motion.span
          key={i}
          style={{ left: `${(i * 37.31) % 100}%`, top: `${(i * 17.47) % 100}%` }}
          animate={reduced ? {} : { opacity: [0.15, 0.7, 0.15], y: [0, -20, 0] }}
          transition={{ duration: 8 + (i % 7), repeat: Infinity, delay: i % 5 }}
        />
      ))}
    </div>
  );
}
export default function Portfolio() {
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [role, setRole] = useState(0);
  const [skill, setSkill] = useState(0);
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 45);
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    navigation.forEach((name) => {
      const element = document.getElementById(name.toLowerCase());
      if (element) observer.observe(element);
    });
    const timer = window.setInterval(() => setRole((r) => (r + 1) % roles.length), 3200);
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile.email) {
      setContactStatus("Mission is on standby. A contact email hasn’t been added yet.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const body = `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("New mission — portfolio inquiry")}&body=${encodeURIComponent(body)}`;
    setContactStatus(
      "Your message is ready in your email app. Send it there to complete the transmission.",
    );
  };
  return (
    <main className="portfolio" id="top">
      <a className="sr-only focus:not-sr-only" href="#about">
        Skip to content
      </a>
      <BootSequence />
      <MotionSystem />
      <header className="nav-shell">
        <nav className={`navbar ${compact ? "compact" : ""}`} aria-label="Main navigation">
          <a className="brand" href="#top">
            <span className="brand-icon">
              <Sparkles size={24} strokeWidth={1.4} />
            </span>
            {profile.name}
            <span className="text-primary">.</span>
          </a>
          <div className={`nav-links ${menu ? "open" : ""}`}>
            {navigation.map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                className={active === name.toLowerCase() ? "active" : ""}
                aria-current={active === name.toLowerCase() ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
                {name}
              </a>
            ))}
          </div>
          <span className="nav-status">
            <span className="status-dot" />
            OPEN TO POSSIBILITIES
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </nav>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-top">
          <span className="eyebrow">
            <span className="dot" />
            PERSONAL PORTFOLIO — 2026
          </span>
          <span className="mono-small">
            SYSTEM ONLINE <span className="text-primary">↗</span>
          </span>
        </div>
        <div className="hero-scene">
          <ClientOnly fallback={null}>
            <Suspense fallback={null}>
              <Universe reduced={Boolean(reduced)} />
            </Suspense>
          </ClientOnly>
        </div>
        <div className="core-label left">
          <span className="mono-small">NEURAL CORE / 001</span>
          <span className="mono-small">INTELLIGENCE IN MOTION</span>
        </div>
        <div className="core-label right">
          <span className="mono-small">BUILT TO EXPLORE</span>
          <span className="mono-small">BOUNDLESS BY DESIGN</span>
        </div>
        <div className="hero-content">
          <div className="hero-role">
            <span>✳</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
              >
                {roles[role]}
              </motion.span>
            </AnimatePresence>
          </div>
          <h1 id="hero-title">
            {profile.name}
            <span className="text-primary">.</span>
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <Button asChild className="button" variant="mission">
              <a href="#projects">
                View Projects <ArrowUpRight />
              </a>
            </Button>
            <Button
              className="button"
              variant="outline"
              onClick={() =>
                profile.resume
                  ? window.open(profile.resume, "_blank", "noopener,noreferrer")
                  : setResumeOpen(true)
              }
            >
              Download Resume <Download />
            </Button>
            <Button asChild className="button" variant="ghost">
              <a href="#contact">
                Contact Me <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="hero-bottom container">
            <a href="#about" className="mono-small">
              <motion.span
                animate={reduced ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown size={14} />
              </motion.span>
              SCROLL TO EXPLORE
            </a>
            <span className="mono-small center-note">CURIOSITY IS THE COMPASS.</span>
            <span className="mono-small coordinate">
              BASED ON {profile.location.toUpperCase()}
              <br />
              EXPLORING EVERYWHERE
            </span>
          </div>
        </div>
      </section>
      <section id="about" className="section about">
        <div className="container">
          <Reveal>
            <Heading number="01" label="THE HUMAN BEHIND THE SYSTEM">
              A curious mind.
              <br />
              <em>An infinite universe.</em>
            </Heading>
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-copy">
              <p>{profile.about}</p>
              <p>
                <strong>Always learning. Always building.</strong>
                <br />
                Because the next great idea is somewhere beyond the familiar.
              </p>
              <span className="mono-small">
                <MapPin size={12} />
                {profile.location} <span>·</span> OPEN TO COLLABORATION
              </span>
            </Reveal>
            <Reveal className="stats">
              {[
                ["03", "Projects in this orbit"],
                ["04", "Areas of exploration"],
                ["∞", "Curiosity & possibilities"],
                ["01", "Mission: keep building"],
              ].map(([value, label]) => (
                <div className="stat" key={label}>
                  <div className="stat-value">
                    {value}
                    <span className="text-primary">.</span>
                  </div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
      <section id="projects" className="section projects">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  <span className="dot" />
                  SELECTED EXPLORATIONS
                </span>
                <h2>
                  Ideas, brought <em>to life.</em>
                </h2>
              </div>
              <p className="projects-intro">
                A few things I’ve imagined, engineered,
                <br />
                and sent into orbit.
              </p>
            </div>
          </Reveal>
          <div className="project-grid">
            {projects.map((p, index) => (
              <motion.article
                key={p.id}
                className={`project-card ${index === 0 ? "featured" : ""}`}
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduced ? {} : { y: -5, rotateX: 1, rotateY: -0.6 }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              >
                <div className="project-image">
                  <img
                    src={p.image}
                    alt={`${p.name} project concept`}
                    width={1280}
                    height={768}
                    loading="lazy"
                  />
                  {index === 0 && (
                    <span className="featured-badge">
                      <Sparkles size={10} />
                      FEATURED PROJECT
                    </span>
                  )}
                </div>
                <div className="project-copy">
                  <span className="project-category">{p.category}</span>
                  <div className="project-title">
                    <h3>{p.name}</h3>
                    <span className="mono-small">/{p.id}</span>
                  </div>
                  <p>{p.description}</p>
                  <div className="tech-stack">
                    {p.stack.map((tech) => (
                      <span className="tech-chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <Button variant="ghost" className="button" onClick={() => setProject(p)}>
                      Explore project <ArrowUpRight />
                    </Button>
                    <span className="source-note">CONCEPT / 2026</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="sample-note">SAMPLE PROJECTS · READY FOR YOUR OWN EXPLORATIONS</p>
        </div>
      </section>
      <div className="journey">
        <section id="skills" className="section skills">
          <div className="container">
            <Reveal>
              <Heading number="03" label="MY TECH UNIVERSE">
                Different worlds.
                <br />
                <em>One connected system.</em>
              </Heading>
            </Reveal>
            <div className="skills-grid">
              {skills.map((s, index) => (
                <Reveal key={s.name} className="skill-item">
                  <motion.div
                    animate={reduced ? {} : { rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Button
                      variant="planet"
                      className={`planet-button ${s.className}`}
                      onClick={() => setSkill(index)}
                      onMouseEnter={() => setSkill(index)}
                      aria-label={`Explore ${s.name}`}
                      aria-pressed={index === skill}
                    >
                      <span className="planet">{s.icon}</span>
                      <span className="planet-orbit" />
                    </Button>
                  </motion.div>
                  <h3>{s.name}</h3>
                  <span className="mono-small">
                    0{index + 1} / {s.short}
                  </span>
                </Reveal>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="skill-details"
                key={skill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <h3>{skills[skill]?.name}</h3>
                  <p>{skills[skill]?.description}</p>
                  <p>{skills[skill]?.experience}</p>
                </div>
                <div>
                  <span className="eyebrow">TECH STACK</span>
                  <p>{skills[skill]?.stack}</p>
                  <p>PROJECT ORBITS — {skills[skill]?.projects}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
        <section id="experience" className="section experience">
          <div className="container">
            <Reveal>
              <Heading number="04" label="THE FLIGHT LOG">
                Every step.
                <br />
                <em>A new trajectory.</em>
              </Heading>
            </Reveal>
            <div className="timeline">
              {[
                [
                  "NOW → NEXT",
                  "Building what comes next",
                  "INDEPENDENT EXPLORATION",
                  "Exploring artificial intelligence, full-stack engineering, and the possibilities where they meet.",
                ],
                [
                  "THE JOURNEY",
                  "Learning by making",
                  "PROJECT-LED LEARNING",
                  "From the first line of code to complete digital experiences. Every experiment is another step forward.",
                ],
                [
                  "THE FOUNDATION",
                  "An engineering mindset",
                  "EDUCATION & CURIOSITY",
                  "A foundation in problem-solving, software fundamentals, and asking better questions.",
                ],
              ].map(([date, title, company, description]) => (
                <Reveal className="timeline-row" key={date}>
                  <span className="timeline-date">{date}</span>
                  <div>
                    <h3>{title}</h3>
                    <span className="company">{company}</span>
                    <p>{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mono-small">SAMPLE JOURNEY · ADD YOUR EDUCATION & EXPERIENCE</p>
          </div>
        </section>
      </div>
      <section id="certifications" className="section certifications">
        <div className="container">
          <Reveal>
            <Heading number="05" label="VERIFIED MILESTONES">
              Never stop <em>learning.</em>
            </Heading>
          </Reveal>
          <div className="cert-grid">
            {["AI & Machine Learning", "Full Stack Engineering", "Cloud & Infrastructure"].map(
              (name) => (
                <Reveal key={name}>
                  <motion.div className="cert-card" whileHover={reduced ? {} : { y: -5 }}>
                    <Award size={26} strokeWidth={1.2} />
                    <h3>{name}</h3>
                    <p>YOUR CERTIFICATION · ADD ISSUER & YEAR</p>
                  </motion.div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>
      <section id="contact" className="section contact">
        <Specks />
        <div className="container contact-layout">
          <Reveal className="contact-copy">
            <span className="eyebrow">
              <span className="status-dot" />
              MISSION CONTROL
            </span>
            <h2>
              Have a mission
              <br />
              <em>in mind?</em>
            </h2>
            <p>
              A bold idea. An interesting challenge. Or just a hello. Let’s see what we can build
              together.
            </p>
            <span className="availability">
              <span className="status-dot" />
              READY FOR THE NEXT CHAPTER
            </span>
          </Reveal>
          <Reveal>
            <form className="contact-form" onSubmit={submitContact}>
              <label>
                01 / YOUR NAME
                <input
                  name="name"
                  placeholder="What should I call you?"
                  required
                  autoComplete="name"
                  maxLength={100}
                />
              </label>
              <label>
                02 / YOUR EMAIL
                <input
                  name="email"
                  type="email"
                  placeholder="Where can I reach you?"
                  required
                  autoComplete="email"
                />
              </label>
              <label>
                03 / YOUR MISSION
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell me about your idea..."
                  required
                  maxLength={3000}
                />
              </label>
              <motion.div whileTap={reduced ? {} : { scale: 0.97 }}>
                <Button variant="mission" className="button w-full" type="submit">
                  Initiate contact <Rocket size={15} />
                </Button>
              </motion.div>
              {contactStatus && (
                <p className="form-note" role="status">
                  {contactStatus}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
      <footer className="footer">
        <div className="container footer-content">
          <a className="brand" href="#top">
            <Sparkles size={20} strokeWidth={1.3} />
            {profile.name}
            <span className="text-primary">.</span>
          </a>
          <p>© 2026 {profile.name.toUpperCase()} · CRAFTED WITH CURIOSITY.</p>
          <div className="footer-links">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={16} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            )}
            <a href="#top">
              BACK TO EARTH <ArrowUpRight size={12} className="inline ml-2" />
            </a>
          </div>
        </div>
      </footer>
      <Dialog
        open={Boolean(project)}
        onOpenChange={(open) => {
          if (!open) setProject(null);
        }}
      >
        <DialogContent>
          {project && (
            <>
              <img
                className="dialog-image"
                src={project.image}
                alt={project.name}
                width={1280}
                height={768}
              />
              <DialogTitle>{project.name}</DialogTitle>
              <DialogDescription>{project.detail}</DialogDescription>
              <div className="tech-stack">
                {project.stack.map((tech) => (
                  <span className="tech-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <Button asChild variant="outline">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button asChild>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live demo <ArrowUpRight />
                    </a>
                  </Button>
                )}
              </div>
              <p className="sample-note">
                Concept project. GitHub and live links will appear when provided.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
        <DialogContent>
          <Download className="text-primary" size={25} />
          <DialogTitle>Resume on standby</DialogTitle>
          <DialogDescription>
            A resume hasn’t been added yet. Share your PDF or resume link to make it available here.
          </DialogDescription>
          <Button variant="outline" onClick={() => setResumeOpen(false)}>
            <Check />
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
