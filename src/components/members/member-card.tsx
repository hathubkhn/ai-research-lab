"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    category: string;
    email?: string | null;
    image?: string | null;
    shortBio?: string | null;
    researchInterests: string[];
    scholarUrl?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    personalUrl?: string | null;
    isAlumni: boolean;
  };
  onClick?: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group cursor-pointer rounded-2xl border bg-card p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg dark:hover:border-blue-800"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <Avatar className="h-20 w-20 ring-2 ring-border ring-offset-2 ring-offset-card transition-all group-hover:ring-primary">
            <AvatarImage src={member.image || undefined} alt={member.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          {member.isAlumni && (
            <span className="absolute -right-1 -top-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              Alumni
            </span>
          )}
        </div>

        {/* Info */}
        <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{member.role}</p>

        {/* Research interests */}
        {member.researchInterests.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            {member.researchInterests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {member.researchInterests.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{member.researchInterests.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Bio */}
        {member.shortBio && (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {member.shortBio}
          </p>
        )}

        {/* Social links */}
        <div className="mt-4 flex gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
          {member.scholarUrl && (
            <a
              href={member.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
              aria-label="Google Scholar"
            >
              <BookOpen className="h-3.5 w-3.5" />
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          )}
          {member.personalUrl && (
            <a
              href={member.personalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
              aria-label="Website"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
