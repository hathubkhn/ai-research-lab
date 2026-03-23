"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Globe } from "lucide-react";
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

const mockPost = {
  id: "1",
  title: "Understanding Scaling Laws in Large Language Models",
  slug: "scaling-laws-large-language-models",
  excerpt: "We explore how model performance scales with compute, data, and parameters.",
  content: "<h2>Introduction</h2><p>The past few years have witnessed an extraordinary phenomenon...</p>",
  coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  published: true,
  featured: true,
  seoTitle: "Understanding Scaling Laws in LLMs",
  seoDescription: "A deep dive into how model performance scales with compute, data, and parameters.",
  tags: ["Research", "LLMs", "Scaling"],
};

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [content, setContent] = useState(mockPost.content);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(mockPost.tags);
  const [isPublished, setIsPublished] = useState(mockPost.published);
  const [isFeatured, setIsFeatured] = useState(mockPost.featured);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: mockPost.title,
      slug: mockPost.slug,
      excerpt: mockPost.excerpt,
      content: mockPost.content,
      coverImage: mockPost.coverImage,
      published: mockPost.published,
      featured: mockPost.featured,
      seoTitle: mockPost.seoTitle,
      seoDescription: mockPost.seoDescription,
      tags: mockPost.tags,
    },
  });

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
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Post updated successfully!");
    router.push("/admin/blog");
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
          <Button type="submit" variant="outline" size="sm">
            <Save className="mr-1.5 h-4 w-4" />Save
          </Button>
          <Button type="submit" size="sm" onClick={() => { setIsPublished(true); setValue("published", true); }}>
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
                  <Badge key={tag} variant="secondary" className="cursor-pointer text-xs" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input {...register("coverImage")} />
              {mockPost.coverImage && (
                <div
                  className="h-32 w-full rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${mockPost.coverImage})` }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
