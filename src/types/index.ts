import { Post, Tag, Member, User, SiteSetting, MemberCategory, UserRole } from "@prisma/client";

export type { MemberCategory, UserRole };

export type PostWithAuthorAndTags = Post & {
  author: Pick<User, "id" | "name" | "email" | "image">;
  tags: { tag: Tag }[];
};

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  readTime: number | null;
  author: Pick<User, "id" | "name" | "image">;
  tags: { tag: Pick<Tag, "id" | "name" | "slug" | "color"> }[];
};

export type MemberWithCategory = Member;

export type SiteSettings = Record<string, string>;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "Active" | "Ongoing" | "Archived";
  image?: string;
  url?: string;
  githubUrl?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
  type: "paper" | "award" | "grant";
}

export interface LabStat {
  label: string;
  value: string;
  icon: string;
}
