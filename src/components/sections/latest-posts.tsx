"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_PREVIEWS } from "@/lib/research-data";

export function LatestPosts() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900/50 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="From the Lab"
            title="Latest Insights"
            description="Research updates, technical deep-dives, and perspectives from our team across bioinformatics, time series, and materials."
            align="left"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/blog">
              All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {BLOG_PREVIEWS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-800"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge variant={post.tagVariant}>{post.tag}</Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2"
                >
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
