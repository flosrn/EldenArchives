"use client";

import { GemIcon } from "lucide-react";

import type { Filter } from "@/components/ui/data-table";

export const filters: Filter[] = [
  {
    label: "Free",
    value: "FREE",
  },
  {
    label: "Pro",
    value: "PRO",
    icon: GemIcon,
  },
];
