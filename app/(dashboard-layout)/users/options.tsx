"use client";

import { GemIcon } from "lucide-react";

import type { Option } from "@/components/ui/data-table";

export const options: Option[] = [
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
