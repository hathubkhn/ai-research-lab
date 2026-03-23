"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Quote, ExternalLink, Github, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import {
  FEATURED_PUBLICATIONS,
  TOPIC_LABELS,
  TOPIC_COLORS,
  TOTAL_CITATIONS,
  type Publication,
} from "@/lib/publications-data";

function FeaturedCard({ pub, index }: { pub: Publication; index: number }) {
  const colors = TOPIC_COLORS[pub.topicId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex flex-col rounded-2xl border bg-card p-6 transition-all hover:border-blue-200 hover:shadow-lg dark:hover:border-blue-800"
    >
      {/* Topic + year header */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            colors.bg,
            colors.text,
            colors.border
          )}
        >
          {TOPIC_LABELS[pub.topicId]}
        </span>
        <span className="text-xs text-muted-foreground">{pub.venueShort}</span>
      </div>

      {/* Title */}
      <h3 className="mb-2 line-clamp-3 font-semibold leading-snug text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {pub.title}
      </h3>

      {/* Authors */}
      <p className="mb-3 line-clamp-2 text-sm italic text-muted-foreground">
        {pub.authors}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer: citations + links */}
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        {pub.citations !== undefined && pub.citations > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Quote className="h-3 w-3" />
            {pub.citations} citations
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {pub.githubUrl && (
            <a
              href={pub.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              aria-label="Code"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {pub.scholarUrl && (
            <a
              href={pub.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:text-blue-400"
              aria-label="Google Scholar"
            >
              <BookOpen className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PublicationsHighlight() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Publications & Recognition"
            title="Impact That Matters"
            description="Peer-reviewed research published at international journals and conferences spanning AI for bioinformatics, time series, and language models."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex shrink-0 flex-col items-end gap-2"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 dark:border-amber-800/40 dark:bg-amber-950/20">
              <Quote className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                {TOTAL_CITATIONS}+ total citations
              </span>
            </div>
            <Link
              href="/publications"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {FEATURED_PUBLICATIONS.map((pub, i) => (
            <FeaturedCard key={pub.id} pub={pub} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800/40 dark:bg-blue-950/20 dark:text-blue-400 dark:hover:bg-blue-950/40"
          >
            <ExternalLink className="h-4 w-4" />
            Browse all {FEATURED_PUBLICATIONS.length > 0 ? `${FEATURED_PUBLICATIONS.length} featured & ` : ""}publications
          </Link>
          <a
            href="https://scholar.google.com/citations?hl=en&user=FtFck0UAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Google Scholar profile
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
