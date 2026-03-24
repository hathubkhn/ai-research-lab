"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const settingsSchema = z.object({
  labName: z.string().min(2),
  tagline: z.string().max(200),
  description: z.string().max(500),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string(),
  heroTitle: z.string().max(200),
  heroSubtext: z.string().max(500),
  githubUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  footerText: z.string().max(300).optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const defaultValues: SettingsFormData = {
  labName: "AppliedAI-Lab",
  tagline: "Advancing AI for Science and Society",
  description: "A research group applying state-of-the-art AI to high-impact scientific domains — bioinformatics, time series analysis, and materials design.",
  email: "thu.nguyenthi6@hust.edu.vn",
  phone: "+84 (0) 24 3868 2410",
  address: "School of Information and Communication Technology, Hanoi University of Science and Technology, 1 Dai Co Viet, Hai Ba Trung, Hanoi, Vietnam",
  heroTitle: "AI for Bioinformatics, Time Series, and Materials",
  heroSubtext: "We apply state-of-the-art AI to high-impact scientific domains — advancing molecular discovery, sequential data analysis, and functional material design.",
  githubUrl: "https://github.com",
  twitterUrl: "https://twitter.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  footerText: "Applying AI to bioinformatics, time series, and materials research — with rigor and openness.",
};

export default function AdminSettingsPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  async function onSubmit(data: SettingsFormData) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Settings saved successfully!");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your lab website configuration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Lab Identity</CardTitle>
                <CardDescription>Core information about your research lab</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                    <FlaskConical className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{defaultValues.labName}</p>
                    <p className="text-sm text-muted-foreground">{defaultValues.tagline}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Lab Name *</Label>
                    <Input className="mt-1.5" {...register("labName")} />
                    {errors.labName && <p className="mt-1 text-xs text-destructive">{errors.labName.message}</p>}
                  </div>
                  <div>
                    <Label>Tagline *</Label>
                    <Input className="mt-1.5" {...register("tagline")} />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea rows={3} className="mt-1.5" {...register("description")} />
                  <p className="mt-1 text-xs text-muted-foreground">Shown in meta descriptions and about sections</p>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-1.5 h-4 w-4" />{isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage */}
          <TabsContent value="homepage">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Homepage Content</CardTitle>
                <CardDescription>Update the hero section and homepage messaging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label>Hero Title *</Label>
                  <Input className="mt-1.5 text-lg font-semibold" {...register("heroTitle")} />
                </div>
                <div>
                  <Label>Hero Subtext</Label>
                  <Textarea rows={3} className="mt-1.5" {...register("heroSubtext")} />
                </div>
                <div>
                  <Label>Footer Text</Label>
                  <Textarea rows={2} className="mt-1.5" {...register("footerText")} />
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-1.5 h-4 w-4" />Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Shown on the contact page and footer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Email *</Label>
                    <Input type="email" className="mt-1.5" {...register("email")} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="tel" className="mt-1.5" {...register("phone")} />
                  </div>
                </div>
                <div>
                  <Label>Office Address</Label>
                  <Textarea rows={3} className="mt-1.5" {...register("address")} />
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-1.5 h-4 w-4" />Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social */}
          <TabsContent value="social">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Links shown in the footer and header</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>GitHub</Label>
                    <Input placeholder="https://github.com/appliedai" className="mt-1.5" {...register("githubUrl")} />
                  </div>
                  <div>
                    <Label>Twitter / X</Label>
                    <Input placeholder="https://twitter.com/appliedai" className="mt-1.5" {...register("twitterUrl")} />
                  </div>
                  <div>
                    <Label>LinkedIn</Label>
                    <Input placeholder="https://linkedin.com/company/appliedai" className="mt-1.5" {...register("linkedinUrl")} />
                  </div>
                  <div>
                    <Label>YouTube</Label>
                    <Input placeholder="https://youtube.com/@appliedai" className="mt-1.5" {...register("youtubeUrl")} />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Save className="mr-1.5 h-4 w-4" />Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
