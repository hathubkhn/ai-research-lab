"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Github,
  ExternalLink,
  Quote,
  Filter,
  Search,
  FileText,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  PUBLICATIONS,
  TOPIC_LABELS,
  TOPIC_COLORS,
  TOTAL_CITATIONS,
  type Publication,
  type PublicationTopicId,
} from "@/lib/publications-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  preprint: "Preprint",
};

const ALL_YEARS = Array.from(
  new Set(PUBLICATIONS.map((p) => p.year))
).sort((a, b) => b - a);

const ALL_TOPICS: { id: PublicationTopicId | "all"; label: string }[] = [
  { id: "all", label: "All Areas" },
  ...Object.entries(TOPIC_LABELS).map(([id, label]) => ({
    id: id as PublicationTopicId,
    label,
  })),
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TopicBadge({ topicId }: { topicId: PublicationTopicId }) {
  const colors = TOPIC_COLORS[topicId];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border
      )}
    >
      {TOPIC_LABELS[topicId]}
    </span>
  );
}

function TypeBadge({ type }: { type: Publication["type"] }) {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      {TYPE_LABEL[type]}
    </span>
  );
}

function CitationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
      <Quote className="h-3 w-3" />
      {count} {count === 1 ? "citation" : "citations"}
    </span>
  );
}

function PublicationCard({ pub }: { pub: Publication }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900",
        pub.featured
          ? "border-blue-200 dark:border-blue-800"
          : "border-slate-200 dark:border-slate-700"
      )}
    >
      {pub.featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <Award className="h-3 w-3" />
          Featured
        </span>
      )}

      {/* Badges row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <TopicBadge topicId={pub.topicId} />
        <TypeBadge type={pub.type} />
        {pub.citations !== undefined && (
          <CitationBadge count={pub.citations} />
        )}
        <span className="ml-auto text-xs text-muted-foreground">{pub.year}</span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold leading-snug text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {pub.title}
      </h3>

      {/* Authors */}
      <p className="mb-1 text-sm text-muted-foreground italic">{pub.authors}</p>

      {/* Venue */}
      <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
        {pub.venue}
      </p>

      {/* Abstract (collapsible) */}
      {pub.abstract && (
        <div className="mb-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" /> Hide abstract
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" /> Show abstract
              </>
            )}
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.p
                key="abstract"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 overflow-hidden text-sm leading-relaxed text-muted-foreground"
              >
                {pub.abstract}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Action links */}
      <div className="flex flex-wrap items-center gap-2">
        {pub.scholarUrl && (
          <a
            href={pub.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Google Scholar
          </a>
        )}
        {pub.pdfUrl && (
          <a
            href={pub.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </a>
        )}
        {pub.githubUrl ? (
          <a
            href={pub.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-200 px-3 py-1.5 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-600">
            <Github className="h-3.5 w-3.5" />
            Code coming soon
          </span>
        )}
      </div>
    </motion.article>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    {
      icon: FileText,
      value: PUBLICATIONS.length,
      label: "Publications",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Quote,
      value: TOTAL_CITATIONS,
      label: "Total Citations",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      icon: TrendingUp,
      value: PUBLICATIONS.filter((p) => p.year >= 2024).length,
      label: "Since 2024",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: Award,
      value: PUBLICATIONS.filter((p) => p.type === "journal").length,
      label: "Journal Papers",
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl p-4 text-center",
            s.bg
          )}
        >
          <s.icon className={cn("mb-1 h-5 w-5", s.color)} />
          <span className={cn("text-2xl font-bold", s.color)}>{s.value}</span>
          <span className="mt-0.5 text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<
    PublicationTopicId | "all"
  >("all");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedType, setSelectedType] = useState<
    Publication["type"] | "all"
  >("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PUBLICATIONS.filter((p) => {
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.authors.toLowerCase().includes(q) &&
        !p.venue.toLowerCase().includes(q)
      ) {
        return false;
      }
      if (selectedTopic !== "all" && p.topicId !== selectedTopic) return false;
      if (selectedYear !== "all" && p.year !== selectedYear) return false;
      if (selectedType !== "all" && p.type !== selectedType) return false;
      return true;
    }).sort((a, b) => b.year - a.year || (b.citations ?? 0) - (a.citations ?? 0));
  }, [search, selectedTopic, selectedYear, selectedType]);

  const resetFilters = () => {
    setSearch("");
    setSelectedTopic("all");
    setSelectedYear("all");
    setSelectedType("all");
  };

  const hasFilters =
    search !== "" ||
    selectedTopic !== "all" ||
    selectedYear !== "all" ||
    selectedType !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 py-24 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.1),_transparent_70%)]" />
        <div className="container relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-sm font-medium text-blue-200">
              <BookOpen className="h-4 w-4" />
              Research Publications
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Publications
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100/80">
              Peer-reviewed research from the AppliedAI-Lab spanning AI for
              bioinformatics, time series forecasting, and large language models.
              All papers include links to Google Scholar and code repositories
              where available.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-blue-200/70">
              <a
                href="https://scholar.google.com/citations?hl=en&user=FtFck0UAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 transition-colors hover:border-blue-400/60 hover:text-blue-100"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Google Scholar profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-6 py-16">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <StatsBar />
        </motion.div>

        <SectionHeading
          eyebrow="Full List"
          title="All Publications"
          description="Use the filters below to browse by research area, year, or publication type."
        />

        {/* ── Filter controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, authors, or venue…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-blue-600 dark:focus:ring-blue-950/40"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />

            {/* Topic */}
            <select
              value={selectedTopic}
              onChange={(e) =>
                setSelectedTopic(e.target.value as PublicationTopicId | "all")
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-blue-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              {ALL_TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Year */}
            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-blue-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="all">All Years</option>
              {ALL_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(
                  e.target.value as Publication["type"] | "all"
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-blue-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="all">All Types</option>
              <option value="journal">Journal</option>
              <option value="conference">Conference</option>
              <option value="preprint">Preprint</option>
            </select>

            {hasFilters && (
              <button
                onClick={resetFilters}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Clear filters
              </button>
            )}

            <span className="ml-auto text-sm text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        {/* ── Publication list ── */}
        <div className="mt-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700"
              >
                <BookOpen className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="text-base font-medium text-muted-foreground">
                  No publications match your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              filtered.map((pub) => (
                <PublicationCard key={pub.id} pub={pub} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* ── Contribute CTA ── */}
        <div className="mt-16 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-8 text-center dark:border-blue-800/40 dark:bg-blue-950/20">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-blue-400" />
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            Have a new publication to add?
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Lab members can add or update publications via the admin dashboard,
            or directly in{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              src/lib/publications-data.ts
            </code>
            .
          </p>
          <a
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Go to Admin
          </a>
        </div>
      </div>
    </div>
  );
}
