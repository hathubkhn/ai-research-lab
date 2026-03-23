import { Metadata } from "next";
import Link from "next/link";
import {
  FileText, Users, Eye, Edit, Plus, TrendingUp, Globe, Clock,
  BookOpen, UserCheck, FileCheck, FilePen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard | Admin" };

const mockStats = [
  { label: "Total Posts", value: "24", icon: FileText, change: "+3 this month", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  { label: "Published", value: "18", icon: Globe, change: "75% publish rate", color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
  { label: "Drafts", value: "6", icon: FilePen, change: "In progress", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  { label: "Total Members", value: "52", icon: Users, change: "+5 this quarter", color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30" },
];

const recentPosts = [
  { id: "1", title: "Diffusion Models for De Novo Molecular Design", status: "Published", date: "Mar 10", views: 1420 },
  { id: "2", title: "Building Foundation Models for Time Series", status: "Published", date: "Feb 20", views: 980 },
  { id: "3", title: "Cooling Greenhouses with AI-Designed Materials", status: "Published", date: "Jan 28", views: 640 },
  { id: "4", title: "RAG for Time Series Imputation", status: "Published", date: "Jan 10", views: 520 },
  { id: "5", title: "Designing Materials for Biosensors with AI", status: "Draft", date: "Dec 15", views: 0 },
];

const recentMembers = [
  { id: "1", name: "Dr. Sarah Chen", role: "Principal Investigator", joined: "2016" },
  { id: "2", name: "Prof. James Rodriguez", role: "Faculty", joined: "2019" },
  { id: "3", name: "Marcus Osei", role: "PhD Student", joined: "2022" },
  { id: "4", name: "Yuki Tanaka", role: "PhD Student", joined: "2023" },
];

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome back, {session?.user?.name?.split(" ")[0] ?? "Admin"} 👋
        </h2>
        <p className="mt-1 text-muted-foreground">Here&apos;s an overview of your lab website.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.label} className="rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild size="sm">
          <Link href="/admin/blog/new"><Plus className="mr-1.5 h-4 w-4" />New Post</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/admin/members/new"><Plus className="mr-1.5 h-4 w-4" />New Member</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/admin/settings">Settings</Link>
        </Button>
      </div>

      {/* Content tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent posts */}
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Recent Posts</CardTitle>
            <Button asChild size="sm" variant="ghost">
              <Link href="/admin/blog">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    {post.status === "Published" ? (
                      <Badge variant="green" className="text-xs">Published</Badge>
                    ) : (
                      <Badge variant="amber" className="text-xs">Draft</Badge>
                    )}
                    <div className="flex gap-1">
                      {post.views > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="h-3 w-3" />{post.views}
                        </span>
                      )}
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent members */}
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Team Members</CardTitle>
            <Button asChild size="sm" variant="ghost">
              <Link href="/admin/members">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Since {member.joined}</span>
                    <Link
                      href={`/admin/members/${member.id}/edit`}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
