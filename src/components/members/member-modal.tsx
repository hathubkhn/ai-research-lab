"use client";

import { Mail, Github, Linkedin, BookOpen, ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

interface MemberModalProps {
  member: {
    name: string;
    role: string;
    category: string;
    email?: string | null;
    image?: string | null;
    shortBio?: string | null;
    fullBio?: string | null;
    researchInterests: string[];
    scholarUrl?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    personalUrl?: string | null;
    isAlumni: boolean;
  } | null;
  open: boolean;
  onClose: () => void;
}

export function MemberModal({ member, open, onClose }: MemberModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-border ring-offset-2">
              <AvatarImage src={member.image || undefined} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{member.name}</h2>
                {member.isAlumni && (
                  <Badge variant="amber" className="text-xs">Alumni</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              {/* Social links */}
              <div className="mt-2 flex gap-1.5">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30">
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {member.scholarUrl && (
                  <a href={member.scholarUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30">
                    <BookOpen className="h-4 w-4" />
                  </a>
                )}
                {member.githubUrl && (
                  <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {member.personalUrl && (
                  <a href={member.personalUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Research interests */}
        {member.researchInterests.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Research Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {member.researchInterests.map((interest) => (
                <Badge key={interest} variant="blue" className="text-xs">{interest}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">About</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {member.fullBio || member.shortBio || "No bio available."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
