"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";

const posts = [
  {
    slug: "diffusion-models-molecular-design",
    title: "Diffusion Models for De Novo Molecular Design: Where We Are and Where We're Going",
    excerpt: "We review recent progress in applying score-based and DDPM-style diffusion models to molecular generation, covering ligand-based, structure-based, and scaffold-conditioned approaches.",
    author: "Dr. Sarah Chen", date: "March 10, 2025", readTime: 9,
    tags: ["Bioinformatics", "Diffusion Models", "Drug Discovery"],
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&q=80",
    featured: true,
  },
  {
    slug: "foundation-models-time-series",
    title: "Building Foundation Models for Time Series: Lessons from NLP and What's Different",
    excerpt: "What time series researchers can learn from large language models, and what makes sequential numerical data fundamentally different from text. Lessons from building TSFounder.",
    author: "Prof. James Rodriguez", date: "February 20, 2025", readTime: 11,
    tags: ["Time Series", "Foundation Models"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    featured: false,
  },
  {
    slug: "ai-material-design-greenhouse",
    title: "Cooling Greenhouses with AI-Designed Materials: From Simulation to Prototype",
    excerpt: "How ThermoShield uses generative models and physics-informed optimization to design passive cooling materials that reduce greenhouse peak temperature by up to 18°C.",
    author: "Dr. Priya Nair", date: "January 28, 2025", readTime: 7,
    tags: ["Materials", "Generative AI"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    featured: false,
  },
  {
    slug: "rag-time-series-imputation",
    title: "RAG for Time Series Imputation: Retrieval-Augmented Missing Value Recovery",
    excerpt: "We introduce RAG-Impute, a retrieval-augmented framework for recovering missing values in multivariate time series by leveraging historical pattern corpora.",
    author: "Dr. Aisha Patel", date: "January 10, 2025", readTime: 8,
    tags: ["Time Series", "Research"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    featured: false,
  },
  {
    slug: "ai-biosensor-materials",
    title: "Designing Materials for Biosensors with AI: An Emerging Frontier",
    excerpt: "AI-driven multi-objective optimization is opening new routes to biocompatible sensing materials — jointly optimizing sensitivity, selectivity, and biocompatibility.",
    author: "Dr. Priya Nair", date: "December 15, 2024", readTime: 8,
    tags: ["Materials", "Research"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    featured: false,
  },
];

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const filtered = regularPosts.filter((p) => {
    const matchSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">From the Lab</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Research Blog</h1>
            <p className="mt-4 text-lg text-slate-300">Insights, findings, and perspectives from our team.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          {featuredPost && !activeTag && search === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Featured Post</p>
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <article className="grid overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-xl lg:grid-cols-2">
                  <div
                    className="min-h-64 bg-cover bg-center lg:min-h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${featuredPost.image})` }}
                  />
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="blue" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary lg:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{featuredPost.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-4 w-4" />{featuredPost.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{featuredPost.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{featuredPost.readTime} min</span>
                    </div>
                    <span className="mt-6 flex items-center gap-2 font-medium text-primary">
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  !activeTag ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:border-primary/50"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    activeTag === tag ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Tag className="h-3 w-3" />{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Post grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg"
              >
                <div
                  className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mb-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">No articles found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
