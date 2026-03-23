/**
 * Single source of truth for all research-related content.
 * Import from this file in every page/component that displays research topics,
 * projects, publications, or member field assignments.
 */

// ─── Research Topics ──────────────────────────────────────────────────────────

export type ResearchTopicId = "bioinformatics" | "timeseries" | "materials";

export interface ResearchTopic {
  id: ResearchTopicId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Extended description for the Research page */
  longDescription: string;
  subtopics: string[];
  /** Methodological highlights */
  methods: string[];
  icon: string; // lucide icon name
  color: {
    gradient: string;
    text: string;
    bg: string;
    border: string;
    iconBg: string;
    badgeVariant: "blue" | "cyan" | "green" | "amber" | "purple" | "rose";
  };
  stats: { papers: number; members: number };
  /**
   * Representative image for this topic.
   * Use a real URL or a descriptive placeholder path.
   * Replace with final assets before production.
   */
  image: {
    src: string;
    alt: string;
    /** True when the image is a placeholder and needs replacement */
    isPlaceholder: boolean;
    hint: string;
  };
}

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: "bioinformatics",
    name: "AI for Bioinformatics",
    shortName: "Bioinformatics",
    tagline: "Generative AI and deep learning for molecular discovery and predictive biology",
    description:
      "We apply state-of-the-art generative AI and deep learning to molecular-level bioinformatics problems, spanning ligand-based and structure-based drug discovery, scaffold-based molecular design, binding affinity prediction, and explainable models for biological insight.",
    longDescription:
      "Our Bioinformatics group sits at the frontier of AI-driven molecular science. We develop and apply machine learning methods — with a strong emphasis on diffusion models and generative AI — to accelerate molecular discovery, de novo drug design, and predictive modeling of biological systems. Research directions include ligand-based virtual screening, structure-based molecular docking, scaffold-based generative design, and binding affinity prediction. A central thread across all projects is explainability: we build models that not only predict but also illuminate the structural and chemical reasoning behind their outputs, supporting downstream validation and trust by domain scientists.",
    subtopics: [
      "Ligand-Based Virtual Screening",
      "Structure-Based Drug Discovery",
      "Scaffold-Based Molecular Design",
      "Binding Affinity Prediction",
      "Explainable AI for Biology",
      "Protein–Ligand Interaction Modeling",
    ],
    methods: ["Diffusion Models", "Generative AI", "Graph Neural Networks", "Transformer Architectures"],
    icon: "Dna",
    color: {
      gradient: "from-emerald-600 to-teal-600",
      text: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-100 dark:border-emerald-900/50",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      badgeVariant: "green",
    },
    stats: { papers: 42, members: 10 },
    image: {
      src: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80",
      alt: "AI-driven molecular structure visualization for drug discovery",
      isPlaceholder: false,
      hint: "Replace with a high-quality image of molecular structures, protein-ligand interaction, or generative molecular design visualization",
    },
  },
  {
    id: "timeseries",
    name: "AI for Time Series",
    shortName: "Time Series",
    tagline: "Foundation models, multimodal analysis, and spatio-temporal intelligence for sequential data",
    description:
      "We investigate fundamental and applied AI methods for time series and sequential data, developing foundation models, retrieval-augmented imputation systems, visual forecasting frameworks, and multimodal analytical pipelines that handle real-world temporal complexity.",
    longDescription:
      "Time series data is ubiquitous across science and industry, yet remains challenging due to noise, irregular sampling, and complex temporal dependencies. Our group addresses these challenges across the full research spectrum — from building general-purpose foundation models for time series to exploring practical downstream applications such as data imputation via retrieval-augmented generation (RAG), forecasting through visual representation, and online learning in streaming environments. We actively investigate multimodal time series analysis that fuses numerical signals with contextual information, as well as spatio-temporal modeling for geospatial and sensor-network data. Future research directions include text-based approaches to time series understanding, where language models are adapted to reason over sequential numerical patterns.",
    subtopics: [
      "Foundation Models for Time Series",
      "Retrieval-Augmented Generation for Imputation",
      "Visual Representation-Based Forecasting",
      "Online & Continual Learning",
      "Multimodal Time Series Analysis",
      "Spatio-Temporal Data Modeling",
      "Text-Based Time Series Reasoning (emerging)",
    ],
    methods: ["Transformer Architectures", "Retrieval-Augmented Generation", "Contrastive Learning", "State Space Models"],
    icon: "LineChart",
    color: {
      gradient: "from-blue-600 to-indigo-600",
      text: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-100 dark:border-blue-900/50",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      badgeVariant: "blue",
    },
    stats: { papers: 38, members: 12 },
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      alt: "Time series data visualization and forecasting dashboard",
      isPlaceholder: false,
      hint: "Replace with a visualization of time series forecasting, spatio-temporal heatmaps, or multimodal sequential data analysis",
    },
  },
  {
    id: "materials",
    name: "AI for Materials",
    shortName: "Materials",
    tagline: "AI-driven material design for thermal management, stealth systems, and biosensing",
    description:
      "We use AI and computational modeling to discover and design functional materials with targeted real-world properties, focusing on thermal-management materials for agricultural environments, stealth and camouflage materials for defense applications, and smart materials for next-generation biosensor platforms.",
    longDescription:
      "Material design is a combinatorially vast challenge that AI is uniquely positioned to accelerate. Our Materials group applies deep learning, graph-based property prediction, and generative models to guide the design of novel materials with precisely tuned functional properties. Current application focuses include: (1) thermally adaptive materials for reducing heat accumulation in greenhouse structures, directly supporting sustainable agriculture; (2) spectrally selective materials for camouflage and stealth applications in military vehicle systems, requiring precise control of electromagnetic response across optical and infrared ranges; and (3) biocompatible functional materials for biosensor platforms, where sensitivity, selectivity, and biocompatibility must be jointly optimized. Across all three directions, our approach combines physics-informed modeling with data-driven generative methods to navigate the materials design space efficiently.",
    subtopics: [
      "Thermal Management for Greenhouse Environments",
      "Stealth & Camouflage Materials for Defense",
      "Functional Materials for Biosensors",
      "Generative Material Design",
      "Physics-Informed Property Prediction",
      "Multi-Objective Material Optimization",
    ],
    methods: ["Graph Neural Networks", "Generative Models", "Physics-Informed Neural Networks", "Multi-Objective Optimization"],
    icon: "Layers",
    color: {
      gradient: "from-amber-500 to-orange-600",
      text: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-100 dark:border-amber-900/50",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      badgeVariant: "amber",
    },
    stats: { papers: 24, members: 8 },
    image: {
      src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
      alt: "Advanced material microstructure visualization for AI-driven design",
      isPlaceholder: false,
      hint: "Replace with images of material microstructures, thermal-management surfaces, camouflage materials, or biosensor chip photographs",
    },
  },
];

