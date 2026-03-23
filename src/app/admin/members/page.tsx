"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

const initialMembers = [
  { id: "1", name: "Dr. Sarah Chen", role: "Principal Investigator", category: "PRINCIPAL_INVESTIGATOR", email: "s.chen@appliedai.lab", image: "https://randomuser.me/api/portraits/women/44.jpg", isAlumni: false, interests: ["AI for Science", "Generative Models"] },
  { id: "2", name: "Prof. James Rodriguez", role: "Bioinformatics Research Lead", category: "FACULTY", email: "j.rodriguez@appliedai.lab", image: "https://randomuser.me/api/portraits/men/32.jpg", isAlumni: false, interests: ["Molecular Generation", "Drug Discovery"] },
  { id: "3", name: "Dr. Aisha Patel", role: "Time Series Research Lead", category: "SENIOR_RESEARCHER", email: "a.patel@appliedai.lab", image: "https://randomuser.me/api/portraits/women/68.jpg", isAlumni: false, interests: ["Foundation Models", "Spatio-Temporal Learning"] },
  { id: "4", name: "Dr. Priya Nair", role: "Materials Research Lead", category: "SENIOR_RESEARCHER", email: "p.nair@appliedai.lab", image: "https://randomuser.me/api/portraits/women/57.jpg", isAlumni: false, interests: ["Material Design", "Generative AI"] },
  { id: "5", name: "Marcus Osei", role: "PhD Candidate (Year 3)", category: "PHD_STUDENT", email: "m.osei@appliedai.lab", image: "https://randomuser.me/api/portraits/men/85.jpg", isAlumni: false, interests: ["Binding Affinity", "Explainable AI"] },
  { id: "6", name: "Yuki Tanaka", role: "PhD Candidate (Year 2)", category: "PHD_STUDENT", email: "y.tanaka@appliedai.lab", image: "https://randomuser.me/api/portraits/women/28.jpg", isAlumni: false, interests: ["Visual Forecasting", "Vision Transformers"] },
  { id: "7", name: "Dr. Kevin Williams", role: "Research Scientist @ AstraZeneca", category: "ALUMNI", email: null, image: "https://randomuser.me/api/portraits/men/22.jpg", isAlumni: true, interests: ["Scaffold Generation", "Drug Discovery"] },
];

const categoryLabels: Record<string, string> = {
  PRINCIPAL_INVESTIGATOR: "PI",
  FACULTY: "Faculty",
  SENIOR_RESEARCHER: "Sr. Researcher",
  PHD_STUDENT: "PhD",
  MASTER_STUDENT: "Master",
  RESEARCH_ASSISTANT: "RA",
  ALUMNI: "Alumni",
};

export default function AdminMembersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success("Member removed");
  }

  const active = members.filter((m) => !m.isAlumni).length;
  const alumni = members.filter((m) => m.isAlumni).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Members</h2>
          <p className="text-sm text-muted-foreground">{active} active · {alumni} alumni</p>
        </div>
        <Button asChild>
          <Link href="/admin/members/new"><Plus className="mr-2 h-4 w-4" />New Member</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Active Members", value: active, icon: UserCheck, color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
          { label: "Alumni", value: alumni, icon: UserX, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
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
          <CardTitle className="text-base">All Members</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Member</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Interests</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr key={member.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarImage src={member.image || undefined} alt={member.name} />
                          <AvatarFallback className="bg-blue-600 text-xs text-white">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[member.category] ?? member.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {member.email ?? "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {member.interests.slice(0, 2).map((i) => (
                          <Badge key={i} variant="outline" className="text-xs">{i}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {member.isAlumni ? (
                        <Badge variant="amber" className="text-xs">Alumni</Badge>
                      ) : (
                        <Badge variant="green" className="text-xs">Active</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/members/${member.id}/edit`}
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
                              <AlertDialogTitle>Remove Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove <strong>{member.name}</strong>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(member.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Remove
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
            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">No members found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
