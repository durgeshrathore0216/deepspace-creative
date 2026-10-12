import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio/Portfolio";
import { profile } from "@/data/portfolio";
const title = `${profile.name} — AI Engineer & Creative Developer`;
const description =
  "Engineering intelligence. Building what’s next. Explore a universe of AI, full-stack development and creative technology.";
export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "AI Engineer & Full Stack Developer",
          description: profile.about,
        }),
      },
    ],
  }),
});
