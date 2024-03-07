"use client";

import { GemIcon, type LucideIcon } from "lucide-react";

export type Option = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

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
