"use client";

import { motion } from "framer-motion";

const partners = [
  "DeepMind", "OpenAI", "NVIDIA Research", "Google Brain",
  "Microsoft Research", "Meta AI", "Anthropic", "Hugging Face",
];

export function Partners() {
  return (
    <section className="border-t border-b py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Collaborating with world-class institutions
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center rounded-xl border bg-card px-4 py-3 text-center text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
