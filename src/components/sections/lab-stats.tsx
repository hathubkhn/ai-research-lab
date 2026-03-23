"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, FlaskConical, Handshake } from "lucide-react";
import { LAB_STATS } from "@/lib/research-data";

const ICON_MAP = { Users, BookOpen, FlaskConical, Handshake } as const;
type IconName = keyof typeof ICON_MAP;

export function LabStats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_STATS.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon as IconName] ?? Users;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-cyan-300" />
                </div>
                <div className="text-4xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-lg font-semibold text-blue-100">{stat.label}</div>
                <div className="mt-1 text-sm text-blue-200/70">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
