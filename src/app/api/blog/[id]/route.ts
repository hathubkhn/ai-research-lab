import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

function calcReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// GET /api/blog/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PUT /api/blog/[id] — update a post
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const {
    title, slug, excerpt, content, coverImage,
    published, featured, seoTitle, seoDescription, tags = [],
  } = body;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Update tags: delete old and recreate
  await prisma.postTag.deleteMany({ where: { postId: id } });
  const tagRecords = await Promise.all(
    (tags as string[]).map((name: string) =>
      prisma.tag.upsert({
        where: { slug: slugify(name) },
        create: { name, slug: slugify(name) },
        update: {},
      })
    )
  );

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      published: published ?? existing.published,
      // Only set publishedAt when first publishing
      publishedAt:
        published && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
      featured: featured ?? existing.featured,
      readTime: content ? calcReadTime(content) : existing.readTime,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      tags: { create: tagRecords.map((t) => ({ tagId: t.id })) },
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/blog/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
