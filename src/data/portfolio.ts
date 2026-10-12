import nexus from "@/assets/project-nexus.jpg";
import orbit from "@/assets/project-orbit.jpg";
import pulse from "@/assets/project-pulse.jpg";

// Replace these sample details with your own. Empty URLs never produce dead links.
export const profile = {
  name: "Durgesh",
  initials: "YN",
  email: "",
  location: "Planet Earth",
  tagline: "Engineering intelligence. Building what’s next.",
  about:
    "I live at the intersection of curiosity and code. From intelligent systems to thoughtfully crafted digital experiences, I turn ambitious ideas into things that work — and things that matter.",
  github: "",
  linkedin: "",
  resume: "",
};
export const projects = [
  {
    id: "01",
    name: "Nexus AI",
    category: "ARTIFICIAL INTELLIGENCE",
    description:
      "An intelligent workspace that connects ideas, understands context, and turns complexity into clarity.",
    image: nexus,
    stack: ["Python", "LangChain", "React", "FastAPI"],
    detail:
      "A sample concept for a context-aware AI workspace. Combines semantic search, conversational assistance and a focused interface into one connected experience.",
    github: "",
    live: "",
  },
  {
    id: "02",
    name: "Orbit",
    category: "FULL STACK DEVELOPMENT",
    description:
      "A new perspective on exploration. A real-time platform for discovering the universe.",
    image: orbit,
    stack: ["React", "TypeScript", "PostgreSQL"],
    detail:
      "A sample concept for a space exploration platform with real-time mission data, searchable celestial objects and personalized discovery collections.",
    github: "",
    live: "",
  },
  {
    id: "03",
    name: "Pulse",
    category: "MACHINE LEARNING",
    description:
      "Finding the signal in the noise. Predictive insights, beautifully brought to life.",
    image: pulse,
    stack: ["PyTorch", "Python", "D3.js"],
    detail:
      "A sample concept for a predictive analytics dashboard. Transforms complex time-series data into interpretable insights and interactive visualizations.",
    github: "",
    live: "",
  },
];
export const skills = [
  {
    name: "Artificial Intelligence",
    icon: "✳",
    className: "planet-ai",
    short: "AI / ML",
    stack: "Python · PyTorch · TensorFlow · LangChain",
    description: "Intelligent systems that understand, learn, and create.",
    experience: "Model development · LLM applications · Semantic search",
    projects: "Nexus AI · Pulse",
  },
  {
    name: "Frontend Development",
    icon: "⌘",
    className: "planet-front",
    short: "FRONTEND",
    stack: "React · TypeScript · Tailwind · Three.js",
    description: "Thoughtful interfaces with a little extra dimension.",
    experience: "Interactive experiences · Design systems · Accessibility",
    projects: "Nexus AI · Orbit",
  },
  {
    name: "Backend Engineering",
    icon: "⌁",
    className: "planet-back",
    short: "BACKEND",
    stack: "Python · FastAPI · Node.js · PostgreSQL",
    description: "Reliable foundations for ambitious applications.",
    experience: "API design · Distributed systems · Data architecture",
    projects: "Nexus AI · Orbit",
  },
  {
    name: "Cloud & DevOps",
    icon: "◇",
    className: "planet-cloud",
    short: "CLOUD",
    stack: "Docker · AWS · Git · CI/CD",
    description: "Taking ideas from a local machine to the world.",
    experience: "Deployment pipelines · Containers · Infrastructure",
    projects: "Orbit · Pulse",
  },
];
