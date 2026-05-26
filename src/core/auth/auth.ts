/**
 * Instancia de Auth.js — configuración completa.
 *
 * Suma a `authConfig` el adapter de Prisma y el provider Resend
 * (magic link por email). El adapter persiste `User` y los
 * `VerificationToken`; las sesiones son JWT (no se usan filas de
 * `Session`).
 *
 * Server-side only — no importar desde componentes cliente ni desde
 * el proxy (usar `auth.config.ts` ahí).
 */
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

import { prisma } from "@/core/lib/db";

import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Resend({
      from: process.env.AUTH_EMAIL_FROM ?? "onboarding@resend.dev",
    }),
  ],
});
