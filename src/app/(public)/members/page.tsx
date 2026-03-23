"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Mail, Github, Linkedin, BookOpen, ExternalLink,
  Dna, LineChart, Layers, Crown, Users, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberModal } from "@/components/members/member-modal";
import { getInitials } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Member = {
  id: string;
  name: string;
  role: string;
  category: string;
  field?: string;
  isMentor?: boolean;
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
};

const director: Member = {
  id: "1",
  name: "Dr. Sarah Chen",
  role: "Lab Director & Principal Investigator",
  category: "PRINCIPAL_INVESTIGATOR",
  email: "s.chen@appliedai.lab",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  shortBio: "Founding director of AppliedAI-Lab. Her interdisciplinary vision connects AI with bioinformatics, time series analysis, and materials science. She oversees all three research fields and sets the lab's scientific direction.",
  fullBio: "Dr. Sarah Chen is the founding director of AppliedAI-Lab. She received her PhD from MIT in Computer Science with a focus on machine learning for scientific discovery. Before founding the lab, she was a research scientist at Google DeepMind and held a postdoctoral fellowship at Stanford. She serves on the program committees of NeurIPS, ICML, ICLR, and Nature Machine Intelligence.",
  researchInterests: ["AI for Science", "Generative Models", "Foundation Models", "Scientific Discovery"],
  scholarUrl: "https://scholar.google.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  personalUrl: "https://example.com",
  isAlumni: false,
};

