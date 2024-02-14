"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { displayName } from "@/lib/format/displayName";
import type { VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useIsClient } from "usehooks-ts";
import { UserDropdown } from "./UserDropdown";

const useHref = () => {
  const isClient = useIsClient();

  if (!isClient) {
    return "";
  }

  const href = window.location.href;

  return `${href}`;
};

export const SignInButton = (props: VariantProps<typeof buttonVariants>) => {
  const href = useHref();

  return (
    <Link
      className={buttonVariants({ size: "sm", variant: "outline", ...props })}
      href={`/auth/signin?callbackUrl=${href}`}
    >
      Sign in
    </Link>
  );
};

export const AuthButtonClient = () => {
  const session = useSession();

  if (session.data?.user) {
    const user = session.data.user;
    return <LoggedInButton user={user} />;
  }

  return <SignInButton />;
};

export const LoggedInButton = ({
  user,
}: {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}) => {
  return (
    <UserDropdown>
      <Button variant="outline" size="sm">
        <Avatar className="mr-2 size-6 bg-card">
          <AvatarFallback className="bg-card">
            {user.email.slice(0, 1).toUpperCase()}
          </AvatarFallback>
          {user.image && <AvatarImage src={user.image} />}
        </Avatar>
        <span className="max-lg:hidden">{displayName(user)}</span>
      </Button>
    </UserDropdown>
  );
};
