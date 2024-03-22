"use client";

import "./globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import QueryProvider from "@/utils/react-query-config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
