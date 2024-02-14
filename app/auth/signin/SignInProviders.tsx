"use client";

import { Divider } from "@/components/ui/divider";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MagicLinkForm } from "./MagicLinkForm";
import { ProviderButton } from "./ProviderButton";
import { SignInCredentialsAndMagicLinkForm } from "./SignInCredentialsAndMagicLinkForm";

export const SignInProviders = () => {
  const { data: providers, isPending } = useQuery({
    queryFn: () => fetch(`/api/auth/providers`).then((res) => res.json()),
    queryKey: ["providers"],
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-9" />
        <Divider>or</Divider>
        <Skeleton className="h-11" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {providers.resend && !providers.credentials ? (
        <>
          <Typography variant="small">Magic link ✨</Typography>
          <MagicLinkForm />
          <Divider>or</Divider>
        </>
      ) : null}

      {providers.credentials ? (
        <>
          <SignInCredentialsAndMagicLinkForm />
          <Divider>or</Divider>
        </>
      ) : null}

      <div className="flex flex-col gap-2">
        {/* ℹ️ Add provider you want to support here */}
        {providers.github ? <ProviderButton providerId="github" /> : null}
      </div>
      {providers.credentials ? (
        <Typography variant="small">
          You don't have an account?{" "}
          <Typography variant="link" as={Link} href="/auth/signup">
            Sign up
          </Typography>
        </Typography>
      ) : null}
    </div>
  );
};
