"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dna, LineChart, Layers, Code2, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CtaSection } from "@/components/sections/cta-section";
import { RESEARCH_TOPICS, PROJECTS, LAB_IDENTITY } from "@/lib/research-data";

const ICON_MAP = { Dna, LineChart, Layers } as const;
type IconName = keyof typeof ICON_MAP;

const openSourceProjects = [
  { name: "MolDiff", description: "Scaffold-conditioned diffusion model for molecular generation", stars: "1.2k", lang: "Python", topic: "Bioinformatics" },
  { name: "TSFounder", description: "General-purpose foundation model pre-training for time series", stars: "890", lang: "Python", topic: "Time Series" },
  { name: "VisForecast", description: "Visual representation toolkit for long-horizon time series forecasting", stars: "640", lang: "Python", topic: "Time Series" },
  { name: "MatGenAI", description: "Generative AI workflow for accelerated material property screening", stars: "430", lang: "Python", topic: "Materials" },
];

export default function ResearchPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">Research</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Three Pillars of AI-Driven Discovery
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {LAB_IDENTITY.missionShort}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Research Areas"
            title="Our Domains"
            description="Each research area is led by a senior mentor and staffed by PhD students, postdocs, and research scientists."
          />

          <div className="mt-16 space-y-16">
            {RESEARCH_TOPICS.map((topic, i) => {
              const Icon = ICON_MAP[topic.icon as IconName] ?? Layers;
              const topicProjects = PROJECTS.filter((p) => p.topicId === topic.id);

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="overflow-hidden rounded-3xl border bg-card"
                >
                  {/* Gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${topic.color.gradient}`} />

                  <div className="p-6 sm:p-10 lg:p-12">
                    {/* Header row */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      {/* Icon + title */}
                      <div className="flex shrink-0 items-start gap-5">
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${topic.color.iconBg} ${topic.color.text}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{topic.name}</h3>
                          <p className={`text-sm font-medium ${topic.color.text}`}>{topic.tagline}</p>
                        </div>
                      </div>
                      {/* Stats */}
                      <div className="flex gap-6 text-sm text-muted-foreground lg:ml-auto">
                        <span><strong className="text-foreground text-lg">{topic.stats.papers}</strong><br />Papers</span>
                        <span><strong className="text-foreground text-lg">{topic.stats.members}</strong><br />Researchers</span>
                      </div>
                    </div>

                    {/* Two-column: description + image */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-5">
                      <div className="lg:col-span-3 space-y-6">
                        <p className="leading-relaxed text-muted-foreground">
                          {topic.longDescription}
                        </p>

                        {/* Subtopics */}
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Research Directions
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {topic.subtopics.map((sub) => (
                              <Badge key={sub} variant="secondary" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Methods */}
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Key Methods
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {topic.methods.map((method) => (
                              <span
                                key={method}
                                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${topic.color.iconBg} ${topic.color.text}`}
                              >
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Topic image */}
                      <div className="lg:col-span-2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={topic.image.src}
                            alt={topic.image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                          {topic.image.isPlaceholder && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-200/80 dark:bg-slate-800/80">
                              <p className="px-4 text-center text-xs text-muted-foreground">{topic.image.hint}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Projects in this area */}
                    {topicProjects.length > 0 && (
                      <div className="mt-8 border-t pt-8">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Representative Projects
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {topicProjects.map((proj) => (
                            <div
                              key={proj.id}
                              className={`rounded-xl border p-4 ${topic.color.bg} ${topic.color.border}`}
                            >
                              <div className="mb-1 flex items-center justify-between">
                                <h4 className="font-semibold text-foreground text-sm">{proj.title}</h4>
                                <span className={`text-xs font-medium ${proj.status === "Active" ? "text-emerald-600" : proj.status === "Ongoing" ? "text-blue-600" : "text-muted-foreground"}`}>
                                  {proj.status}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                {proj.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {proj.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="rounded-full bg-white/70 px-2 py-0.5 text-xs text-muted-foreground dark:bg-slate-700/60">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900/50 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open Source"
            title="Tools for the Community"
            description="We release research code as production-quality libraries so the wider scientific community can build on our work."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {openSourceProjects.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:bg-slate-800"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Code2 className="h-5 w-5 text-primary" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>⭐ {proj.stars}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary">{proj.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{proj.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">{proj.lang}</Badge>
                  <a href="#" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950/30 dark:to-indigo-950/30 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Compute Infrastructure</p>
                <h2 className="text-3xl font-bold text-foreground">World-Class Research Infrastructure</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Our researchers have access to a high-performance GPU cluster, large-scale storage systems, and cloud computing resources. We maintain curated molecular, temporal, and materials datasets to support all three research pillars.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "GPU Cluster", value: "256 A100s", icon: "🖥️" },
                  { label: "Storage", value: "1 PB NVMe", icon: "💾" },
                  { label: "Datasets", value: "100+ TB", icon: "🗄️" },
                  { label: "Cloud Credits", value: "$200K/yr", icon: "☁️" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border bg-white p-4 text-center dark:bg-slate-800">
                    <div className="mb-1 text-2xl">{item.icon}</div>
                    <div className="text-lg font-bold text-foreground">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
