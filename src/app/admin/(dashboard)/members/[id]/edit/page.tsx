"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memberSchema, type MemberFormData } from "@/lib/validations/member";
import { MemberCategory } from "@prisma/client";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

const mockMember = {
  id: "1", name: "Dr. Sarah Chen", slug: "dr-sarah-chen",
  role: "Principal Investigator & Lab Director",
  category: MemberCategory.PRINCIPAL_INVESTIGATOR,
  email: "s.chen@appliedai.lab",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  shortBio: "Sarah leads the lab's research agenda with a focus on deep learning theory.",
  fullBio: "Dr. Sarah Chen is the founding director of AppliedAI-Lab...",
  researchInterests: ["Deep Learning Theory", "Optimization", "Scaling Laws", "Foundation Models"],
  scholarUrl: "https://scholar.google.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  personalUrl: "https://example.com",
  isAlumni: false,
  displayOrder: 0,
};

const categoryOptions = [
  { value: MemberCategory.PRINCIPAL_INVESTIGATOR, label: "Principal Investigator" },
  { value: MemberCategory.FACULTY, label: "Faculty" },
  { value: MemberCategory.SENIOR_RESEARCHER, label: "Senior Researcher" },
  { value: MemberCategory.PHD_STUDENT, label: "PhD Student" },
  { value: MemberCategory.MASTER_STUDENT, label: "Master Student" },
  { value: MemberCategory.RESEARCH_ASSISTANT, label: "Research Assistant" },
  { value: MemberCategory.ALUMNI, label: "Alumni" },
];

export default function EditMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>(mockMember.researchInterests);
  const [isAlumni, setIsAlumni] = useState(mockMember.isAlumni);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      ...mockMember,
      email: mockMember.email ?? "",
      scholarUrl: mockMember.scholarUrl ?? "",
      githubUrl: mockMember.githubUrl ?? "",
      linkedinUrl: mockMember.linkedinUrl ?? "",
      personalUrl: mockMember.personalUrl ?? "",
      researchInterests: mockMember.researchInterests,
    },
  });

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
    toast.success("Member updated!");
    router.push("/admin/members");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/members"><ArrowLeft className="mr-1.5 h-4 w-4" />Back</Link>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={mockMember.image} />
              <AvatarFallback className="bg-blue-600 text-xs text-white">{getInitials(mockMember.name)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{mockMember.name}</h2>
          </div>
        </div>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          <Save className="mr-1.5 h-4 w-4" />{isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Full Name *</Label>
                  <Input className="mt-1.5" {...register("name")} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label>Slug *</Label>
                  <Input className="mt-1.5 font-mono text-sm" {...register("slug")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Role / Title *</Label>
                  <Input className="mt-1.5" {...register("role")} />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select defaultValue={mockMember.category} onValueChange={(v) => setValue("category", v as MemberCategory)}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
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
                <Input type="email" className="mt-1.5" {...register("email")} />
              </div>
              <div>
                <Label>Short Bio</Label>
                <Textarea rows={3} className="mt-1.5" {...register("shortBio")} />
              </div>
              <div>
                <Label>Full Bio</Label>
                <Textarea rows={5} className="mt-1.5" {...register("fullBio")} />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Profile Links</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Google Scholar</Label><Input className="mt-1.5" {...register("scholarUrl")} /></div>
                <div><Label>GitHub</Label><Input className="mt-1.5" {...register("githubUrl")} /></div>
                <div><Label>LinkedIn</Label><Input className="mt-1.5" {...register("linkedinUrl")} /></div>
                <div><Label>Personal Website</Label><Input className="mt-1.5" {...register("personalUrl")} /></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Research Interests</CardTitle></CardHeader>
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
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Profile Photo</CardTitle></CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <Input {...register("image")} />
              {mockMember.image && (
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mockMember.image} />
                  <AvatarFallback className="bg-blue-600 text-white">{getInitials(mockMember.name)}</AvatarFallback>
                </Avatar>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Status</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alumni</Label>
                  <p className="text-xs text-muted-foreground">No longer active</p>
                </div>
                <Switch checked={isAlumni} onCheckedChange={(v) => { setIsAlumni(v); setValue("isAlumni", v); }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
