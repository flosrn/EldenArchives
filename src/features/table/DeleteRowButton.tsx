"use client";

import React from "react";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";

import { deleteRowsAction } from "./delete-rows.action";

export type DeleteRowButtonProps = {
  tableName: string;
  ids: string[];
};

export const DeleteRowButton = ({ tableName, ids }: DeleteRowButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        enqueueDialog({
          title: `Delete this ${tableName}`,
          description: `Are you sure you want to delete this ${tableName}?`,
          action: {
            label: "Delete",
            onClick: async () => {
              await deleteRowsAction({
                tableName,
                ids,
              });
              toast.success(`${tableName} deleted!`);
            },
          },
        });
      }}
      className="h-8 w-full justify-start px-0"
    >
      <TrashIcon className="mr-2 size-3.5 text-muted-foreground/70" />
      Delete
    </Button>
  );
};
