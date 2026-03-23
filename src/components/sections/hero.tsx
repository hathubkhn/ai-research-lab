"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LabStats } from "@/lib/compute-stats";

const floatingOrbs = [
  { size: 300, x: "70%", y: "20%", color: "from-blue-600/30 to-cyan-400/20", delay: 0 },
  { size: 200, x: "80%", y: "60%", color: "from-indigo-500/20 to-blue-400/10", delay: 1 },
  { size: 150, x: "10%", y: "70%", color: "from-cyan-500/20 to-blue-300/10", delay: 2 },
];

const STAT_LABELS: { key: keyof LabStats; label: string }[] = [
  { key: "researchers", label: "Researchers" },
  { key: "publications", label: "Publications" },
  { key: "activeProjects", label: "Active Projects" },
  { key: "collaborators", label: "Collaborators" },
];

interface HeroProps {
  stats: LabStats;
}

export function Hero({ stats }: HeroProps) {

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Floating gradient orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center py-28">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-7 items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold tracking-wider text-cyan-300">
                    APPLIEDAI-LAB
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Shaping the{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Future of AI
                </span>{" "}
                Research
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-xl text-lg leading-relaxed text-slate-300"
              >
                We apply state-of-the-art AI to high-impact scientific domains — advancing molecular
                discovery in bioinformatics, building foundation models for time series analysis, and
                accelerating functional material design for real-world applications.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button asChild size="lg" variant="gradient" className="group">
                  <Link href="/research">
                    Explore Research
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/members">Meet the Team</Link>
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 flex gap-8"
              >
                {STAT_LABELS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white">{stats[s.key]}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:flex lg:justify-end"
            >
              <div className="relative h-[500px] w-[500px]">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                {/* Middle ring */}
                <motion.div
                  className="absolute inset-[50px] rounded-full border border-cyan-500/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner ring */}
                <motion.div
                  className="absolute inset-[100px] rounded-full border border-blue-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                {/* Center orb */}
                <div className="absolute inset-[150px] flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 opacity-80 blur-sm" />
                  <div className="absolute flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl shadow-blue-500/50">
                    <span className="text-4xl font-black text-white">AI</span>
                  </div>
                </div>

                {/* Orbiting dots */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-3 w-3"
                    style={{
                      transform: `rotate(${angle}deg) translateX(230px)`,
                      marginLeft: "-6px",
                      marginTop: "-6px",
                    }}
                    animate={{ rotate: [angle, angle + 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                  </motion.div>
                ))}

                {/* Floating label cards */}
                <motion.div
                  className="absolute -left-8 top-16 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-xs font-semibold text-cyan-300">AI for Bioinformatics</div>
                </motion.div>
                <motion.div
                  className="absolute -right-4 bottom-32 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-xs font-semibold text-blue-300">AI for Time Series</div>
                </motion.div>
                <motion.div
                  className="absolute bottom-16 left-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="text-xs font-semibold text-indigo-300">AI for Materials</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronRight className="h-5 w-5 rotate-90 text-white/40" />
      </motion.div>
    </section>
  );
}
