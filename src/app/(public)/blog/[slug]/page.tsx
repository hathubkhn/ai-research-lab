import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const posts: Record<string, {
  slug: string; title: string; excerpt: string; content: string;
  author: string; authorImage: string; authorRole: string;
  date: string; readTime: number; tags: string[];
  image: string;
}> = {
  "scaling-laws-large-language-models": {
    slug: "scaling-laws-large-language-models",
    title: "Understanding Scaling Laws in Large Language Models",
    excerpt: "We explore how model performance scales with compute, data, and parameters.",
    content: `
## Introduction

The past few years have witnessed an extraordinary phenomenon in deep learning: as we scale up neural networks — more parameters, more data, more compute — performance improves in remarkably predictable ways. This isn't merely an empirical curiosity; it has become a strategic foundation for how leading AI labs plan their research agendas.

In this post, we share our team's analysis of scaling laws, drawing from our own experiments with models ranging from 125M to 70B parameters.

## What Are Scaling Laws?

Scaling laws describe mathematical relationships between model size, dataset size, compute budget, and final performance. The seminal work by Kaplan et al. (2020) found that for autoregressive language models trained with cross-entropy loss:

\`\`\`
L(N) ≈ (N_c / N)^α_N
L(D) ≈ (D_c / D)^α_D
\`\`\`

Where \`N\` is the number of parameters, \`D\` is the dataset size, and the \`α\` exponents govern how quickly loss improves.

## Chinchilla's Revision

The original scaling laws suggested that for a fixed compute budget, it was optimal to train larger models on fewer tokens. The Chinchilla work by Hoffmann et al. (2022) challenged this conclusion by training 400+ models and finding that optimal allocation requires roughly **equal scaling of model size and training tokens**.

This had massive practical implications: Chinchilla (70B parameters, 1.4T tokens) outperformed GPT-3 (175B parameters, 300B tokens) despite using 4x less compute.

## Our Findings

Over the past 18 months, we've conducted our own systematic scaling experiments focused on:

1. **Domain-specific scaling** — Does the optimal compute allocation differ for code vs. scientific text?
2. **Data quality effects** — How does data filtering affect the effective scaling exponents?
3. **Architecture variations** — Do different attention mechanisms change the scaling behavior?

### Key Finding 1: Data Quality Shifts the Slope

When we trained on high-quality filtered corpora versus raw web text, we observed that the loss exponent α_D increases by approximately 0.15-0.2, meaning high-quality data is more efficiently utilized at scale.

### Key Finding 2: Domain Specialists Scale Differently

For models fine-tuned on scientific literature, we observe a steeper improvement curve for reasoning benchmarks compared to general models of equivalent size. This suggests domain-specific scaling laws may deserve more attention.

## Implications for Research

These findings have several implications:

- **Data curation matters more than we thought**: Investing in data quality may be as impactful as increasing model size.
- **Evaluation benchmarks must evolve**: Current benchmarks saturate quickly as models scale; we need harder evaluations.
- **Compute efficiency is a research priority**: Finding better compute-optimal training recipes is a high-value research direction.

## Conclusion

Scaling laws give us a lens into the deep structure of how neural networks learn from data. Understanding and extending these laws is not just an academic exercise — it directly informs how we should invest compute resources and design future research programs.

We'll be releasing our experimental codebase and a detailed analysis paper next month. Stay tuned.
    `,
    author: "Dr. Sarah Chen",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    authorRole: "Principal Investigator & Lab Director",
    date: "March 15, 2025",
    readTime: 8,
    tags: ["Research", "LLMs", "Scaling"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="pt-16">
      {/* Cover image */}
      <div
        className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 sm:h-96"
        style={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <header className="mt-6 mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="blue">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.authorImage} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium text-foreground">{post.author}</span>
                <span className="text-xs block">{post.authorRole}</span>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} min read</span>
          </div>
        </header>

        <Separator />

        {/* Content */}
        <div className="prose prose-slate prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-2xl prose-pre:bg-slate-900">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i}>{paragraph.slice(3)}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i}>{paragraph.slice(4)}</h3>;
            }
            if (paragraph.startsWith("```")) {
              const code = paragraph.replace(/^```\w*\n/, "").replace(/```$/, "");
              return <pre key={i}><code>{code}</code></pre>;
            }
            if (paragraph.match(/^[0-9]+\./m) || paragraph.match(/^-\s/m)) {
              return <p key={i} className="whitespace-pre-line">{paragraph}</p>;
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        {/* Share */}
        <div className="mt-12 rounded-2xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Share this article</h3>
          <div className="flex gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              <Twitter className="h-4 w-4" /> Twitter
            </a>
            <a href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://appliedai.lab/blog/" + slug)}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              <Link2 className="h-4 w-4" /> Copy Link
            </button>
          </div>
        </div>

        {/* Author block */}
        <div className="mt-8 rounded-2xl border bg-card p-6 mb-16">
          <h3 className="mb-4 font-semibold text-foreground">About the Author</h3>
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={post.authorImage} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Dr. Sarah Chen is the founding director of AppliedAI-Lab. Her research focuses on deep learning theory, optimization, and scaling laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
