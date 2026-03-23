import { z } from "zod";
import { MemberCategory } from "@prisma/client";

export const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  role: z.string().min(2, "Role is required").max(100),
  category: z.nativeEnum(MemberCategory),
  email: z.string().optional(),
  image: z.string().optional(),
  shortBio: z.string().max(300).optional(),
  fullBio: z.string().optional(),
  researchInterests: z.array(z.string()),
  scholarUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  personalUrl: z.string().optional(),
  isAlumni: z.boolean(),
  displayOrder: z.number().int(),
  joinedAt: z.string().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
