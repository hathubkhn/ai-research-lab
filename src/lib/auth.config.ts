/**
 * Edge-safe NextAuth configuration.
 * This file must NOT import Prisma, bcrypt, or any Node.js-only modules
 * because it is consumed by src/middleware.ts which runs on the Edge Runtime.
 *
 * The full configuration (with PrismaAdapter, bcrypt, Credentials provider)
 * lives in src/lib/auth.ts and is used only in Node.js contexts.
 */
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isAdminRoot = pathname === "/admin";
      const isAdminPath = pathname.startsWith("/admin/") || isAdminRoot;
      const isLoginPage = pathname === "/admin/login";

      if (isLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }

      if (isAdminPath) {
        return isLoggedIn;
      }

      return true;
    },
  },
};
