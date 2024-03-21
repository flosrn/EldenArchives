"use client";

import type { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import { DialogRenderer } from "@/features/dialogs-provider/DialogProvider";
import { SiteConfig } from "@/site-config";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PlausibleProvider domain={SiteConfig.domain}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster richColors />
            <DialogRenderer />
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </PlausibleProvider>
    </ThemeProvider>
  );
};
