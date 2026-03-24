"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Globe, FilePen, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  publishedAt: string | null;
  author: { name: string | null; email: string };
  tags: { tag: { name: string } }[];
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPosts(data);
    } catch {
      toast.error("Could not load blog posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPosts(); }, []);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.author.name ?? p.author.email).toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  }

  async function handleTogglePublish(post: Post) {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          content: "",
          published: !post.published,
          featured: post.featured,
          tags: post.tags.map((t) => t.tag.name),
        }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
      toast.success(post.published ? "Post unpublished" : "Post published");
    } catch {
      toast.error("Failed to update post");
    }
  }

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-sm text-muted-foreground">{published} published · {drafts} drafts</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new"><Plus className="mr-2 h-4 w-4" />New Post</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Posts", value: posts.length, icon: FilePen, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
          { label: "Published", value: published, icon: Globe, color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
          { label: "Drafts", value: drafts, icon: Edit, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
          <CardTitle className="text-base">All Posts</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tags</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((post) => (
                    <tr key={post.id} className="transition-colors hover:bg-muted/20">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground line-clamp-1 max-w-xs">{post.title}</p>
                        <p className="text-xs text-muted-foreground">/blog/{post.slug}</p>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {post.author.name ?? post.author.email}
                      </td>
                      <td className="px-4 py-4">
                        {post.published ? (
                          <Badge variant="green" className="text-xs">Published</Badge>
                        ) : (
                          <Badge variant="amber" className="text-xs">Draft</Badge>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map(({ tag }) => (
                            <Badge key={tag.name} variant="secondary" className="text-xs">{tag.name}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {post.published && (
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                              title="View live"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                          )}
                          <button
                            onClick={() => handleTogglePublish(post)}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                            title={post.published ? "Unpublish" : "Publish"}
                          >
                            <Globe className="h-3.5 w-3.5" />
                          </button>
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;{post.title}&quot;? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(post.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && !loading && (
                <p className="py-12 text-center text-muted-foreground">No posts found.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
