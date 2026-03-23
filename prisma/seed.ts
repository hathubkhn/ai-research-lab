import { PrismaClient, MemberCategory, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ──────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@appliedai.lab" },
    update: {},
    create: {
      email: "admin@appliedai.lab",
      name: "Admin User",
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log("✅ Admin user created:", adminUser.email);

  // ─── Tags ─────────────────────────────────────────────────────────────────────
  const tagData = [
    { name: "Bioinformatics", slug: "bioinformatics", color: "#10B981" },
    { name: "Time Series", slug: "time-series", color: "#3B82F6" },
    { name: "Materials", slug: "materials", color: "#F59E0B" },
    { name: "Diffusion Models", slug: "diffusion-models", color: "#6366F1" },
    { name: "Generative AI", slug: "generative-ai", color: "#06B6D4" },
    { name: "Foundation Models", slug: "foundation-models", color: "#0EA5E9" },
    { name: "Drug Discovery", slug: "drug-discovery", color: "#10B981" },
    { name: "Open Source", slug: "open-source", color: "#64748B" },
    { name: "Research", slug: "research", color: "#3B82F6" },
  ];

  const tags: Record<string, string> = {};
  for (const tag of tagData) {
    const created = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
    tags[tag.slug] = created.id;
  }

  console.log("✅ Tags created:", Object.keys(tags).length);

  // ─── Blog Posts ───────────────────────────────────────────────────────────────
  const posts = [
    {
      title: "Diffusion Models for De Novo Molecular Design: Where We Are and Where We're Going",
      slug: "diffusion-models-molecular-design",
      excerpt: "We review recent progress in applying score-based and DDPM-style diffusion models to molecular generation, and outline the open challenges in conditional, scaffold-aware, and target-specific generation.",
      content: `<h2>Introduction</h2><p>Diffusion models have reshaped generative AI across images, audio, and video. The same principles are now transforming molecular design — enabling AI systems to generate novel drug-like molecules with controllable structural and pharmacological properties.</p><h2>Ligand-Based and Structure-Based Approaches</h2><p>Early generative work on molecules relied primarily on ligand-based representations — encoding molecules as SMILES strings or molecular graphs and training variational autoencoders or flow-based models to generate similar structures. While effective, these approaches ignore the 3D geometry of the target protein binding site.</p><p>Structure-based methods address this directly by conditioning generation on the 3D pocket geometry of the target. Our MolDiff framework extends this idea by jointly modeling scaffold constraints and pocket geometry inside a single diffusion denoising process.</p><h2>Scaffold-Conditioned Diffusion</h2><p>Scaffold-based drug design preserves a core substructure (the scaffold) while generating diverse R-groups. MolDiff incorporates scaffold conditioning as a masked diffusion objective: scaffold atoms are fixed, while peripheral atoms are iteratively denoised over the course of the reverse diffusion process.</p><h2>Explainability Matters</h2><p>Generative models are only useful in practice if medicinal chemists can understand and trust their outputs. Our ExplainMol toolkit provides substructure attribution maps that highlight which atoms and bonds contribute most to predicted binding affinity, directly linking model predictions to interpretable chemistry.</p><h2>Open Challenges</h2><p>Multi-target generation, synthesizability constraints, and ADMET-aware generation remain unsolved. We outline our roadmap for addressing each in upcoming work.</p>`,
      coverImage: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&q=80",
      published: true,
      featured: true,
      readTime: 9,
      seoTitle: "Diffusion Models for Molecular Design | AppliedAI-Lab",
      seoDescription: "A review of diffusion-based generative AI for molecular design, covering ligand-based, structure-based, and scaffold-conditioned approaches.",
      publishedAt: new Date("2025-03-10"),
      tags: ["bioinformatics", "diffusion-models", "drug-discovery"],
    },
    {
      title: "Building Foundation Models for Time Series: Lessons from NLP and What's Different",
      slug: "foundation-models-time-series",
      excerpt: "What can time series researchers learn from the success of large language models, and what makes sequential numerical data fundamentally different from text? We discuss our experiences building TSFounder.",
      content: `<h2>Why Foundation Models for Time Series?</h2><p>The success of large language models in NLP has inspired a compelling question: can we build analogous general-purpose pre-trained models for time series data? The appeal is obvious — a single model that can forecast, classify, detect anomalies, and impute missing values across diverse domains, with minimal task-specific fine-tuning.</p><h2>What We Borrowed from NLP</h2><p>TSFounder borrows the masked pre-training paradigm from BERT: we randomly mask time windows and train the model to reconstruct them from surrounding context. We also borrow the patching idea from PatchTST, treating contiguous temporal segments as "tokens" to reduce sequence length while preserving local temporal structure.</p><h2>What Makes Time Series Harder</h2><p>Unlike text, time series data is continuous, multi-scale, and domain-heterogeneous. A model pre-trained on ECG signals and financial price data must somehow develop shared representations that generalize to weather forecasting and industrial sensor data. We address this through domain-adaptive normalization layers and curriculum training across heterogeneous corpora.</p><h2>Visual Forecasting: An Unexpected Finding</h2><p>One surprising result from our lab: converting time series into structured image encodings — essentially plot images with consistent formatting — allows vision transformers to perform competitive long-horizon forecasting. Our VisForecast system explores this direction systematically.</p><h2>What's Next: Text-Based Time Series</h2><p>An emerging direction we are actively exploring is text-based time series understanding: can language models reason directly over numerical sequences described in text, or over time series paired with textual metadata? Early experiments suggest substantial untapped potential.</p>`,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      published: true,
      featured: false,
      readTime: 11,
      seoTitle: "Foundation Models for Time Series | AppliedAI-Lab",
      seoDescription: "Lessons from building TSFounder, a general-purpose foundation model for time series analysis, and how it differs from NLP pre-training.",
      publishedAt: new Date("2025-02-20"),
      tags: ["time-series", "foundation-models", "research"],
    },
    {
      title: "Cooling Greenhouses with AI-Designed Materials: From Simulation to Prototype",
      slug: "ai-material-design-greenhouse",
      excerpt: "How our ThermoShield project uses generative models and physics-informed optimization to identify novel composite materials that passively reduce greenhouse heat load by up to 18°C.",
      content: `<h2>The Problem: Heat Stress in Controlled Agriculture</h2><p>Modern greenhouse agriculture depends on precise climate control — but in high-irradiance regions, cooling costs can account for up to 40% of operational energy expenditure. Passive thermal management through selectively reflective or thermochromic covering materials could dramatically reduce this burden.</p><h2>The AI Approach</h2><p>Our ThermoShield project treats material design as a constrained generative optimization problem. We first build a physics-informed surrogate model that maps material composition and microstructure parameters to optical and thermal properties. This surrogate is trained on a combination of first-principles simulations and experimental measurements.</p><h2>Generative Search</h2><p>With a fast surrogate in hand, we run a multi-objective generative search that jointly optimizes solar reflectance in the UV-VIS range, transmission in the photosynthetically active radiation (PAR) band, and thermal emissivity. Candidate compositions are ranked and a diverse subset is selected for experimental synthesis and testing.</p><h2>Prototype Results</h2><p>Our first prototype composite — a multilayer polymer film with embedded scattering particles — achieved a measured 14°C reduction in peak internal air temperature in a small-scale greenhouse trial compared to standard polyethylene film, without reducing PAR transmission.</p><h2>Next Steps</h2><p>We are scaling up synthesis to full greenhouse panels and initiating a field trial with an agricultural partner. Simultaneously, we are extending the surrogate model to cover bio-degradable material candidates.</p>`,
      coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
      published: true,
      featured: false,
      readTime: 7,
      seoTitle: "AI-Designed Greenhouse Cooling Materials | AppliedAI-Lab",
      seoDescription: "How ThermoShield uses AI and physics-informed optimization to design passive cooling materials for agricultural greenhouses.",
      publishedAt: new Date("2025-01-28"),
      tags: ["materials", "generative-ai", "research"],
    },
    {
      title: "RAG for Time Series Imputation: Retrieval-Augmented Missing Value Recovery",
      slug: "rag-time-series-imputation",
      excerpt: "We introduce RAG-Impute, a retrieval-augmented approach to missing value imputation in multivariate time series that leverages a large corpus of historical patterns to guide reconstruction.",
      content: `<h2>Why Imputation Matters</h2><p>Real-world time series data is invariably incomplete — sensor failures, communication gaps, and irregular sampling leave missing values that corrupt downstream tasks. Standard imputation methods (mean fill, linear interpolation, MICE) work adequately for low missingness rates but struggle when entire channels or long windows are absent.</p><h2>The RAG-Impute Framework</h2><p>Inspired by retrieval-augmented generation in NLP, RAG-Impute maintains an indexed corpus of clean historical time series segments. When presented with a masked input, it retrieves the k most semantically similar complete segments and uses them as soft conditioning signals for a learned imputation network.</p><h2>What "Similar" Means for Time Series</h2><p>Defining semantic similarity for numerical sequences requires care. We use a contrastive encoder pre-trained with augmentation-based self-supervision to embed time series patches into a shared representation space where temporal shape similarity is preserved across scale and offset transformations.</p><h2>Results</h2><p>On the ETT, Weather, and MIMIC-III benchmarks, RAG-Impute improves MAE by 12–28% over the strongest baseline under high missingness (>40%) scenarios. The retrieval component is most beneficial for structured, recurring patterns — seasonal data, periodic industrial signals, and clinical vital signs.</p>`,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      published: true,
      featured: false,
      readTime: 8,
      seoTitle: "RAG for Time Series Imputation | AppliedAI-Lab",
      seoDescription: "How retrieval-augmented generation can be adapted to recover missing values in multivariate time series data.",
      publishedAt: new Date("2025-01-10"),
      tags: ["time-series", "research"],
    },
    {
      title: "Designing Materials for Biosensors with AI: An Emerging Frontier",
      slug: "ai-biosensor-materials",
      excerpt: "AI is opening new routes to biocompatible sensing materials by jointly optimizing electrochemical sensitivity, analyte selectivity, and in-vitro biocompatibility — challenges previously addressed sequentially.",
      content: `<h2>The Biosensor Material Design Challenge</h2><p>Effective biosensor platforms require materials with a subtle combination of properties: high electrochemical sensitivity to the target analyte, selectivity against interferents, mechanical compatibility with biological tissue, and acceptable cytotoxicity profiles. Optimizing these properties simultaneously using conventional experimental approaches is slow and expensive.</p><h2>Our Approach</h2><p>The BioSense-AI project builds a multi-fidelity simulation and experimental database for candidate sensing materials — encompassing nanoporous carbon derivatives, conductive polymers, and composite metal-organic frameworks — and trains surrogate models for each property objective.</p><h2>Active Learning Loop</h2><p>Rather than exhaustively screening all candidates, we close the loop with an active learning scheduler that proposes the next batch of experimental measurements to maximally improve the Pareto front in the multi-objective property space. This has reduced the number of experiments required to identify a top-performing candidate by approximately 60% compared to random screening.</p><h2>Current Results and Outlook</h2><p>We have identified three candidate material classes that achieve simultaneously strong sensitivity, selectivity, and biocompatibility in silico. Experimental synthesis and in-vitro validation is ongoing. We expect to publish first results from wet-lab validation in late 2025.</p>`,
      coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
      published: false,
      featured: false,
      readTime: 8,
      seoTitle: "AI for Biosensor Material Design | AppliedAI-Lab",
      seoDescription: "How AI-driven multi-objective optimization is accelerating the discovery of biocompatible sensing materials.",
      publishedAt: null,
      tags: ["materials", "research"],
    },
  ];

  for (const post of posts) {
    const created = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
        featured: post.featured,
        readTime: post.readTime,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        publishedAt: post.publishedAt,
        authorId: adminUser.id,
      },
    });

    for (const tagSlug of post.tags) {
      const tagId = tags[tagSlug];
      if (tagId) {
        await prisma.postTag.upsert({
          where: { postId_tagId: { postId: created.id, tagId } },
          update: {},
          create: { postId: created.id, tagId },
        });
      }
    }
  }

  console.log("✅ Blog posts created:", posts.length);

  // ─── Members ──────────────────────────────────────────────────────────────────
  const members = [
    {
      name: "Dr. Sarah Chen",
      slug: "dr-sarah-chen",
      role: "Principal Investigator & Lab Director",
      category: MemberCategory.PRINCIPAL_INVESTIGATOR,
      email: "s.chen@appliedai.lab",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      shortBio: "Sarah leads the lab's research agenda, overseeing three interdisciplinary groups focused on AI for bioinformatics, time series, and materials science.",
      fullBio: "Dr. Sarah Chen is the founding director of AppliedAI-Lab. She received her PhD from MIT in Computer Science with a focus on machine learning for scientific discovery. Before founding the lab, she was a research scientist at Google DeepMind and held a postdoctoral fellowship at Stanford.",
      researchInterests: ["AI for Science", "Generative Models", "Foundation Models", "Scientific Discovery"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: "https://example.com",
      isAlumni: false,
      displayOrder: 1,
    },
    {
      name: "Prof. James Rodriguez",
      slug: "prof-james-rodriguez",
      role: "Bioinformatics Research Lead",
      category: MemberCategory.FACULTY,
      email: "j.rodriguez@appliedai.lab",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      shortBio: "James heads the Bioinformatics group with expertise in diffusion-based molecular generation, binding affinity prediction, and structure-based drug discovery.",
      fullBio: "Prof. James Rodriguez leads the AI for Bioinformatics group at AppliedAI-Lab. His research focuses on generative models for de novo molecular design — specifically scaffold-conditioned diffusion, ligand-based virtual screening, and protein–ligand binding affinity prediction. He has published over 50 papers at NeurIPS, ICML, ICLR, and Nature Computational Science.",
      researchInterests: ["Diffusion Models", "Molecular Generation", "Drug Discovery", "Binding Affinity"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
      displayOrder: 2,
    },
    {
      name: "Dr. Aisha Patel",
      slug: "dr-aisha-patel",
      role: "Time Series Research Lead",
      category: MemberCategory.SENIOR_RESEARCHER,
      email: "a.patel@appliedai.lab",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      shortBio: "Aisha leads the Time Series group with expertise in foundation models for sequential data, retrieval-augmented imputation, and spatio-temporal learning.",
      fullBio: "Dr. Aisha Patel leads the AI for Time Series group at AppliedAI-Lab. She received her PhD from Berkeley and was a postdoctoral researcher at the Alan Turing Institute. Her research spans pre-training foundation models for diverse time series corpora, RAG-based imputation, visual forecasting, and spatio-temporal analysis.",
      researchInterests: ["Foundation Models", "RAG Imputation", "Spatio-Temporal Learning", "Multimodal Time Series"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: null,
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
      displayOrder: 3,
    },
    {
      name: "Marcus Osei",
      slug: "marcus-osei",
      role: "PhD Candidate (Year 3) — Bioinformatics",
      category: MemberCategory.PHD_STUDENT,
      email: "m.osei@appliedai.lab",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      shortBio: "Marcus develops explainable AI models for protein–ligand binding affinity prediction and molecular property analysis.",
      fullBio: "Marcus Osei is a third-year PhD student in the Bioinformatics group supervised by Prof. James Rodriguez. His research focuses on building interpretable deep learning models for binding affinity prediction with substructure attribution maps.",
      researchInterests: ["Binding Affinity", "Explainable AI", "Protein–Ligand", "Graph Neural Networks"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
      displayOrder: 4,
    },
    {
      name: "Yuki Tanaka",
      slug: "yuki-tanaka",
      role: "PhD Candidate (Year 2) — Time Series",
      category: MemberCategory.PHD_STUDENT,
      email: "y.tanaka@appliedai.lab",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      shortBio: "Yuki researches visual representation-based forecasting and the use of vision transformers for long-horizon time series prediction.",
      fullBio: "Yuki Tanaka joined the Time Series group in 2023 from the University of Tokyo. Her PhD investigates converting time series into structured image encodings to enable vision transformers to perform competitive long-horizon forecasting with interpretability.",
      researchInterests: ["Visual Forecasting", "Vision Transformers", "Long-Horizon Prediction", "Representation Learning"],
      scholarUrl: null,
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: false,
      displayOrder: 5,
    },
    {
      name: "Dr. Kevin Williams",
      slug: "dr-kevin-williams",
      role: "Research Scientist @ AstraZeneca (Alumni)",
      category: MemberCategory.ALUMNI,
      email: null,
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      shortBio: "Former PhD student (2020–2023) in the Bioinformatics group. Dissertation on scaffold-conditioned diffusion won the Outstanding Thesis Award. Now at AstraZeneca AI.",
      fullBio: "Dr. Kevin Williams completed his PhD at AppliedAI-Lab in 2023 under the supervision of Prof. James Rodriguez. His dissertation introduced a novel scaffold-conditioned diffusion framework for fragment-based drug design. He is now a research scientist at AstraZeneca's AI drug discovery unit.",
      researchInterests: ["Scaffold Generation", "Diffusion Models", "Drug Discovery"],
      scholarUrl: "https://scholar.google.com",
      githubUrl: null,
      linkedinUrl: "https://linkedin.com",
      personalUrl: null,
      isAlumni: true,
      displayOrder: 6,
    },
  ];

  for (const member of members) {
    await prisma.member.upsert({
      where: { slug: member.slug },
      update: {},
      create: member,
    });
  }

  console.log("✅ Members created:", members.length);

  // ─── Site Settings ────────────────────────────────────────────────────────────
  const settings = [
    { key: "lab_name", value: "AppliedAI-Lab", label: "Lab Name", group: "general" },
    { key: "tagline", value: "Advancing AI for Science and Society", label: "Tagline", group: "general" },
    { key: "description", value: "A research group applying state-of-the-art AI to high-impact scientific domains — bioinformatics, time series analysis, and materials design.", label: "Description", group: "general" },
    { key: "email", value: "thu.nguyenthi6@hust.edu.vn", label: "Contact Email", group: "contact" },
    { key: "phone", value: "+84 (0) 24 3868 2410", label: "Phone", group: "contact" },
    { key: "address", value: "School of Information and Communication Technology, Hanoi University of Science and Technology, 1 Dai Co Viet, Hai Ba Trung, Hanoi, Vietnam", label: "Address", group: "contact" },
    { key: "hero_title", value: "AI for Bioinformatics, Time Series, and Materials", label: "Hero Title", group: "homepage" },
    { key: "hero_subtext", value: "We apply state-of-the-art AI to high-impact scientific domains — advancing molecular discovery, sequential data analysis, and functional material design.", label: "Hero Subtext", group: "homepage" },
    { key: "github_url", value: "https://github.com", label: "GitHub URL", group: "social" },
    { key: "twitter_url", value: "https://twitter.com", label: "Twitter URL", group: "social" },
    { key: "linkedin_url", value: "https://linkedin.com", label: "LinkedIn URL", group: "social" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("✅ Site settings created:", settings.length);
  console.log("\n🎉 Seeding complete!");
  console.log("\nDemo credentials:");
  console.log("  Email: admin@appliedai.lab");
  console.log("  Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
