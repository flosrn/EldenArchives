"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

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
