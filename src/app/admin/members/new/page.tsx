"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memberSchema, type MemberFormData } from "@/lib/validations/member";
import { MemberCategory } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

const categoryOptions = [
  { value: MemberCategory.PRINCIPAL_INVESTIGATOR, label: "Principal Investigator" },
  { value: MemberCategory.FACULTY, label: "Faculty" },
  { value: MemberCategory.SENIOR_RESEARCHER, label: "Senior Researcher" },
  { value: MemberCategory.PHD_STUDENT, label: "PhD Student" },
  { value: MemberCategory.MASTER_STUDENT, label: "Master Student" },
  { value: MemberCategory.RESEARCH_ASSISTANT, label: "Research Assistant" },
  { value: MemberCategory.ALUMNI, label: "Alumni" },
];

export default function NewMemberPage() {
  const router = useRouter();
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [isAlumni, setIsAlumni] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      slug: "",
      role: "",
      category: MemberCategory.PHD_STUDENT,
      isAlumni: false,
      displayOrder: 0,
      researchInterests: [],
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue("name", val);
    setValue("slug", slugify(val));
  }

  function addInterest(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      const interest = interestInput.trim();
      if (!interests.includes(interest)) {
        const newInterests = [...interests, interest];
        setInterests(newInterests);
        setValue("researchInterests", newInterests);
      }
      setInterestInput("");
    }
  }

  function removeInterest(interest: string) {
    const newInterests = interests.filter((i) => i !== interest);
    setInterests(newInterests);
    setValue("researchInterests", newInterests);
  }

  async function onSubmit(data: MemberFormData) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Member added successfully!");
    router.push("/admin/members");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/members"><ArrowLeft className="mr-1.5 h-4 w-4" />Back</Link>
          </Button>
          <h2 className="text-xl font-bold">New Member</h2>
        </div>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          <Save className="mr-1.5 h-4 w-4" />{isSubmitting ? "Saving..." : "Save Member"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-5 lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="Dr. Jane Smith" className="mt-1.5" {...register("name")} onChange={handleNameChange} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input placeholder="jane-smith" className="mt-1.5 font-mono text-sm" {...register("slug")} />
                  {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Role / Title *</Label>
                  <Input placeholder="e.g. PhD Candidate (Year 2)" className="mt-1.5" {...register("role")} />
                  {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role.message}</p>}
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select defaultValue={MemberCategory.PHD_STUDENT} onValueChange={(v) => setValue("category", v as MemberCategory)}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="jane@appliedai.lab" className="mt-1.5" {...register("email")} />
              </div>

              <div>
                <Label>Short Bio</Label>
                <Textarea placeholder="2–3 sentence bio shown on the member card..." rows={3} className="mt-1.5" {...register("shortBio")} />
              </div>

              <div>
                <Label>Full Bio</Label>
                <Textarea placeholder="Extended bio for the member detail view..." rows={5} className="mt-1.5" {...register("fullBio")} />
              </div>
            </CardContent>
          </Card>

          {/* Profile links */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Profile Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Google Scholar URL</Label>
                  <Input placeholder="https://scholar.google.com/..." className="mt-1.5" {...register("scholarUrl")} />
                </div>
                <div>
                  <Label>GitHub URL</Label>
                  <Input placeholder="https://github.com/..." className="mt-1.5" {...register("githubUrl")} />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input placeholder="https://linkedin.com/in/..." className="mt-1.5" {...register("linkedinUrl")} />
                </div>
                <div>
                  <Label>Personal Website</Label>
                  <Input placeholder="https://..." className="mt-1.5" {...register("personalUrl")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Research Interests */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Research Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input
                placeholder="Type interest + Enter"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={addInterest}
              />
              <div className="flex flex-wrap gap-1.5">
                {interests.map((interest) => (
                  <Badge key={interest} variant="blue" className="cursor-pointer text-xs" onClick={() => removeInterest(interest)}>
                    {interest} <X className="ml-1 h-2.5 w-2.5" />
                  </Badge>
                ))}
                {interests.length === 0 && (
                  <p className="text-xs text-muted-foreground">No interests added</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photo */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input placeholder="https://..." {...register("image")} />
              <p className="text-xs text-muted-foreground">Enter an image URL</p>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alumni</Label>
                  <p className="text-xs text-muted-foreground">No longer active member</p>
                </div>
                <Switch
                  checked={isAlumni}
                  onCheckedChange={(v) => { setIsAlumni(v); setValue("isAlumni", v); }}
                />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input type="number" min="0" placeholder="0" className="mt-1.5" {...register("displayOrder", { valueAsNumber: true })} />
                <p className="mt-1 text-xs text-muted-foreground">Lower = shown first</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
