import { Metadata } from "next";
import { computeStats } from "@/lib/compute-stats";
import { Hero } from "@/components/sections/hero";
import { ResearchFocus } from "@/components/sections/research-focus";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { PublicationsHighlight } from "@/components/sections/publications-highlight";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Partners } from "@/components/sections/partners";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "AppliedAI-Lab — AI for Bioinformatics, Time Series & Materials",
  description:
    "AppliedAI-Lab applies state-of-the-art AI to bioinformatics, time series analysis, and materials design — advancing scientific discovery through generative models, foundation models, and physics-informed AI.",
};

export default function HomePage() {
  // Computed synchronously from static data — no fetch, no hydration mismatch.
  const stats = computeStats();

  return (
    <>
      <Hero stats={stats} />
      <ResearchFocus />
      <FeaturedProjects />
      <PublicationsHighlight />
      <LatestPosts />
      <Partners />
      <CtaSection />
    </>
  );
}
