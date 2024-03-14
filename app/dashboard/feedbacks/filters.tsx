"use client";

import { Angry, Frown, Meh, SmilePlus } from "lucide-react";

import type { Filter } from "@/components/ui/data-table";

export const filters: Filter[] = [
  {
    label: "Very Negative",
    value: "1",
    icon: Angry,
  },
  {
    label: "Negative",
    value: "2",
    icon: Frown,
  },
  {
    label: "Neutral",
    value: "3",
    icon: Meh,
  },
  {
    label: "Positive",
    value: "4",
    icon: SmilePlus,
  },
];