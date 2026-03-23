"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Linkedin, ExternalLink, BookOpen,
  Crown, Star, Users, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MemberModal } from "@/components/members/member-modal";
import { getInitials } from "@/lib/utils";
import {
  director,
  researchLead,
  researchFields,
  type Member,
  type ResearchField,
} from "@/lib/members-data";

// ─── Sub-components ────────────────────────────────────────────────────────────

function LinkedInButton({ url, size = "sm" }: { url: string; size?: "sm" | "md" }) {
  const cls =
    size === "md"
      ? "flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      : "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
  const iconCls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={cls} aria-label="LinkedIn">
        <Linkedin className={iconCls} />
      </a>
    </div>
  );
}

function SocialLinks({ member, size = "sm" }: { member: Member; size?: "sm" | "md" }) {
  const hasAny = member.linkedinUrl || member.scholarUrl || member.personalUrl;
  if (!hasAny) return null;

  const btnCls =
    size === "md"
      ? "flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      : "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
  const iconCls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
      {member.linkedinUrl && <LinkedInButton url={member.linkedinUrl} size={size} />}
      {member.scholarUrl && (
        <a href={member.scholarUrl} target="_blank" rel="noopener noreferrer" className={btnCls} aria-label="Google Scholar">
          <BookOpen className={iconCls} />
        </a>
      )}
      {member.personalUrl && (
        <a href={member.personalUrl} target="_blank" rel="noopener noreferrer" className={btnCls} aria-label="Website">
          <ExternalLink className={iconCls} />
        </a>
      )}
    </div>
  );
}

function DirectorCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 shadow-lg transition-all hover:border-blue-400 hover:shadow-xl dark:border-blue-800 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30"
      onClick={onClick}
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
            <Crown className="h-3.5 w-3.5 text-white" />
          </div>
          <Avatar className="h-28 w-28 ring-4 ring-blue-200 ring-offset-4 ring-offset-white shadow-xl dark:ring-blue-700 dark:ring-offset-slate-900">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/40">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
              Lab Director
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {member.name}
          </h2>
          <p className="mt-1 font-medium text-muted-foreground">{member.role}</p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {member.shortBio}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {member.researchInterests.map((interest) => (
              <Badge key={interest} variant="blue" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex justify-center sm:justify-start">
            <SocialLinks member={member} size="md" />
          </div>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap justify-center gap-2 border-t border-blue-100 pt-4 dark:border-blue-900">
        <span className="mr-1 self-center text-xs text-muted-foreground">Oversees:</span>
        {researchFields.map((f) => (
          <span
            key={f.id}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${f.iconBg} ${f.iconColor}`}
          >
            <f.icon className="h-3 w-3" />
            {f.shortName}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResearchLeadCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 shadow-md transition-all hover:border-cyan-400 hover:shadow-lg dark:border-cyan-800 dark:from-cyan-950/30 dark:via-slate-900 dark:to-blue-950/20"
      onClick={onClick}
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-400/10 blur-2xl" />

      <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow">
            <Star className="h-3 w-3 text-white" />
          </div>
          <Avatar className="h-20 w-20 ring-4 ring-cyan-200 ring-offset-2 ring-offset-white shadow-lg dark:ring-cyan-700 dark:ring-offset-slate-900">
            <AvatarFallback className="bg-gradient-to-br from-cyan-600 to-blue-600 text-2xl font-bold text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 dark:bg-cyan-900/40">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
              Research Lead
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-foreground">{member.name}</h2>
          <p className="mt-0.5 text-sm font-medium text-muted-foreground">{member.role}</p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {member.shortBio}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {member.researchInterests.map((interest) => (
              <Badge key={interest} variant="cyan" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex justify-center sm:justify-start">
            <SocialLinks member={member} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCard({
  member,
  field,
  delay = 0,
  onClick,
}: {
  member: Member;
  field: ResearchField;
  delay?: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="group cursor-pointer rounded-2xl border bg-card p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-800"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <Avatar className={`mb-3 h-16 w-16 ring-2 ring-border ring-offset-2 ring-offset-card transition-all group-hover:ring-primary`}>
          <AvatarFallback className={`bg-gradient-to-br ${field.gradient} text-sm font-bold text-white`}>
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <h4 className="text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {member.name}
        </h4>
        <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{member.role}</p>
        {member.researchInterests.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {member.researchInterests.slice(0, 2).map((i) => (
              <Badge key={i} variant="secondary" className="px-1.5 py-0 text-[10px]">
                {i}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-3">
          <SocialLinks member={member} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [activeField, setActiveField] = useState<string>("all");
  const [selected, setSelected] = useState<Member | null>(null);

  const searchLower = search.toLowerCase();

  function matchesMember(m: Member) {
    if (!search) return true;
    return (
      m.name.toLowerCase().includes(searchLower) ||
      m.role.toLowerCase().includes(searchLower) ||
      m.researchInterests.some((r) => r.toLowerCase().includes(searchLower))
    );
  }

  const allMembers: Member[] = [
    director,
    researchLead,
    ...researchFields.flatMap((f) => f.members),
  ];

  const totalActive = 2 + researchFields.reduce((acc, f) => acc + f.members.length, 0);

  const showDirectorSection = activeField === "all";
  const noResults =
    search &&
    !matchesMember(director) &&
    !matchesMember(researchLead) &&
    researchFields.every((f) => f.members.every((m) => !matchesMember(m)));

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-24">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">Our Team</p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Meet the Researchers
            </h1>
            <p className="mt-5 text-lg text-slate-300">
              One director, one research lead, and three research groups united by AI for science.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
              {[
                { label: "Total Members", value: totalActive },
                { label: "Research Groups", value: 3 },
                { label: "Bioinformatics", value: researchFields[0].members.length },
                { label: "Time Series", value: researchFields[1].members.length },
              ].map((s) => (
                <div key={s.label} className="px-4">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Search + field filter */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveField("all")}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeField === "all"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <Users className="h-3 w-3" /> All Groups
              </button>
              {researchFields.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveField(f.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    activeField === f.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <f.icon className="h-3 w-3" />
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── Lab Leadership ── */}
          {showDirectorSection && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-10 space-y-5"
            >
              {/* Director */}
              {matchesMember(director) && (
                <div className="mx-auto max-w-3xl">
                  <DirectorCard member={director} onClick={() => setSelected(director)} />
                </div>
              )}

              {/* Research Lead */}
              {matchesMember(researchLead) && (
                <div className="mx-auto max-w-3xl">
                  <ResearchLeadCard member={researchLead} onClick={() => setSelected(researchLead)} />
                </div>
              )}

              {/* Connector to field columns */}
              {(matchesMember(director) || matchesMember(researchLead)) && (
                <>
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 36 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="w-px bg-gradient-to-b from-blue-400 to-transparent"
                    />
                  </div>
                  <div className="relative mx-8 flex items-center justify-center">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700" />
                    <ChevronDown className="relative -top-1 h-4 w-4 text-blue-400" />
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* ── Research Groups ── */}
          <div
            className={`grid gap-8 ${
              activeField === "all" ? "lg:grid-cols-3" : "mx-auto max-w-2xl grid-cols-1"
            }`}
          >
            {researchFields
              .filter((f) => activeField === "all" || activeField === f.id)
              .map((field, fi) => {
                const visibleMembers = field.members.filter(matchesMember);
                const hasContent = visibleMembers.length > 0 || !search;

                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: fi * 0.1 }}
                    className="flex flex-col"
                  >
                    {/* Field header */}
                    <div
                      className={`mb-4 rounded-2xl bg-gradient-to-r ${field.gradient} p-5 text-white shadow-md`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                          <field.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold leading-tight">{field.name}</h3>
                          <p className="mt-0.5 text-xs text-white/75">
                            {field.members.length > 0
                              ? `${field.members.length} researcher${field.members.length !== 1 ? "s" : ""}`
                              : "Recruiting — coming soon"}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/80">
                        {field.description}
                      </p>
                    </div>

                    {/* Members grid */}
                    {visibleMembers.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {visibleMembers.map((m, i) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            field={field}
                            delay={i * 0.08}
                            onClick={() => setSelected(m)}
                          />
                        ))}
                      </div>
                    )}

                    {/* Empty state for this field */}
                    {field.members.length === 0 && (
                      <div
                        className={`flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed py-10 ${field.border} ${field.lightBg}`}
                      >
                        <field.icon className={`mb-2 h-8 w-8 ${field.iconColor} opacity-50`} />
                        <p className="text-sm font-medium text-muted-foreground">Members coming soon</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          We are actively recruiting for this group.
                        </p>
                      </div>
                    )}

                    {/* Search no match */}
                    {search && field.members.length > 0 && visibleMembers.length === 0 && (
                      <p className="py-4 text-center text-xs text-muted-foreground">
                        No match in this group
                      </p>
                    )}
                  </motion.div>
                );
              })}
          </div>

          {/* Global empty state */}
          {noResults && (
            <div className="py-24 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                No members match &quot;{search}&quot;.
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <MemberModal
        member={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
