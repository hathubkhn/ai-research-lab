"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, FlaskConical, Handshake } from "lucide-react";
import type { LabStats } from "@/lib/compute-stats";

const STAT_CONFIG: {
  key: keyof LabStats;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
  { key: "researchers", icon: Users, label: "Researchers", description: "Active lab members" },
  { key: "publications", icon: BookOpen, label: "Publications", description: "Peer-reviewed papers" },
  { key: "activeProjects", icon: FlaskConical, label: "Active Projects", description: "Ongoing research" },
  { key: "collaborators", icon: Handshake, label: "Collaborators", description: "Partner institutions" },
];

interface LabStatsProps {
  stats: LabStats;
}

export function LabStats({ stats }: LabStatsProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CONFIG.map((cfg, i) => {
            const Icon = cfg.icon;
            return (
              <motion.div
                key={cfg.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-cyan-300" />
                </div>
                <div className="text-4xl font-extrabold text-white">{stats[cfg.key]}</div>
                <div className="mt-1 text-lg font-semibold text-blue-100">{cfg.label}</div>
                <div className="mt-1 text-sm text-blue-200/70">{cfg.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
