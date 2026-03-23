"use client";

import { motion } from "framer-motion";
import { Dna, LineChart, Layers } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RESEARCH_TOPICS } from "@/lib/research-data";

const ICON_MAP = {
  Dna: Dna,
  LineChart: LineChart,
  Layers: Layers,
} as const;

type IconName = keyof typeof ICON_MAP;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ResearchFocus() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Research Topics"
          title="Three Domains, One Vision"
          description="We apply state-of-the-art AI to high-impact scientific domains — advancing discovery in molecular biology, sequential data analysis, and functional materials design."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-8 sm:grid-cols-3"
        >
          {RESEARCH_TOPICS.map((topic) => {
            const Icon = ICON_MAP[topic.icon as IconName] ?? Layers;
            return (
              <motion.div
                key={topic.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group rounded-2xl border p-8 transition-shadow hover:shadow-lg ${topic.color.bg} ${topic.color.border}`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-slate-800 ${topic.color.text}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{topic.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {topic.subtopics.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${topic.color.iconBg} ${topic.color.text}`}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
