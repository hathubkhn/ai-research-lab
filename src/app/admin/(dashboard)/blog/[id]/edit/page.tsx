"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { postSchema, type PostFormData } from "@/lib/validations/blog";
import { toast } from "sonner";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", slug: "", content: "", published: false, featured: false, tags: [] },
  });

  const coverImage = watch("coverImage");

  useEffect(() => {
    if (coverImage) setCoverPreview(coverImage);
  }, [coverImage]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const post = await res.json();

        const postTags: string[] = post.tags.map((t: { tag: { name: string } }) => t.tag.name);
        setTags(postTags);
        setIsPublished(post.published);
        setIsFeatured(post.featured);
        setContent(post.content);
        setCoverPreview(post.coverImage ?? "");

        reset({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          published: post.published,
          featured: post.featured,
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          tags: postTags,
        });
      } catch {
        toast.error("Could not load post");
        router.push("/admin/blog");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, reset, router]);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setValue("tags", newTags);
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue("tags", newTags);
  }

  async function onSubmit(data: PostFormData) {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, content }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to save");
      }

      toast.success("Post updated!");
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/blog"><ArrowLeft className="mr-1.5 h-4 w-4" />Back</Link>
          </Button>
          <h2 className="text-xl font-bold">Edit Post</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={isSubmitting}
            onClick={() => { setIsPublished(false); setValue("published", false); }}
          >
            <Save className="mr-1.5 h-4 w-4" />Save Draft
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            onClick={() => { setIsPublished(true); setValue("published", true); }}
          >
            <Globe className="mr-1.5 h-4 w-4" />{isPublished ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="rounded-2xl">
            <CardContent className="space-y-4 p-5">
              <div>
                <Label>Title *</Label>
                <Input className="mt-1.5 text-lg font-semibold" {...register("title")} />
                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label>Slug *</Label>
                <Input className="mt-1.5 font-mono text-sm" {...register("slug")} />
                {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug.message}</p>}
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea rows={3} className="mt-1.5" {...register("excerpt")} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Content *</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <RichTextEditor
                content={content}
                onChange={(html) => {
                  setContent(html);
                  setValue("content", html);
                }}
              />
              {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content.message}</p>}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div>
                <Label>SEO Title</Label>
                <Input className="mt-1.5" {...register("seoTitle")} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea rows={2} className="mt-1.5" {...register("seoDescription")} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-xs text-muted-foreground">Visible to public</p>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={(v) => { setIsPublished(v); setValue("published", v); }}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-xs text-muted-foreground">Show in featured slot</p>
                </div>
                <Switch
                  checked={isFeatured}
                  onCheckedChange={(v) => { setIsFeatured(v); setValue("featured", v); }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input
                placeholder="Type tag + Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer text-xs"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <p className="text-xs text-muted-foreground">No tags added</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input placeholder="https://..." {...register("coverImage")} />
              {errors.coverImage && <p className="mt-1 text-xs text-destructive">{errors.coverImage.message}</p>}
              {coverPreview && (
                <div
                  className="h-32 w-full rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${coverPreview})` }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
