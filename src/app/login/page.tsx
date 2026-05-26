import type { Metadata } from "next";

import { requestMagicLink } from "@/core/auth/auth.actions";
import { Input } from "@/core/ui/input";
import { Label } from "@/core/ui/label";
import { SubmitButton } from "@/features/auth/submit-button";

export const metadata: Metadata = {
  title: "Ingresar",
  robots: { index: false },
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-full place-items-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight">
          Panel de la tienda
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ingresá con tu email — te enviamos un enlace de acceso.
        </p>

        <form action={requestMagicLink} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </div>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              No pudimos enviar el enlace. Probá de nuevo en un momento.
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
