"use client";

import { useAction } from "next-safe-action/hooks";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

import { LoadingButton } from "@/features/form/SubmitButton";

import { createVerifyEmailAction } from "./verify-email.action";

export const VerifyEmailButton = () => {
  const { status, execute } = useAction(createVerifyEmailAction, {
    onError: ({ serverError }) => {
      toast.error(serverError);
    },
    onSuccess: () => {
      toast.success("Email sent");
    },
  });
  return (
    <LoadingButton
      loading={status === "executing"}
      variant="invert"
      className="mt-2"
      onClick={() => execute("")}
    >
      {status === "hasErrored" ? <X size={16} className="mr-2" /> : null}
      {status === "hasSucceeded" ? <Check size={16} className="mr-2" /> : null}
      Verify Email
    </LoadingButton>
  );
};