const researchFields = [
  {
    id: "bioinformatics",
    name: "AI for Bioinformatics",
    shortName: "Bioinformatics",
    description: "Generative AI and deep learning for molecular discovery, drug design, and predictive biology — with emphasis on diffusion-based molecular generation and structure-based methods.",
    icon: Dna,
    color: "emerald",
    gradient: "from-emerald-600 to-teal-600",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeVariant: "green" as const,
    mentor: {
      id: "2",
      name: "Prof. James Rodriguez",
      role: "Bioinformatics Research Lead",
      category: "FACULTY",
      field: "bioinformatics",
      isMentor: true,
      email: "j.rodriguez@appliedai.lab",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      shortBio: "Leads the Bioinformatics group with expertise in generative molecular design, binding affinity prediction, and explainable AI for biology. 50+ publications including NeurIPS, ICML, and Nature Computational Science.",
      fullBio: "Prof. James Rodriguez leads the AI for Bioinformatics group at AppliedAI-Lab. His research focuses on diffusion-based generative models for de novo molecular design, scaffold-conditioned generation, and structure-based drug discovery. He has published over 50 papers at NeurIPS, ICML, ICLR, and Nature Computational Science.",
      researchInterests: ["Diffusion Models", "Molecular Generation", "Scaffold-Based Design", "Binding Affinity"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
    },
    members: [
      {
        id: "4",
        name: "Marcus Osei",
        role: "PhD Candidate (Year 3)",
        category: "PHD_STUDENT",
        field: "bioinformatics",
        email: "m.osei@appliedai.lab",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        shortBio: "Develops explainable AI models for protein–ligand binding affinity prediction and molecular property analysis.",
        fullBio: "Marcus Osei is a third-year PhD student in the Bioinformatics group. His research focuses on building interpretable deep learning models for binding affinity prediction, using attention-based attribution to explain substructure-level contributions to molecular activity.",
        researchInterests: ["Binding Affinity", "Explainable AI", "Protein–Ligand", "Graph Neural Networks"],
        scholarUrl: "https://scholar.google.com",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "7",
        name: "Lin Wei",
        role: "PhD Candidate (Year 1)",
        category: "PHD_STUDENT",
        field: "bioinformatics",
        email: "l.wei@appliedai.lab",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        shortBio: "Researching ligand-based virtual screening methods using generative models and contrastive molecular representations.",
        fullBio: "Lin Wei joined the Bioinformatics group in 2024 from Tsinghua University. His PhD focuses on ligand-based virtual screening using self-supervised molecular representations and contrastive learning for cross-target generalization.",
        researchInterests: ["Ligand-Based Screening", "Contrastive Learning", "Molecular Representations", "Generative AI"],
        scholarUrl: null,
        githubUrl: "https://github.com",
        linkedinUrl: null,
        personalUrl: null,
        isAlumni: false,
      },
    ],
  },
  {
    id: "timeseries",
    name: "AI for Time Series",
    shortName: "Time Series",
    description: "Foundation models, retrieval-augmented imputation, visual forecasting, online learning, and spatio-temporal analysis for real-world sequential data challenges.",
    icon: LineChart,
    color: "blue",
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeVariant: "blue" as const,
    mentor: {
      id: "3",
      name: "Dr. Aisha Patel",
      role: "Time Series Research Lead",
      category: "SENIOR_RESEARCHER",
      field: "timeseries",
      isMentor: true,
      email: "a.patel@appliedai.lab",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      shortBio: "Leads the Time Series group with expertise in foundation models for sequential data, multimodal analysis, and spatio-temporal learning. PhD from Berkeley, postdoc at the Alan Turing Institute.",
      fullBio: "Dr. Aisha Patel leads the AI for Time Series group. Her research spans pre-training foundation models for time series, retrieval-augmented generation for data imputation, and spatio-temporal analysis of geospatial sensor data. She received her PhD from Berkeley and was a postdoctoral researcher at the Alan Turing Institute.",
      researchInterests: ["Foundation Models", "Spatio-Temporal Learning", "RAG for Imputation", "Multimodal Time Series"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: null,
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
    },
    members: [
      {
        id: "5",
        name: "Yuki Tanaka",
        role: "PhD Candidate (Year 2)",
        category: "PHD_STUDENT",
        field: "timeseries",
        email: "y.tanaka@appliedai.lab",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
        shortBio: "Researches visual representation-based forecasting and the use of vision transformers for long-horizon time series prediction.",
        fullBio: "Yuki Tanaka joined the Time Series group in 2023 from the University of Tokyo. Her PhD investigates converting time series into structured image encodings to enable vision-language models to perform competitive long-horizon forecasting with interpretability.",
        researchInterests: ["Visual Forecasting", "Vision Transformers", "Long-Horizon Prediction", "Representation Learning"],
        scholarUrl: null,
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "8",
        name: "Diego Morales",
        role: "Master's Student",
        category: "MASTER_STUDENT",
        field: "timeseries",
        email: "d.morales@appliedai.lab",
        image: "https://randomuser.me/api/portraits/men/63.jpg",
        shortBio: "Working on retrieval-augmented generation approaches for missing value imputation in multivariate sensor time series.",
        fullBio: "Diego Morales is a master's student in the Time Series group. His thesis develops RAG-based imputation pipelines that retrieve semantically similar historical patterns from large corpora to guide missing-value recovery in irregular multivariate signals.",
        researchInterests: ["RAG", "Data Imputation", "Multivariate Sensors", "Missing Data"],
        scholarUrl: null,
        githubUrl: "https://github.com",
        linkedinUrl: null,
        personalUrl: null,
        isAlumni: false,
      },
    ],
  },
  {
    id: "materials",
    name: "AI for Materials",
    shortName: "Materials",
    description: "AI-driven material discovery and design for practical applications — thermal management in agriculture, stealth materials for defense, and functional materials for biosensors.",
    icon: Layers,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-700 dark:text-amber-400",
    badgeVariant: "amber" as const,
    mentor: {
      id: "9",
      name: "Dr. Priya Nair",
      role: "Materials Research Lead",
      category: "SENIOR_RESEARCHER",
      field: "materials",
      isMentor: true,
      email: "p.nair@appliedai.lab",
      image: "https://randomuser.me/api/portraits/women/57.jpg",
      shortBio: "Leads the Materials group. Expert in generative material design, physics-informed property prediction, and multi-objective optimization for functional materials. PhD from Oxford.",
      fullBio: "Dr. Priya Nair leads the AI for Materials group at AppliedAI-Lab. She received her PhD from Oxford and was a research fellow at the Max Planck Institute for Solid State Research. Her work on AI-guided material design spans thermal-control materials, spectrally selective surfaces, and biosensor platforms, and has been published at NeurIPS, ACS Nano, and Advanced Materials.",
      researchInterests: ["Generative Material Design", "Physics-Informed ML", "Thermal Materials", "Biosensors"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
    },
    members: [
      {
        id: "10",
        name: "Amara Diallo",
        role: "PhD Candidate (Year 2)",
        category: "PHD_STUDENT",
        field: "materials",
        email: "a.diallo@appliedai.lab",
        image: "https://randomuser.me/api/portraits/women/91.jpg",
        shortBio: "Developing AI-guided design workflows for spectrally selective coatings targeting camouflage and stealth applications.",
        fullBio: "Amara Diallo is a second-year PhD student in the Materials group supervised by Dr. Priya Nair. Her research focuses on multi-objective generative optimization of surface coatings that simultaneously suppress radar, near-infrared, and thermal-infrared signatures for defense applications.",
        researchInterests: ["Stealth Materials", "Spectral Selectivity", "Multi-Objective Optimization", "Generative Design"],
        scholarUrl: null,
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "11",
        name: "Tom Fischer",
        role: "Research Assistant",
        category: "RESEARCH_ASSISTANT",
        field: "materials",
        email: "t.fischer@appliedai.lab",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        shortBio: "Contributes to machine-learning pipelines for biocompatible sensing material screening, focusing on electrochemical property prediction.",
        fullBio: "Tom Fischer is a research assistant in the Materials group, developing and maintaining high-throughput computational screening pipelines for biosensor-grade materials. His work integrates physics-informed surrogate models with active learning to minimize experimental validation cycles.",
        researchInterests: ["Biosensors", "Electrochemistry", "Active Learning", "High-Throughput Screening"],
        scholarUrl: null,
        githubUrl: "https://github.com",
        linkedinUrl: null,
        personalUrl: null,
        isAlumni: false,
      },
    ],
  },
];

const alumni: Member[] = [
  {
    id: "6",
    name: "Dr. Kevin Williams",
    role: "Research Scientist @ AstraZeneca",
    category: "ALUMNI",
    email: null,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    shortBio: "Former PhD student (2020–2023) in the Bioinformatics group. Dissertation on diffusion-based scaffold generation won the Outstanding Thesis Award. Now at AstraZeneca AI.",
    fullBio: "Dr. Kevin Williams completed his PhD at AppliedAI-Lab in 2023 under the supervision of Prof. James Rodriguez. His dissertation introduced a novel scaffold-conditioned diffusion framework for fragment-based drug design. He is now a research scientist at AstraZeneca's AI drug discovery unit.",
    researchInterests: ["Scaffold Generation", "Diffusion Models", "Drug Discovery"],
    scholarUrl: "https://scholar.google.com",
    githubUrl: null,
    linkedinUrl: "https://linkedin.com",
    personalUrl: null,
    isAlumni: true,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SocialLinks({ member, size = "sm" }: { member: Member; size?: "sm" | "md" }) {
  const cls = size === "md"
    ? "flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    : "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
  const iconCls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
      {member.email && (
        <a href={`mailto:${member.email}`} className={cls} aria-label="Email">
          <Mail className={iconCls} />
        </a>
      )}
      {member.scholarUrl && (
        <a href={member.scholarUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Google Scholar">
          <BookOpen className={iconCls} />
        </a>
      )}
      {member.githubUrl && (
        <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label="GitHub">
          <Github className={iconCls} />
        </a>
      )}
      {member.linkedinUrl && (
        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label="LinkedIn">
          <Linkedin className={iconCls} />
        </a>
      )}
      {member.personalUrl && (
        <a href={member.personalUrl} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Website">
          <ExternalLink className={iconCls} />
        </a>
      )}
    </div>
  );
}

function DirectorCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-3xl"
    >
      <div
        className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 shadow-lg transition-all hover:border-blue-400 hover:shadow-xl dark:border-blue-800 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30"
        onClick={onClick}
      >
        {/* Background glow */}
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

        <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Avatar with crown */}
          <div className="relative shrink-0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
              <Crown className="h-3.5 w-3.5 text-white" />
            </div>
            <Avatar className="h-28 w-28 ring-4 ring-blue-200 ring-offset-4 ring-offset-white dark:ring-blue-700 dark:ring-offset-slate-900 shadow-xl">
              <AvatarImage src={member.image || undefined} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-lg">
              {member.shortBio}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {member.researchInterests.map((interest) => (
                <Badge key={interest} variant="blue" className="text-xs">{interest}</Badge>
              ))}
            </div>
            <div className="mt-4 flex justify-center sm:justify-start">
              <SocialLinks member={member} size="md" />
            </div>
          </div>
        </div>

        {/* Oversees badge */}
        <div className="relative mt-6 flex flex-wrap justify-center gap-2 border-t border-blue-100 pt-4 dark:border-blue-900">
          <span className="text-xs text-muted-foreground mr-1 self-center">Oversees:</span>
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

      {/* Connector to fields */}
      <div className="flex justify-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-px bg-gradient-to-b from-blue-400 to-transparent"
        />
      </div>
      <div className="relative mx-8 flex items-center justify-center">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700" />
        <ChevronDown className="relative -top-1 h-4 w-4 text-blue-400" />
      </div>
    </motion.div>
  );
}

function MentorCard({
  member,
  field,
  onClick,
}: {
  member: Member;
  field: (typeof researchFields)[0];
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`rounded-2xl border-2 ${field.border} ${field.lightBg} p-5 transition-all hover:shadow-lg`}>
        <div className="flex items-start gap-4">
          <Avatar className={`h-16 w-16 shrink-0 ring-2 ring-offset-2 ${field.lightBg} ring-${field.color}-300 dark:ring-${field.color}-700`}>
            <AvatarImage src={member.image || undefined} alt={member.name} />
            <AvatarFallback className={`bg-gradient-to-br ${field.gradient} text-lg font-bold text-white`}>
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${field.iconBg} ${field.iconColor}`}>
              Field Mentor
            </div>
            <h4 className="font-bold text-foreground leading-tight transition-colors group-hover:text-primary">
              {member.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {member.shortBio}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {member.researchInterests.slice(0, 3).map((i) => (
            <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0">{i}</Badge>
          ))}
        </div>
        <div className="mt-3 border-t border-current/10 pt-3">
          <SocialLinks member={member} />
        </div>
      </div>
    </motion.div>
  );
}

function MemberCard({
  member,
  delay = 0,
  onClick,
}: {
  member: Member;
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
        <Avatar className="h-16 w-16 ring-2 ring-border ring-offset-2 ring-offset-card transition-all group-hover:ring-primary mb-3">
          <AvatarImage src={member.image || undefined} alt={member.name} />
          <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-700 text-sm font-bold text-white">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <h4 className="font-semibold text-sm text-foreground leading-tight transition-colors group-hover:text-primary">
          {member.name}
        </h4>
        <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
        {member.researchInterests.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {member.researchInterests.slice(0, 2).map((i) => (
              <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">{i}</Badge>
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

function AlumniRow({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border bg-card px-5 py-3.5 transition-all hover:border-primary/30 hover:shadow-md"
      onClick={onClick}
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarImage src={member.image || undefined} alt={member.name} />
        <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-700 text-sm font-bold text-white">
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground group-hover:text-primary">{member.name}</p>
        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
      </div>
      <div className="hidden sm:flex flex-wrap gap-1">
        {member.researchInterests.slice(0, 2).map((i) => (
          <Badge key={i} variant="outline" className="text-xs">{i}</Badge>
        ))}
      </div>
      <div className="shrink-0">
        <SocialLinks member={member} />
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

  // Build all-members list for modal
  const allMembers: Member[] = [
    director,
    ...researchFields.flatMap((f) => [{ ...f.mentor, isMentor: true }, ...f.members]),
    ...alumni,
  ];

  const totalActive =
    researchFields.reduce((acc, f) => acc + 1 + f.members.length, 0) + 1; // +1 director

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
              One director, three research fields, and a team united by a passion for advancing AI.
            </p>
            {/* Team stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
              {[
                { label: "Active Members", value: totalActive },
                { label: "Research Fields", value: 3 },
                { label: "Field Mentors", value: 3 },
                { label: "Alumni", value: alumni.length },
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
                <Users className="h-3 w-3" /> All Fields
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

          {/* ── Lab Director ── */}
          {(activeField === "all") && matchesMember(director) && (
            <div className="mb-10">
              <DirectorCard member={director} onClick={() => setSelected(director)} />
            </div>
          )}

          {/* ── Research Fields ── */}
          <div className={`grid gap-8 ${activeField === "all" ? "lg:grid-cols-3" : "grid-cols-1 max-w-2xl mx-auto"}`}>
            {researchFields
              .filter((f) => activeField === "all" || activeField === f.id)
              .map((field, fi) => {
                const mentorVisible = matchesMember(field.mentor);
                const visibleMembers = field.members.filter(matchesMember);
                if (!mentorVisible && visibleMembers.length === 0 && search) return null;

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
                    <div className={`rounded-2xl bg-gradient-to-r ${field.gradient} p-5 text-white mb-4 shadow-md`}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                          <field.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{field.name}</h3>
                          <p className="text-xs text-white/75 mt-0.5">
                            1 mentor · {field.members.length} researcher{field.members.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-white/80 line-clamp-2">
                        {field.description}
                      </p>
                    </div>

                    {/* Mentor */}
                    {mentorVisible && (
                      <div className="mb-4">
                        <MentorCard
                          member={field.mentor}
                          field={field}
                          onClick={() => setSelected(field.mentor)}
                        />
                      </div>
                    )}

                    {/* Members grid */}
                    {visibleMembers.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {visibleMembers.map((m, i) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            delay={i * 0.08}
                            onClick={() => setSelected(m)}
                          />
                        ))}
                      </div>
                    )}

                    {/* Empty state when filtering */}
                    {search && !mentorVisible && visibleMembers.length === 0 && (
                      <p className="text-center text-xs text-muted-foreground py-4">
                        No match in this field
                      </p>
                    )}
                  </motion.div>
                );
              })}
          </div>

          {/* ── Alumni ── */}
          {(activeField === "all") && alumni.some(matchesMember) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className="mb-5 flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">Alumni</h2>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {alumni.filter(matchesMember).length}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {alumni.filter(matchesMember).map((m) => (
                  <AlumniRow key={m.id} member={m} onClick={() => setSelected(m)} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Global empty state */}
          {search &&
            !matchesMember(director) &&
            researchFields.every(
              (f) => !matchesMember(f.mentor) && f.members.every((m) => !matchesMember(m))
            ) &&
            alumni.every((m) => !matchesMember(m)) && (
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

      {/* Modal — resolve selected to full member object */}
      <MemberModal
        member={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