// ─── Helper lookups ────────────────────────────────────────────────────────────

export const TOPIC_BY_ID = Object.fromEntries(
  RESEARCH_TOPICS.map((t) => [t.id, t])
) as Record<ResearchTopicId, ResearchTopic>;

// ─── Featured Projects ────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  topicId: ResearchTopicId;
  status: "Active" | "Ongoing" | "Archived";
  githubUrl?: string;
  projectUrl?: string;
  year: number;
}

export const PROJECTS: Project[] = [
  // Bioinformatics
  {
    id: "moldiff",
    title: "MolDiff",
    description:
      "A diffusion-based generative framework for de novo molecular design, enabling scaffold-aware generation of drug-like molecules with controllable structural and pharmacological properties.",
    tags: ["Diffusion Models", "Molecular Generation", "Drug Design"],
    topicId: "bioinformatics",
    status: "Active",
    year: 2024,
  },
  {
    id: "bindnet",
    title: "BindNet",
    description:
      "A structure-informed deep learning model for protein–ligand binding affinity prediction, combining 3D geometric features with sequence-level representations for cross-target generalization.",
    tags: ["Binding Affinity", "GNN", "Structure-Based"],
    topicId: "bioinformatics",
    status: "Active",
    year: 2024,
  },
  {
    id: "explainmol",
    title: "ExplainMol",
    description:
      "An explainable AI toolkit for molecular property prediction, providing sub-structure attribution maps and counterfactual explanations to support medicinal chemistry decision-making.",
    tags: ["Explainable AI", "Molecular Properties", "Interpretability"],
    topicId: "bioinformatics",
    status: "Ongoing",
    year: 2023,
  },
  // Time Series
  {
    id: "tsformer",
    title: "TSFounder",
    description:
      "A general-purpose foundation model pre-trained on large-scale heterogeneous time series corpora, achieving strong zero-shot and few-shot performance across forecasting, classification, and anomaly detection.",
    tags: ["Foundation Models", "Forecasting", "Transfer Learning"],
    topicId: "timeseries",
    status: "Active",
    year: 2024,
  },
  {
    id: "ragimpute",
    title: "RAG-Impute",
    description:
      "A retrieval-augmented generation approach for time series imputation that retrieves semantically similar historical patterns to guide missing value recovery in irregular multivariate signals.",
    tags: ["RAG", "Imputation", "Multivariate"],
    topicId: "timeseries",
    status: "Active",
    year: 2024,
  },
  {
    id: "visforecast",
    title: "VisForecast",
    description:
      "A visual representation framework that converts time series into structured image encodings, enabling vision transformers to perform competitive long-horizon forecasting with strong interpretability.",
    tags: ["Visual Forecasting", "Vision Transformer", "Long-Horizon"],
    topicId: "timeseries",
    status: "Ongoing",
    year: 2023,
  },
  // Materials
  {
    id: "thermoshield",
    title: "ThermoShield",
    description:
      "AI-guided design of thermally adaptive composite materials for passive cooling of agricultural greenhouses, reducing peak internal temperature without active energy consumption.",
    tags: ["Thermal Management", "Sustainable Agriculture", "Material Design"],
    topicId: "materials",
    status: "Active",
    year: 2024,
  },
  {
    id: "stealthmat",
    title: "StealthMat",
    description:
      "Generative models for spectrally selective surface coatings providing broadband camouflage across visible, near-infrared, and thermal infrared spectra for defense vehicle applications.",
    tags: ["Stealth Materials", "Spectral Control", "Defense Applications"],
    topicId: "materials",
    status: "Ongoing",
    year: 2023,
  },
  {
    id: "biosenseai",
    title: "BioSense-AI",
    description:
      "A machine learning pipeline for the accelerated design of biocompatible sensing materials, jointly optimizing electrochemical sensitivity, analyte selectivity, and in-vitro biocompatibility.",
    tags: ["Biosensors", "Biocompatibility", "Electrochemistry"],
    topicId: "materials",
    status: "Active",
    year: 2024,
  },
];

