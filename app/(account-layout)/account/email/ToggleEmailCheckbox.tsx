"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleSubscribedAction } from "./mail-account.action";

type ToggleEmailCheckboxProps = {
  unsubscribed: boolean;
}

export const ToggleEmailCheckbox = ({
  unsubscribed,
}: ToggleEmailCheckboxProps) => {
  const mutation = useMutation({
    mutationFn: async (unsubscribed: boolean) => {
      const { data, serverError } = await toggleSubscribedAction({
        unsubscribed,
      });

      if (!data) {
        toast.error(serverError);
        return;
      }

      toast.success("You've updated your email settings.");
    },
  });

  return (
    <div
      className={cn(
        "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
        {
          "bg-muted": mutation.isPending,
        }
      )}
    >
      <Checkbox
        id="unsubscribed-checkbox"
        defaultChecked={unsubscribed}
        disabled={mutation.isPending}
        onCheckedChange={(checked) => {
          const newChecked = Boolean(checked);

          mutation.mutate(newChecked);
        }}
      />
      <div className="space-y-1 leading-none">
        <Label htmlFor="unsubscribed-checkbox">Unsubscribed</Label>
        <Typography variant="muted">
          If enabled, you will not receive any marketing or promotional emails
          from us.
        </Typography>
      </div>
    </div>
  );
};
