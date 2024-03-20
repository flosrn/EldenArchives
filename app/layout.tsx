import type { ReactNode } from "react";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { NextTopLoader } from "@/features/page/NextTopLoader";
import { getServerUrl } from "@/lib/server-url";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import type { LayoutParams } from "@/types/next";

import { Providers } from "./providers";

import "./code-theme.scss";
import "./globals.scss";

const image = `${SiteConfig.prodUrl}/og.png`;

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  keywords: [
    "Midjourney",
    "AI",
    "Artificial Intelligence",
    "Image",
    "Image Processing",
    "Image Generation",
  ],
  authors: [
    {
      name: "flosrn",
      url: "https://github.com/flosrn",
    },
  ],
  creator: "flosrn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SiteConfig.prodUrl,
    title: SiteConfig.title,
    description: SiteConfig.description,
    siteName: SiteConfig.title,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [image],
    creator: "@flosrn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  metadataBase: new URL(getServerUrl()),
};

export default function RootLayout({
  children,
  modal,
}: LayoutParams<{}> & { modal?: ReactNode }) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          <PlausibleProvider domain={SiteConfig.domain} />
        </head>
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            GeistMono.variable,
            GeistSans.variable
          )}
        >
          <Providers>
            <NextTopLoader
              delay={100}
              showSpinner={false}
              color="hsl(var(--primary))"
            />
            {children}
            {modal}
            <TailwindIndicator />
            {/*<FloatingLegalFooter />*/}
          </Providers>
        </body>
      </html>
    </>
  );
}
