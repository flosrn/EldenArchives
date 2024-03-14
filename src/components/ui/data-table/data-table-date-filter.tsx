import type { Table } from "@tanstack/react-table";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DataTableDateFilterProps<TData> = {
  table: Table<TData>;
  date?: Date;
  setDate: (date: Date | undefined) => void;
  label: string;
};

export function DataTableDateFilter<TData>({
  table,
  date,
  setDate,
  label,
}: DataTableDateFilterProps<TData>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] justify-start h-8 text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? (
            new Date(date).toLocaleDateString("fr-FR")
          ) : (
            <span>{label}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            table.getColumn("createdAt")?.setFilterValue(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
