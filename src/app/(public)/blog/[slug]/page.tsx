import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Twitter, Linkedin, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: {
      author: { select: { name: true, email: true, image: true } },
      tags: { include: { tag: true } },
    },
  });
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt ?? undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const authorName = post.author.name ?? post.author.email;
  const authorInitials = authorName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="pt-16">
      {/* Cover image */}
      <div
        className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-blue-900 to-slate-900 sm:h-96"
        style={
          post.coverImage
            ? { backgroundImage: `url(${post.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
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
            {post.tags.map(({ tag }) => (
              <Badge key={tag.name} variant="blue">{tag.name}</Badge>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                {post.author.image && <AvatarImage src={post.author.image} />}
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">{authorName}</span>
            </div>
            {publishedDate && (
              <>
                <Separator orientation="vertical" className="h-5" />
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{publishedDate}</span>
              </>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} min read</span>
            )}
          </div>
        </header>

        <Separator />

        {/* Content — rendered as HTML from the rich text editor */}
        <div
          className="prose prose-slate prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-2xl prose-pre:bg-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="mt-12 rounded-2xl border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Share this article</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Twitter className="h-4 w-4" /> Twitter
            </a>
            <a
              href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/blog/${slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
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
              {post.author.image && <AvatarImage src={post.author.image} />}
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{authorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
