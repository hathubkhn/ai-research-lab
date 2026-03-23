/**
 * Computes lab stats from static data sources.
 * Call this in Server Components — zero network round-trip, no hydration mismatch.
 */
import { PUBLICATIONS } from "@/lib/publications-data";
import { PROJECTS } from "@/lib/research-data";
import { ALL_ACTIVE_MEMBERS, COLLABORATING_INSTITUTIONS } from "@/lib/members-data";

export interface LabStats {
  researchers: number;
  publications: number;
  activeProjects: number;
  collaborators: number;
}

export function computeStats(): LabStats {
  return {
    researchers: ALL_ACTIVE_MEMBERS.length,
    publications: PUBLICATIONS.length,
    activeProjects: PROJECTS.filter((p) => p.status === "Active").length,
    collaborators: COLLABORATING_INSTITUTIONS.length,
  };
}
