"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  readTime: number | null;
  featured: boolean;
  author: { name: string | null; email: string };
  tags: { tag: { name: string } }[];
};

export default function BlogList({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags.map((t) => t.tag.name))));
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const filtered = regularPosts.filter((p) => {
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt ?? "").toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || p.tags.some((t) => t.tag.name === activeTag);
    return matchSearch && matchTag;
  });

  function formatDate(d: string | null) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  return (
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
                  style={{
                    backgroundImage: featuredPost.coverImage
                      ? `url(${featuredPost.coverImage})`
                      : "linear-gradient(135deg,#1e40af,#4f46e5)",
                  }}
                />
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {featuredPost.tags.map(({ tag }) => (
                      <Badge key={tag.name} variant="blue" className="text-xs">{tag.name}</Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary lg:text-3xl">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="mt-3 text-muted-foreground">{featuredPost.excerpt}</p>
                  )}
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author.name ?? featuredPost.author.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    {featuredPost.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />{featuredPost.readTime} min
                      </span>
                    )}
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
                !activeTag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input text-muted-foreground hover:border-primary/50"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTag === tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input text-muted-foreground hover:border-primary/50"
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
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
                {post.coverImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {post.tags.map(({ tag }) => (
                    <Badge key={tag.name} variant="secondary" className="text-xs">{tag.name}</Badge>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mb-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                {post.excerpt && (
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />{post.author.name ?? post.author.email}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{formatDate(post.publishedAt)}
                  </span>
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
  );
}
