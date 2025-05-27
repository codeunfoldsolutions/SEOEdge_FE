import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/adapters/utils/auth-context";

export const metadata: Metadata = {
  title: "SEO Edge - SEO Analytics Dashboard",
  description: "Comprehensive SEO analytics and audit platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
