"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    console.log("Não está autenticado");
    redirect("/");
  }

  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
