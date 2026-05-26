/**
 * Augmentación de tipos de Auth.js.
 *
 * Suma el flag `isAdmin` a la sesión y al token JWT — derivado del
 * allowlist `ADMIN_EMAILS` en los callbacks de `auth.config.ts`.
 */
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isAdmin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
  }
}
