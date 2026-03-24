import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

function calcReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// GET /api/blog — list all posts for the admin
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(posts);
}

// POST /api/blog — create a new post
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const {
    title, slug, excerpt, content, coverImage,
    published, featured, seoTitle, seoDescription, tags = [],
  } = body;

  const tagRecords = await Promise.all(
    (tags as string[]).map((name: string) =>
      prisma.tag.upsert({
        where: { slug: slugify(name) },
        create: { name, slug: slugify(name) },
        update: {},
      })
    )
  );

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
      featured: featured ?? false,
      readTime: calcReadTime(content),
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      authorId: user.id,
      tags: { create: tagRecords.map((t) => ({ tagId: t.id })) },
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(post, { status: 201 });
}
