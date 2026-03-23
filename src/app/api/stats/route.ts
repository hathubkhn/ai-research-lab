import { NextResponse } from "next/server";
import { computeStats, type LabStats } from "@/lib/compute-stats";

export type { LabStats };

export async function GET(): Promise<NextResponse<LabStats>> {
  return NextResponse.json(computeStats(), {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
