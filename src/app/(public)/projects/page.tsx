"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Github, Filter } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PROJECTS, RESEARCH_TOPICS, TOPIC_BY_ID } from "@/lib/research-data";

const categories = ["All", "Bioinformatics", "Time Series", "Materials"];
const statuses = ["All", "Active", "Ongoing", "Archived"];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = PROJECTS.filter((p) => {
    const topic = TOPIC_BY_ID[p.topicId];
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === "All" || topic.shortName === category;
    const matchesStatus = status === "All" || p.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">Projects</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Research in Action</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Explore our portfolio of active, ongoing, and completed projects across bioinformatics,
              time series analysis, and AI-driven materials design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topic overview chips */}
      <section className="border-b bg-white py-6 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {RESEARCH_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${topic.color.bg} ${topic.color.border} ${topic.color.text}`}
              >
                <span>{topic.shortName}</span>
                <span className="rounded-full bg-white/60 px-1.5 py-0.5 text-xs font-bold dark:bg-slate-700/60">
                  {PROJECTS.filter((p) => p.topicId === topic.id).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-10 flex flex-col gap-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" /> Research Area:
              </span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" /> Status:
              </span>
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    status === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="mb-6 text-sm text-muted-foreground">
            Showing <strong>{filtered.length}</strong> of {PROJECTS.length} projects
          </p>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const topic = TOPIC_BY_ID[project.topicId];
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${topic.color.gradient}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <StatusBadge status={project.status} />
                        <div className="flex gap-1">
                          {project.githubUrl && (
                            <a href={project.githubUrl} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.projectUrl && (
                            <a href={project.projectUrl} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <span className={`mb-2 w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold ${topic.color.bg} ${topic.color.border} ${topic.color.text}`}>
                        {topic.shortName}
                      </span>
                      <h3 className="mb-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">{project.year}</p>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-lg font-medium text-muted-foreground">No projects match your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
