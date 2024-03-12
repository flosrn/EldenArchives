"use client";

import React from "react";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";

import { deleteRowsAction } from "./delete-rows.action";

export type DeleteRowsButtonProps = {
  tableName: string;
  ids: string[];
};

export const DeleteRowsButton = ({ tableName, ids }: DeleteRowsButtonProps) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => {
        enqueueDialog({
          title: `Delete this ${tableName}s`,
          description: `Are you sure you want to delete the selected ${tableName}s (${ids.length})?`,
          action: {
            label: "Delete",
            onClick: async () => {
              const { serverError } = await deleteRowsAction({
                tableName,
                ids,
              });
              if (serverError) {
                toast.error(serverError);
                return;
              }
              toast.success(`${ids.length} ${tableName}s deleted!`);
            },
          },
        });
      }}
      className="mr-4 h-8"
    >
      <TrashIcon className="mr-2 size-3.5 text-muted-foreground/70" />
      Delete
    </Button>
  );
};
