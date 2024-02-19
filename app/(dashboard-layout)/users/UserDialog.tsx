import { type PropsWithChildren } from "react";
import type { User } from "@prisma/client";
import { EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type UserDialogProps = PropsWithChildren<User>;

export const UserDialog = ({ name, email }: UserDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <EyeIcon className="size-3.5 text-muted-foreground/70" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{email}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
