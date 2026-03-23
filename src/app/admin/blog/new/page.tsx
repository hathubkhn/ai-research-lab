"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Eye, Globe } from "lucide-react";
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
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: "", slug: "", content: "", published: false, featured: false, tags: [] },
  });

  const title = watch("title");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue("title", val);
    setValue("slug", slugify(val));
  }

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
    toast.success(isPublished ? "Post published!" : "Draft saved!");
    router.push("/admin/blog");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/blog"><ArrowLeft className="mr-1.5 h-4 w-4" />Back</Link>
          </Button>
          <h2 className="text-xl font-bold">New Post</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" variant="outline" size="sm" onClick={() => setIsPublished(false)}>
            <Save className="mr-1.5 h-4 w-4" />Save Draft
          </Button>
          <Button type="submit" size="sm" onClick={() => { setIsPublished(true); setValue("published", true); }}>
            <Globe className="mr-1.5 h-4 w-4" />Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main editor */}
        <div className="space-y-5 lg:col-span-2">
          <Card className="rounded-2xl">
            <CardContent className="space-y-4 p-5">
              <div>
                <Label>Title *</Label>
                <Input
                  placeholder="Enter post title..."
                  className="mt-1.5 text-lg font-semibold"
                  {...register("title")}
                  onChange={handleTitleChange}
                />
                {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>}
              </div>
              <div>
                <Label>Slug *</Label>
                <Input placeholder="post-slug" className="mt-1.5 font-mono text-sm" {...register("slug")} />
                {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug.message}</p>}
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea
                  placeholder="Brief summary shown in listings..."
                  rows={3}
                  className="mt-1.5"
                  {...register("excerpt")}
                />
                {errors.excerpt && <p className="mt-1 text-xs text-destructive">{errors.excerpt.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Content editor */}
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
                placeholder="Write your post content here..."
              />
              {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content.message}</p>}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div>
                <Label>SEO Title</Label>
                <Input placeholder="SEO title (max 70 chars)" className="mt-1.5" {...register("seoTitle")} />
                <p className="mt-1 text-xs text-muted-foreground">Leave blank to use post title</p>
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea placeholder="Meta description (max 160 chars)" rows={2} className="mt-1.5" {...register("seoDescription")} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish settings */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-xs text-muted-foreground">Make visible to public</p>
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

          {/* Tags */}
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

          {/* Cover image */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input placeholder="https://..." {...register("coverImage")} />
              {errors.coverImage && <p className="mt-1 text-xs text-destructive">{errors.coverImage.message}</p>}
              <p className="text-xs text-muted-foreground">Enter an image URL or upload a file</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
