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
} from "lucide-react";

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
import { DeleteRowButton } from "@/features/table/DeleteRowButton";
import { dateOptions } from "@/lib/format/date";

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
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      return (
        <div title={message} className="max-w-[450px] truncate">
          {message}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User name" />;
    },
    accessorKey: "user",
    cell: ({ row }) => {
      const feedback = row.original;
      const email = feedback.user?.email || "Unknown";
      return <div className="max-w-[140px] truncate">{email}</div>;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    accessorKey: "createdAt",
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) as string;
      if (!rowValue || !filterValue) return false;

      const rowDate = new Date(rowValue).getTime();
      const filterDate = new Date(filterValue).getTime();
      return rowDate >= filterDate;
    },
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
    invertSorting: true,
    filterFn: (row, columnId, value) => row.getValue(columnId) == value,
    cell: ({ row }) => {
      const review = row.getValue("review");
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
                <DeleteRowButton tableName="feedback" ids={[feedback.id]} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
