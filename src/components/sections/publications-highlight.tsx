"use client";

import { motion } from "framer-motion";
import { FileText, Trophy, DollarSign, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { PUBLICATIONS } from "@/lib/research-data";

const ICON_MAP = { paper: FileText, award: Trophy, grant: DollarSign } as const;

export function PublicationsHighlight() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Publications & Recognition"
          title="Impact That Matters"
          description="Our research is recognized at the world's most competitive AI venues. Here are some recent contributions spanning bioinformatics, time series, and materials."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {PUBLICATIONS.map((item, i) => {
            const Icon = ICON_MAP[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex gap-5 rounded-2xl border bg-card p-6 transition-all hover:border-blue-200 hover:shadow-lg dark:hover:border-blue-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2">
                    <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                  </div>
                  <h3 className="mb-1 line-clamp-2 font-semibold leading-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">{item.authors}</p>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="View publication"
                  >
                    <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </a>
                )}
                {!item.url && (
                  <span className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
