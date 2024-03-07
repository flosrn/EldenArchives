"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Option } from "../../../../app/(dashboard-layout)/users/options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  column: string;
  options: Option[];
};

export function DataTableToolbar<TData>({
  table,
  column,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter users..."
          value={(table.getColumn(column)?.getFilterValue() as string) || ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("plan") && (
          <DataTableFacetedFilter
            column={table.getColumn("plan")}
            title="Plan"
            options={options}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
