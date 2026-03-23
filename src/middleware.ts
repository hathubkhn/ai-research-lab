import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Middleware runs on Vercel Edge Runtime (1 MB limit).
 * We intentionally import only authConfig — which has zero Node.js-only
 * dependencies — so Prisma, bcrypt, and the PrismaAdapter are never
 * bundled into this file.
 *
 * Route protection logic lives in authConfig.callbacks.authorized.
 * The full NextAuth config (with PrismaAdapter) is in src/lib/auth.ts
 * and is only used in Node.js server contexts.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
