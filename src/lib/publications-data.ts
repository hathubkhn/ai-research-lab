/**
 * Lab publication list — single source of truth.
 * Add new papers here; all pages (homepage highlight + /publications) consume this file.
 *
 * githubUrl: set to the repo URL once code is released; leave null otherwise.
 * pdfUrl   : link to author preprint / open-access version if available.
 */

export type PublicationType = "journal" | "conference" | "preprint";
export type PublicationTopicId =
  | "bioinformatics"
  | "timeseries"
  | "materials"
  | "llm"
  | "vision"
  | "other";

export interface Publication {
  id: string;
  title: string;
  /** Full author string exactly as it appears in the paper */
  authors: string;
  /** Journal or conference name */
  venue: string;
  /** Short venue label shown on badges (e.g. "JBSD 2025") */
  venueShort: string;
  year: number;
  type: PublicationType;
  citations?: number;
  abstract?: string;
  topicId: PublicationTopicId;
  /** Google Scholar citation page */
  scholarUrl?: string;
  /** Code repository — fill in when available */
  githubUrl?: string | null;
  /** Open-access PDF or author preprint */
  pdfUrl?: string | null;
  /** Highlight on the homepage */
  featured: boolean;
}

export const PUBLICATIONS: Publication[] = [
  // ── AI for Bioinformatics ─────────────────────────────────────────────────
  {
    id: "parp1-diffusion-2025",
    title:
      "Integrating diffusion models and molecular modeling for PARP1 inhibitors generation",
    authors:
      "Tan Khanh Nguyen*, Thi-Thu Nguyen*, Khanh Huyen Thi Pham, Manh-Tu Luong, Nhat-Hai Nguyen",
    venue: "Journal of Biomolecular Structure and Dynamics",
    venueShort: "JBSD 2025",
    year: 2025,
    type: "journal",
    citations: 2,
    abstract:
      "We present a pipeline that integrates score-based diffusion models with physics-based molecular docking to generate and rank novel PARP1 inhibitors. The approach combines 3D-aware generative sampling with protein–ligand binding affinity estimation, yielding candidates with improved predicted potency and drug-likeness compared to baseline generative methods.",
    topicId: "bioinformatics",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:YsMSGLbcyi4C",
    githubUrl: null,
    pdfUrl: null,
    featured: true,
  },
  {
    id: "frail-rl-2026",
    title:
      "FRAIL: Fragment-based reinforcement learning for molecular design and benchmarking on fatty acid amide hydrolase 1 (FAAH-1)",
    authors:
      "Manh-Tu Luong, Khanh Huyen Thi Pham, Nhat-Hai Nguyen, Van-Tuan Le, Phu Nguyen, Thi-Thu Nguyen",
    venue: "Molecular Diversity",
    venueShort: "Mol. Diversity 2026",
    year: 2026,
    type: "journal",
    citations: 0,
    abstract:
      "FRAIL introduces a fragment-based reinforcement learning framework for goal-directed molecular design. The agent assembles molecules from a curated fragment library guided by a multi-objective reward combining predicted binding affinity for FAAH-1, synthetic accessibility, and drug-likeness. Benchmarks show competitive performance against diffusion-based baselines while maintaining interpretable design trajectories.",
    topicId: "bioinformatics",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:WF5omc3nYNoC",
    githubUrl: null,
    pdfUrl: null,
    featured: false,
  },

  // ── AI for Time Series ────────────────────────────────────────────────────
  {
    id: "vardiff-2026",
    title:
      "VARDiff: Vision-augmented retrieval-guided diffusion for stock forecasting",
    authors:
      "Thi-Thu Nguyen*, Xuan-Thong Truong*, Khac-Thai-Binh Nguyen, Nhat-Hai Nguyen",
    venue: "Information Sciences",
    venueShort: "Inf. Sci. 2026",
    year: 2026,
    type: "journal",
    citations: 0,
    abstract:
      "VARDiff combines visual candlestick representations, retrieval-augmented conditioning, and a diffusion-based generative backbone to produce probabilistic stock price forecasts. By grounding generation on retrieved historical patterns with similar visual structure and market context, the model achieves strong calibration and competitive directional accuracy on multiple benchmark indices.",
    topicId: "timeseries",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:ufrVoPGSRksC",
    githubUrl: null,
    pdfUrl: null,
    featured: true,
  },
  {
    id: "dasf-net-2025",
    title:
      "DASF-Net: A multimodal framework for stock price forecasting with diffusion-based graph learning and optimized sentiment fusion",
    authors: "Thi-Thu Nguyen, Nhat-Hai Nguyen, Quoc-Tuan Ngo",
    venue: "Journal of Risk and Financial Management",
    venueShort: "JRFM 2025",
    year: 2025,
    type: "journal",
    citations: 7,
    abstract:
      "DASF-Net fuses heterogeneous signals — price time series, inter-stock correlation graphs, and news sentiment — through a diffusion-based graph neural network and an optimized sentiment fusion module. The architecture achieves state-of-the-art results on multi-step stock price forecasting benchmarks, demonstrating that structured multimodal fusion substantially outperforms unimodal baselines.",
    topicId: "timeseries",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:W7OEmFMy1HYC",
    githubUrl: null,
    pdfUrl: null,
    featured: true,
  },
  {
    id: "stock-transfer-2019",
    title:
      "A novel approach to short-term stock price movement prediction using transfer learning",
    authors: "Thi-Thu Nguyen, Sungzoon Yoon",
    venue: "Applied Sciences",
    venueShort: "Appl. Sci. 2019",
    year: 2019,
    type: "journal",
    citations: 97,
    abstract:
      "We apply transfer learning from a large-scale financial corpus to adapt pretrained representations for short-term stock price movement prediction. The framework significantly outperforms task-specific baselines trained from scratch, demonstrating that domain-adapted feature representations substantially improve sample efficiency and generalization in financial forecasting.",
    topicId: "timeseries",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:u5HHmVD_uO8C",
    githubUrl: null,
    pdfUrl: null,
    featured: true,
  },

  // ── LLM / Generative AI ───────────────────────────────────────────────────
  {
    id: "vifin-gen-2024",
    title:
      "ViFin-Gen: Efficient Vietnamese instruction dataset generation pipeline for the finance domain",
    authors: "Thi-Thu Nguyen, Nhat-Hai Nguyen, Minh-Sang Cao",
    venue:
      "2024 International Conference on Advanced Technologies for Communications (ATC)",
    venueShort: "ATC 2024",
    year: 2024,
    type: "conference",
    citations: 0,
    abstract:
      "ViFin-Gen introduces an automated pipeline for generating high-quality Vietnamese instruction-tuning datasets in the finance domain. By combining LLM-based paraphrasing with domain-specific filtering, the pipeline produces diverse question–answer pairs that improve instruction-following performance of Vietnamese financial LLMs with significantly less manual annotation effort.",
    topicId: "llm",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:9yKSN-GCB0IC",
    githubUrl: null,
    pdfUrl: null,
    featured: false,
  },
  {
    id: "tokenizer-finance-2024",
    title:
      "Impact of tokenizer in pretrained language models for the finance domain",
    authors: "Thi-Thu Nguyen, Nhat-Hai Nguyen, Minh-Sang Cao",
    venue: "Fundamental and Applied IT Research",
    venueShort: "FAIR 2024",
    year: 2024,
    type: "conference",
    citations: 0,
    abstract:
      "We conduct a systematic study of how tokenizer design choices — vocabulary size, subword algorithm, and domain-specific training data — affect the downstream performance of pretrained language models on finance-domain tasks. Results show that finance-adapted tokenizers reduce out-of-vocabulary rates by up to 43% and improve named entity recognition and sentiment classification benchmarks.",
    topicId: "llm",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:d1gkVwhDpl0C",
    githubUrl: null,
    pdfUrl: null,
    featured: false,
  },

  // ── Computer Vision ───────────────────────────────────────────────────────
  {
    id: "yolov8-ibc-2024",
    title: "Inverted bottleneck convolution module for YOLOv8",
    authors: "Van-Tuan Hoang, Thi-Thu Nguyen, Kwangnam Jo",
    venue: "IEEE 33rd International Symposium on Industrial Electronics (ISIE)",
    venueShort: "IEEE ISIE 2024",
    year: 2024,
    type: "conference",
    citations: 2,
    abstract:
      "We propose an inverted bottleneck convolution (IBC) module as a drop-in replacement for the standard C2f block in YOLOv8. The module improves multi-scale feature aggregation by reversing the expansion–contraction ordering, yielding consistent mAP improvements on COCO and VisDrone benchmarks with negligible parameter overhead.",
    topicId: "vision",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:u-x6o8ySG0sC",
    githubUrl: null,
    pdfUrl: null,
    featured: false,
  },

  // ── Other ─────────────────────────────────────────────────────────────────
  {
    id: "mcs-deadline-2019",
    title:
      "Deadline sensitive task assignment in mobile crowd sensing: A greedy approach",
    authors: "Sinthia Akter, Nguyen Thi Thu, Sungzoon Yoon",
    venue:
      "2019 International Conference on Information and Communication Technology Convergence (ICTC)",
    venueShort: "ICTC 2019",
    year: 2019,
    type: "conference",
    citations: 6,
    abstract:
      "We address deadline-constrained task assignment in mobile crowd sensing platforms, where tasks must be completed before individual expiry times. A greedy assignment strategy that jointly considers worker reliability, spatial proximity, and deadline urgency is proposed, outperforming baseline approaches in task completion rate and quality on simulated and real-world traces.",
    topicId: "other",
    scholarUrl:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=FtFck0UAAAAJ&citation_for_view=FtFck0UAAAAJ:IjCSPb-OGe4C",
    githubUrl: null,
    pdfUrl: null,
    featured: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const TOPIC_LABELS: Record<PublicationTopicId, string> = {
  bioinformatics: "AI for Bioinformatics",
  timeseries: "AI for Time Series",
  materials: "AI for Materials",
  llm: "LLM & Generative AI",
  vision: "Computer Vision",
  other: "Other",
};

export const TOPIC_COLORS: Record<
  PublicationTopicId,
  { bg: string; text: string; border: string }
> = {
  bioinformatics: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  timeseries: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  materials: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
  llm: {
    bg: "bg-violet-50 dark:bg-violet-950/30",
    text: "text-violet-700 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
  },
  vision: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  other: {
    bg: "bg-slate-100 dark:bg-slate-800/40",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
  },
};

export const FEATURED_PUBLICATIONS = PUBLICATIONS.filter((p) => p.featured);

export const TOTAL_CITATIONS = PUBLICATIONS.reduce(
  (sum, p) => sum + (p.citations ?? 0),
  0
);
