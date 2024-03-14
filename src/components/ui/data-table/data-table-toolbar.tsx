"use client";

import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableDateFilter } from "@/components/ui/data-table/data-table-date-filter";
import { Input } from "@/components/ui/input";

import { type Option, type Search } from "./";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  search?: Search;
  options?: Option;
};

export function DataTableToolbar<TData>({
  table,
  search,
  options,
}: DataTableToolbarProps<TData>) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const isFiltered = table.getState().columnFilters.length > 0;
  const { hasDateFilter } = options || {};

  return (
    <div className="flex items-center justify-between">
      {search && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={`Filter ${search.type}...`}
            value={
              (table.getColumn(search.column)?.getFilterValue() as string) || ""
            }
            onChange={(event) =>
              table.getColumn(search.column)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {hasDateFilter && (
            <>
              <DataTableDateFilter
                table={table}
                date={startDate}
                setDate={setStartDate}
                label="Start date"
              />
              <DataTableDateFilter
                table={table}
                date={endDate}
                setDate={setEndDate}
                label="End date"
              />
            </>
          )}
          {options?.column && table.getColumn(options.column) && (
            <DataTableFacetedFilter
              column={table.getColumn(options.column)}
              title={options.name}
              options={options.filters}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                table.resetColumnFilters();
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 size-4" />
            </Button>
          )}
        </div>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
