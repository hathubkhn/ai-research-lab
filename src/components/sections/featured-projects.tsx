"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECTS, TOPIC_BY_ID } from "@/lib/research-data";

const FEATURED_IDS = ["moldiff", "tsfounder", "thermoshield", "bindnet", "ragimpute", "stealthmat"];
const featuredProjects = PROJECTS.filter((p) => FEATURED_IDS.includes(p.id)).slice(0, 6);

export function FeaturedProjects() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Research in Action"
            description="From generative molecular design to foundation models for time series — explore the projects shaping our research agenda."
            align="left"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/projects">
              All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => {
            const topic = TOPIC_BY_ID[project.topicId];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-800/60"
              >
                <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${topic.color.gradient}`} />

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <StatusBadge status={project.status} />
                    <div className="flex gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label="GitHub"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label="Project page"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className={`mb-1 text-xs font-semibold uppercase tracking-wide ${topic.color.text}`}>
                    {topic.shortName}
                  </p>
                  <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="blue" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
