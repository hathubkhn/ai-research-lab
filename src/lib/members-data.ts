/**
 * Single source of truth for lab member data.
 * Consumed by: /members page, /api/stats route, and any other page needing member info.
 */
import { Dna, LineChart, Layers, type LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MemberCategory =
  | "PRINCIPAL_INVESTIGATOR"
  | "SENIOR_RESEARCHER"
  | "PHD_STUDENT"
  | "MASTERS_STUDENT"
  | "RESEARCH_ASSISTANT";

export interface Member {
  id: string;
  name: string;
  role: string;
  category: MemberCategory;
  field?: string;
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
}

export interface ResearchField {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  lightBg: string;
  border: string;
  iconBg: string;
  iconColor: string;
  badgeVariant: "blue" | "green" | "amber" | "cyan" | "purple" | "rose";
  members: Member[];
}

// ─── Leadership ───────────────────────────────────────────────────────────────

export const director: Member = {
  id: "director",
  name: "Nguyen Nhat Hai",
  role: "PhD and Lecturer",
  category: "PRINCIPAL_INVESTIGATOR",
  email: null,
  image: null,
  shortBio:
    "Lab Director of AppliedAI-Lab. His research focuses on Generative AI and Large Language Model applications, bridging cutting-edge AI research with practical scientific discovery.",
  fullBio:
    "Nguyen Nhat Hai is the founding director of AppliedAI-Lab. He holds a PhD and serves as a lecturer, leading the lab's overall research vision across AI for Bioinformatics, Time Series, and Materials. His personal research centers on Generative AI and Large Language Model applications.",
  researchInterests: ["Generative AI", "Large Language Model Application"],
  scholarUrl: null,
  githubUrl: null,
  linkedinUrl: null,
  personalUrl: null,
  isAlumni: false,
};

export const researchLead: Member = {
  id: "lead",
  name: "Nguyen Thu",
  role: "AI Researcher & Nvidia Instructor",
  category: "SENIOR_RESEARCHER",
  email: null,
  image: null,
  shortBio:
    "Research Lead at AppliedAI-Lab and certified Nvidia Deep Learning Instructor. Specializes in Generative AI and Large Language Model applications, coordinating cross-team research initiatives.",
  fullBio:
    "Nguyen Thu is the Research Lead of AppliedAI-Lab and a certified Nvidia Instructor. She coordinates research across all three groups and drives projects in Generative AI and Large Language Model applications. Her instructional role bridges academic research and practical AI deployment.",
  researchInterests: ["Generative AI", "Large Language Model Application"],
  scholarUrl: "https://scholar.google.com/citations?hl=en&user=FtFck0UAAAAJ",
  githubUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/nguyen-thu-471414160/",
  personalUrl: null,
  isAlumni: false,
};

// ─── Research Fields & Members ────────────────────────────────────────────────

export const researchFields: ResearchField[] = [
  {
    id: "bioinformatics",
    name: "AI for Bioinformatics",
    shortName: "Bioinformatics",
    description:
      "Structural biology, computer-aided drug design, and generative AI applied to molecular discovery and predictive bioinformatics tasks.",
    icon: Dna,
    gradient: "from-emerald-600 to-teal-600",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeVariant: "green",
    members: [
      {
        id: "khanh",
        name: "Nguyen Tan Khanh",
        role: "Researcher, Dong A University & University of Zaragoza, Spain",
        category: "SENIOR_RESEARCHER",
        field: "bioinformatics",
        email: null,
        image: null,
        shortBio:
          "Researcher working at the intersection of structural biology and computer-aided drug design, with affiliations at Dong A University (Vietnam) and University of Zaragoza (Spain).",
        fullBio:
          "Nguyen Tan Khanh is a researcher jointly affiliated with Dong A University, Vietnam and the University of Zaragoza, Spain. His research focuses on structural biology and computer-aided drug design, combining computational modeling with AI-driven approaches to accelerate molecular discovery.",
        researchInterests: ["Structural Biology", "Computer-Aid Drug Design"],
        scholarUrl: null,
        githubUrl: null,
        linkedinUrl: "https://www.linkedin.com/in/khanhnt2501/",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "huyen",
        name: "Pham Thi Khanh Huyen",
        role: "Researcher, Dongguk University, Korea",
        category: "SENIOR_RESEARCHER",
        field: "bioinformatics",
        email: null,
        image: null,
        shortBio:
          "Researcher at Dongguk University, Korea, focusing on structural biology and computer-aided drug design for molecular target identification.",
        fullBio:
          "Pham Thi Khanh Huyen is a researcher at Dongguk University, Korea. Her work focuses on structural biology and computer-aided drug design, applying computational methods to understand protein–ligand interactions and support drug target discovery.",
        researchInterests: ["Structural Biology", "Computer-Aid Drug Design"],
        scholarUrl: null,
        githubUrl: null,
        linkedinUrl: null,
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "tu",
        name: "Luong Manh Tu",
        role: "AI Engineer, Vinsmart Future",
        category: "PHD_STUDENT",
        field: "bioinformatics",
        email: null,
        image: null,
        shortBio:
          "AI Engineer at Vinsmart Future with research interests spanning Computer Vision, Generative AI, and Computer-Aided Drug Design.",
        fullBio:
          "Luong Manh Tu works as an AI Engineer at Vinsmart Future. His research interests bridge Computer Vision, Generative AI, and Computer-Aided Drug Design, applying generative models to molecular design problems alongside his industry engineering work.",
        researchInterests: [
          "Computer Vision",
          "Generative AI",
          "Computer-Aid Drug Design",
        ],
        scholarUrl: null,
        githubUrl: null,
        linkedinUrl: "https://www.linkedin.com/in/tu-luong-manh-89763322a/",
        personalUrl: null,
        isAlumni: false,
      },
    ],
  },
  {
    id: "timeseries",
    name: "AI for Time Series",
    shortName: "Time Series",
    description:
      "Foundation models, large language models, and generative approaches for time series forecasting, spatio-temporal analysis, and sequential data understanding.",
    icon: LineChart,
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeVariant: "blue",
    members: [
      {
        id: "thong",
        name: "Truong Xuan Thong",
        role: "Computer Science Student",
        category: "PHD_STUDENT",
        field: "timeseries",
        email: null,
        image: null,
        shortBio:
          "Computer Science student researching Time Series analysis, Large Language Models, and Generative AI for sequential data tasks.",
        fullBio:
          "Truong Xuan Thong is a Computer Science student at AppliedAI-Lab with research interests in Time Series analysis, Large Language Models, and Generative AI. He is exploring how foundation models can be adapted for temporal pattern understanding and forecasting.",
        researchInterests: [
          "Time Series",
          "Large Language Models",
          "Generative AI",
        ],
        scholarUrl: null,
        githubUrl: null,
        linkedinUrl:
          "https://www.linkedin.com/in/th%C3%B4ng-tr%C6%B0%C6%A1ng-b343452a0/",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "binh",
        name: "Nguyen Khac Thai Binh",
        role: "Viettel R&D Researcher",
        category: "SENIOR_RESEARCHER",
        field: "timeseries",
        email: null,
        image: null,
        shortBio:
          "R&D Researcher at Viettel working on Time Series, Large Language Models, and Generative AI with applications in telecommunications and industrial systems.",
        fullBio:
          "Nguyen Khac Thai Binh is an R&D researcher at Viettel, one of Vietnam's leading technology companies. His research at AppliedAI-Lab focuses on Time Series modeling, Large Language Models, and Generative AI, with applications to industrial and telecommunications data.",
        researchInterests: [
          "Time Series",
          "Large Language Models",
          "Generative AI",
        ],
        scholarUrl: null,
        githubUrl: null,
        linkedinUrl:
          "https://www.linkedin.com/in/binh-nguyen-khac-thai-04a455331/",
        personalUrl: null,
        isAlumni: false,
      },
      {
        id: "kien",
        name: "Le Trung Kien",
        role: "Computer Science Student",
        category: "PHD_STUDENT",
        field: "timeseries",
        email: null,
        image: null,
        shortBio:
          "Computer Science student specializing in Spatio-Temporal Forecasting, Large Language Models, and Generative AI for complex real-world datasets.",
        fullBio:
          "Le Trung Kien is a Computer Science student at AppliedAI-Lab. His research focuses on Spatio-Temporal Forecasting, Large Language Models, and Generative AI, addressing challenges in complex structured datasets that combine spatial and temporal dimensions.",
        researchInterests: [
          "Spatio-Temporal Forecasting",
          "Large Language Models",
          "Generative AI",
        ],
        scholarUrl: null,
        githubUrl: null,
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
    description:
      "AI-driven material discovery and design for practical applications — thermal management, stealth materials for defense, and functional materials for biosensors.",
    icon: Layers,
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-700 dark:text-amber-400",
    badgeVariant: "amber",
    members: [
      {
        id: "huulam",
        name: "Huu Lam Phan",
        role: "Researcher, Gwangju Institute of Science and Technology (GIST)",
        category: "SENIOR_RESEARCHER",
        field: "materials",
        email: null,
        image: null,
        shortBio:
          "Researcher at GIST, Korea. Specialises in metasurfaces and metamaterials — including ultra-wideband microwave absorbers, polarization converters, and 3D-printed functional structures — with direct applications in stealth and electromagnetic camouflage.",
        fullBio:
          "Huu Lam Phan is a researcher at the Gwangju Institute of Science and Technology (GIST), Korea (verified email: gist.ac.kr). His research spans metasurfaces, metamaterials, 3D printing, image digital processing, and computational fluid dynamics (CFD). Key contributions include the design of ultra-wideband electromagnetic absorbers, multi-functional polarization-converting metasurfaces, water-based microwave absorbers, and millimeter-wave MIMO antenna systems using metasurfaces for 5G networks. His work on broadband absorbers and spectrally selective surfaces directly supports the lab's materials research directions in stealth and thermal management applications.",
        researchInterests: [
          "Metasurface",
          "Metamaterial",
          "3D Printing",
          "Electromagnetic Absorber",
        ],
        scholarUrl:
          "https://scholar.google.com/citations?user=ToAUhYYAAAAJ&hl=en",
        githubUrl: null,
        linkedinUrl: null,
        personalUrl: null,
        isAlumni: false,
      },
    ],
  },
];

// ─── Computed helpers (used by /api/stats) ────────────────────────────────────

/** All non-alumni members as a flat array */
export const ALL_ACTIVE_MEMBERS: Member[] = [
  director,
  researchLead,
  ...researchFields.flatMap((f) => f.members),
].filter((m) => !m.isAlumni);

/**
 * Unique external partner institutions.
 * Update this list whenever a member from a new institution joins.
 */
export const COLLABORATING_INSTITUTIONS = [
  "University of Zaragoza, Spain",
  "Dongguk University, Korea",
  "Vinsmart Future",
  "Viettel",
  "Gwangju Institute of Science and Technology (GIST), Korea",
] as const;
