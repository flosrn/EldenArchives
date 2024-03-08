import React from "react";
import type { SafeAction } from "next-safe-action";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";

type DataTablePaginationProps<TData> = {
  title: string;
  table: Table<TData>;
  isRowsSelected: boolean;
  onDelete: SafeAction<z.ZodArray<z.ZodString, "many">, void>;
};

export function DataTablePagination<TData>({
  title,
  table,
  isRowsSelected,
  onDelete,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {isRowsSelected && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            enqueueDialog({
              title: `Delete this ${title.toLowerCase()}`,
              description: `Are you sure you want to delete the selected ${title.toLowerCase()} (${table.getFilteredSelectedRowModel().rows.length})?`,
              action: {
                label: "Delete",
                onClick: async () => {
                  await onDelete(
                    table
                      .getFilteredSelectedRowModel()
                      // @ts-expect-error: trust me
                      .rows.map((row) => row.original.id)
                  );
                  toast.success(
                    `${table.getFilteredSelectedRowModel().rows.length} ${title} deleted!`
                  );
                },
              },
            });
          }}
          className="mr-4 h-8"
        >
          <TrashIcon className="mr-2 size-3.5 text-muted-foreground/70" />
          Delete
        </Button>
      )}
      <div className="flex-1 text-sm text-muted-foreground">
        {isRowsSelected
          ? `${table.getFilteredSelectedRowModel().rows.length}
        of ${table.getFilteredRowModel().rows.length} row(s) selected.`
          : `${table.getRowCount()} row(s) found.`}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
