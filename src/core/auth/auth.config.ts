/**
 * Configuración base de Auth.js (M3.1).
 *
 * Este archivo es seguro de importar desde el `proxy` — NO incluye el
 * adapter de Prisma, ni providers, ni toca la base. `auth.ts` lo
 * completa con el adapter y el provider Resend.
 *
 * Importante: el provider Resend (tipo email) EXIGE un adapter. Si
 * estuviera acá, la instancia del proxy (sin adapter) fallaría con
 * `MissingAdapter`. Por eso los providers viven sólo en `auth.ts`.
 *
 * La sesión es JWT: el proxy valida la cookie sin DB.
 */
import type { NextAuthConfig } from "next-auth";

import { isAdminEmail } from "./admin-allowlist";

export const authConfig = {
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verificar",
    error: "/login",
  },
  // El proxy sólo lee la sesión — no necesita providers.
  providers: [],
  callbacks: {
    /** Sólo emails del allowlist pueden autenticarse. */
    signIn({ user }) {
      return isAdminEmail(user.email);
    },
    /** Lleva el flag de admin al token JWT. */
    jwt({ token, user }) {
      token.isAdmin = isAdminEmail(user?.email ?? token.email);
      return token;
    },
    /** Expone el flag de admin en la sesión. */
    session({ session, token }) {
      session.user.isAdmin = token.isAdmin === true;
      return session;
    },
    /** Lo usa el proxy para proteger `/admin/*`. */
    authorized({ auth }) {
      return auth?.user?.isAdmin === true;
    },
  },
} satisfies NextAuthConfig;
