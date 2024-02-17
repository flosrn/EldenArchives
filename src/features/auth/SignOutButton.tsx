"use client";

import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

export const SignOutButton = () => {
  const logout = useMutation({
    mutationFn: () => signOut(),
  });

  return (
    <Button
      size="sm"
      onClick={() => {
        logout.mutate();
      }}
    >
      {logout.isPending ? (
        <Loader className="mr-2 size-4" />
      ) : (
        <LogOut className="mr-2 size-4" />
      )}
      Logout
    </Button>
  );
};
