"use server";

/**
 * Server Actions de autenticación.
 *
 * `requestMagicLink` no revela qué emails tienen acceso: si el email
 * no está en el allowlist no se envía nada, pero el usuario termina
 * en la misma página de "revisá tu correo".
 */
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { isAdminEmail } from "./admin-allowlist";
import { signIn, signOut } from "./auth";

export async function requestMagicLink(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  // Email no habilitado: misma respuesta, sin enviar el link.
  if (!email || !isAdminEmail(email)) {
    redirect("/login/verificar");
  }

  try {
    await signIn("resend", { email, redirectTo: "/admin" });
  } catch (error) {
    // AuthError = falló el envío. El resto (NEXT_REDIRECT) se re-lanza.
    if (error instanceof AuthError) {
      redirect("/login?error=envio");
    }
    throw error;
  }
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}
