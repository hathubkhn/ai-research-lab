"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Decorative blobs */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join Us in Advancing AI for Science
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-blue-100">
            We welcome PhD candidates, postdoctoral researchers, and industry collaborators
            passionate about applying AI to bioinformatics, time series, and materials science.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" className="bg-white text-blue-900 hover:bg-blue-50">
              <Link href="/contact#join">
                <Mail className="mr-2 h-5 w-5" />
                Join Our Lab
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/research">
                Our Research <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200">
            We offer competitive stipends, world-class mentorship, and access to cutting-edge
            compute infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