// ─── Publications / Highlights ────────────────────────────────────────────────

export interface Publication {
  id: string;
  type: "paper" | "award" | "grant";
  badge: string;
  badgeVariant: "blue" | "amber" | "green" | "cyan" | "purple" | "rose";
  title: string;
  authors: string;
  description: string;
  topicId?: ResearchTopicId;
  year: number;
  url?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub1",
    type: "paper",
    badge: "NeurIPS 2024",
    badgeVariant: "blue",
    title: "Scaffold-Conditioned Diffusion for Target-Aware Molecular Generation",
    authors: "Chen, S., Nair, P., Osei, M., et al.",
    description:
      "A diffusion model conditioned on 3D protein pocket geometry and scaffold constraints, achieving state-of-the-art drug-likeness and binding affinity scores on benchmark datasets.",
    topicId: "bioinformatics",
    year: 2024,
  },
  {
    id: "pub2",
    type: "paper",
    badge: "ICLR 2025",
    badgeVariant: "blue",
    title: "TSFounder: Pre-Training Foundation Models for Universal Time Series Analysis",
    authors: "Rodriguez, J., Wei, L., Tanaka, Y., et al.",
    description:
      "Introduces a large-scale pre-training recipe for time series foundation models, demonstrating strong zero-shot generalization across 12 diverse benchmark suites.",
    topicId: "timeseries",
    year: 2025,
  },
  {
    id: "pub3",
    type: "award",
    badge: "Best Paper — ICML 2024",
    badgeVariant: "amber",
    title: "Visual Forecasting: Image-Based Representations Unlock Long-Horizon Time Series Prediction",
    authors: "AppliedAI-Lab",
    description:
      "Received Best Paper recognition for demonstrating that converting time series into structured visual encodings enables vision-language models to achieve competitive forecasting performance.",
    topicId: "timeseries",
    year: 2024,
  },
  {
    id: "pub4",
    type: "grant",
    badge: "Research Grant",
    badgeVariant: "green",
    title: "AI-Driven Discovery of Multifunctional Materials for Sustainable and Defense Applications",
    authors: "PI: Dr. Sarah Chen",
    description:
      "Multi-year grant to develop generative AI workflows for accelerating the design and experimental validation of thermal-control and spectrally selective materials.",
    topicId: "materials",
    year: 2024,
  },
];

