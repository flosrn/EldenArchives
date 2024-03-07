"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Angry,
  EyeIcon,
  Frown,
  Meh,
  MoreHorizontal,
  PencilIcon,
  SmilePlus,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";
import { dateOptions } from "@/lib/format/date";

import { deleteFeedbackAction } from "./delete-feedback.action";
import type { FeedbackWithUser } from "./page";
import { UserDialog } from "./UserDialog";

export const columns: ColumnDef<FeedbackWithUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    accessorKey: "message",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User name" />;
    },
    accessorKey: "user",
    cell: ({ row }) => {
      const feedback = row.original;
      const username = feedback.user?.name || "Unknown";
      return <div>{username}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div>
          {new Date(createdAt).toLocaleDateString("fr-FR", dateOptions)}
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review" />
    ),
    accessorKey: "review",
    cell: ({ row }) => {
      const review = row.getValue("review") as number;
      return (
        <div>
          {review === 1 ? (
            <Angry />
          ) : review === 2 ? (
            <Frown />
          ) : review === 3 ? (
            <Meh />
          ) : review === 4 ? (
            <SmilePlus />
          ) : (
            "No review"
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const feedback = row.original;

      return (
        <div className="flex items-center space-x-2">
          <UserDialog {...feedback} />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <EyeIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-0">
                <Button
                  variant="ghost"
                  onClick={() => {
                    enqueueDialog({
                      title: "Delete this feedback",
                      description:
                        "Are you sure you want to delete this feedback?",
                      action: {
                        label: "Delete",
                        onClick: async () => {
                          await deleteFeedbackAction(feedback.id);
                          toast.success("Feedback deleted!");
                        },
                      },
                    });
                  }}
                  className="h-8 w-full justify-start px-0"
                >
                  <TrashIcon className="mr-2 size-3.5 text-muted-foreground/70" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
