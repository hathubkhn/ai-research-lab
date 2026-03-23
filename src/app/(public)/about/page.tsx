"use client";

import { motion } from "framer-motion";
import { Target, Eye, BookOpen, Users, Lightbulb, Globe } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaSection } from "@/components/sections/cta-section";

const milestones = [
  { year: "2016", title: "Lab Founded", description: "AppliedAI-Lab established with a founding team of 4 researchers and a seed grant, with an initial focus on machine learning for scientific applications." },
  { year: "2017", title: "First Major Publication", description: "Published foundational work on graph-based molecular property prediction at NeurIPS, signaling our direction toward AI for bioinformatics." },
  { year: "2018", title: "Bioinformatics Direction Crystallized", description: "Launched the molecular design research thread. First collaboration with a pharmaceutical research institute on structure-based drug discovery." },
  { year: "2019", title: "Time Series Group Established", description: "Dr. Aisha Patel joined to lead a dedicated time series research effort, focusing on forecasting and anomaly detection for industrial sensor data." },
  { year: "2020", title: "Open-Source Release: MolDiff", description: "Released MolDiff, our diffusion-based molecular generation framework, to the community. Adopted by research groups worldwide." },
  { year: "2021", title: "Materials Research Launched", description: "Awarded a research grant to apply AI to functional material design. Dr. Priya Nair joined as Materials Research Lead." },
  { year: "2022", title: "Foundation Models for Time Series", description: "Launched the TSFounder pre-training initiative. First paper on visual representation-based forecasting received an ICML Best Paper Award." },
  { year: "2023", title: "30 Researchers Milestone", description: "Crossed 30 active researchers across three groups. Published 40+ papers. First results from ThermoShield greenhouse materials project." },
  { year: "2024", title: "100+ Publications", description: "Reached 100 cumulative peer-reviewed publications. NeurIPS 2024 paper on scaffold-conditioned diffusion. StealthMat project launched with defense partners." },
];

const values = [
  {
    icon: Target,
    title: "Scientific Rigor",
    description: "We hold our work to the highest standards of reproducibility, transparency, and methodological soundness.",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Globe,
    title: "Open Science",
    description: "We believe knowledge should be shared. We release code, models, and datasets to benefit the broader community.",
    color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    icon: Lightbulb,
    title: "Bold Curiosity",
    description: "We encourage researchers to pursue ambitious, unconventional ideas with the freedom to fail and learn.",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Our best work happens at the intersection of disciplines. We actively cultivate cross-domain collaboration.",
    color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: BookOpen,
    title: "Education First",
    description: "We invest deeply in mentoring the next generation of AI researchers through hands-on guidance and scholarship.",
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Eye,
    title: "Responsible Impact",
    description: "We consider the societal implications of our work from day one and actively research AI safety and fairness.",
    color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              About the Lab
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              AI for Science, Grounded in Rigor
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              AppliedAI-Lab is a research group dedicated to applying AI to high-impact scientific
              domains — molecular bioinformatics, time series analysis, and materials design —
              producing rigorous research and open tools that accelerate discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Applying AI Where It Matters Most
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We apply state-of-the-art machine learning to three interconnected scientific
                  domains: AI for Bioinformatics, AI for Time Series, and AI for Materials.
                  Each area is driven by real scientific challenges — molecular drug discovery,
                  temporal pattern understanding, and functional material design.
                </p>
                <p>
                  Our approach combines deep learning methodology with domain expertise.
                  We publish at premier AI venues, release production-quality open-source software,
                  and collaborate closely with domain scientists in biology, chemistry, and engineering
                  to ensure our models address genuine scientific needs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-cyan-500" />
                <span className="text-sm font-semibold uppercase tracking-widest text-cyan-600">
                  Our Vision
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Accelerating Discovery Across Science
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We envision a future where generative AI routinely assists scientists in navigating
                  vast chemical spaces, understanding complex temporal signals, and designing materials
                  with precisely targeted properties — shortening discovery cycles from years to months.
                </p>
                <p>
                  Our long-term vision is to be the go-to research lab for AI-driven scientific
                  discovery — a place where the best machine learning meets the hardest domain problems,
                  and where open publication and open-source tooling accelerate progress for everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900/50 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Us"
            description="Six principles that guide how we think, collaborate, and do science."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-800"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${value.color}`}
                >
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="History"
            title="Our Journey"
            description="From a small team with a big idea to a focused research group advancing AI for bioinformatics, time series, and materials."
          />

          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 h-full w-px bg-border sm:left-1/2" />

            <div className="space-y-10">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`relative flex gap-6 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background ${
                      i % 2 === 0
                        ? "left-6 sm:left-auto sm:-right-2.5"
                        : "left-6 sm:-left-2.5"
                    }`}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  <div className={`pl-16 sm:pl-0 ${i % 2 === 0 ? "" : ""}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