// ─── Blog preview data ────────────────────────────────────────────────────────

export interface BlogPreview {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tag: string;
  tagVariant: "blue" | "cyan" | "green" | "amber" | "purple" | "rose";
  image: string;
  topicId?: ResearchTopicId;
}

export const BLOG_PREVIEWS: BlogPreview[] = [
  {
    slug: "diffusion-models-molecular-design",
    title: "Diffusion Models for De Novo Molecular Design: Where We Are and Where We're Going",
    excerpt:
      "We review recent progress in applying score-based and DDPM-style diffusion models to molecular generation, and outline the open challenges in conditional, scaffold-aware, and target-specific generation.",
    author: "Dr. Sarah Chen",
    date: "March 10, 2025",
    readTime: 9,
    tag: "Bioinformatics",
    tagVariant: "green",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&q=80",
    topicId: "bioinformatics",
  },
  {
    slug: "foundation-models-time-series",
    title: "Building Foundation Models for Time Series: Lessons from NLP and What's Different",
    excerpt:
      "What can time series researchers learn from the success of large language models, and what makes sequential numerical data fundamentally different from text? We discuss our experiences building TSFounder.",
    author: "Prof. James Rodriguez",
    date: "February 20, 2025",
    readTime: 11,
    tag: "Time Series",
    tagVariant: "blue",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    topicId: "timeseries",
  },
  {
    slug: "ai-material-design-greenhouse",
    title: "Cooling Greenhouses with AI-Designed Materials: From Simulation to Prototype",
    excerpt:
      "How our ThermoShield project uses generative models and physics-informed optimization to identify novel composite materials that passively reduce greenhouse heat load by up to 18°C.",
    author: "Dr. Priya Nair",
    date: "January 28, 2025",
    readTime: 7,
    tag: "Materials",
    tagVariant: "amber",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    topicId: "materials",
  },
];

// ─── Lab-wide stats ────────────────────────────────────────────────────────────
// These are now computed server-side by /api/stats and fetched by lab-stats.tsx.
// This export is kept for backwards compatibility but is no longer consumed by
// any component; real numbers come from members-data.ts + publications-data.ts.
export const LAB_STATS: never[] = [];

// ─── Lab identity ──────────────────────────────────────────────────────────────

export const LAB_IDENTITY = {
  name: "AppliedAI-Lab",
  tagline: "Advancing AI for Science and Society",
  missionShort:
    "We apply state-of-the-art artificial intelligence to high-impact scientific domains — from molecular biology and time series analysis to materials design — producing rigorous research and open tools that accelerate discovery.",
  missionLong:
    "AppliedAI-Lab is a research group dedicated to bridging the gap between cutting-edge machine learning and real-world scientific challenges. Our interdisciplinary team combines deep expertise in generative models, representation learning, and domain science to advance three interconnected research areas: AI for Bioinformatics, AI for Time Series, and AI for Materials. We publish at top AI venues, release open-source software, and collaborate closely with domain experts in biology, chemistry, engineering, and environmental science.",
  keywords: [
    "AI research", "bioinformatics", "molecular design", "drug discovery",
    "time series", "foundation models", "materials science", "generative AI",
    "deep learning", "applied AI",
  ],
};
