import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revisá tu correo",
  robots: { index: false },
};

export default function VerifyRequestPage() {
  return (
    <main className="grid min-h-full place-items-center px-4 py-16">
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-bold tracking-tight">Revisá tu correo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Si tu email tiene acceso al panel, te enviamos un enlace para
          ingresar. Abrilo desde este mismo dispositivo — el enlace vence a los
          pocos minutos.
        </p>
      </div>
    </main>
  );
}
