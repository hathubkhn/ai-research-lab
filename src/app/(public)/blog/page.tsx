import { prisma } from "@/lib/prisma";
import BlogList from "./blog-list";

export const revalidate = 60; // ISR: revalidate every 60s

async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">From the Lab</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Research Blog</h1>
            <p className="mt-4 text-lg text-slate-300">Insights, findings, and perspectives from our team.</p>
          </div>
        </div>
      </section>

      <BlogList posts={posts} />
    </div>
  );
}
