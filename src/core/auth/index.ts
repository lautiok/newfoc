/**
 * Módulo Auth — API pública.
 *
 * Fase 3 · M3.1 — autenticación del panel admin (Auth.js v5, magic
 * link por email). El proxy importa `auth.config` directamente, no
 * este barrel (que arrastra el adapter de Prisma).
 */
export { auth, signIn, signOut } from "./auth";
export { requestMagicLink, signOutAction } from "./auth.actions";
export { isAdminEmail } from "./admin-allowlist";
