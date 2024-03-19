"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { useCategoriesStore } from "@/features/items/items-categories.store";
import { cn } from "@/lib/utils";

import { ItemsLinksIcon } from "../../../app/items/items-links-icon";

export type ItemCategoryBadgeProps = {
  categories: { name: string; icon: number }[];
  type: string;
};

export const ItemCategoriesBadges = ({
  categories,
  type,
}: ItemCategoryBadgeProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");
  const [prevCategories, setCategories] = useCategoriesStore((state) => [
    state.categories,
    state.setCategories,
  ]);

  React.useEffect(() => {
    setCategories(categories);
  }, [type]);

  const handleClick = (category: string) => {
    router.push(`/items/?type=${type}&category=${category}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {prevCategories.length > 1 &&
        prevCategories.map((category) => (
          <React.Fragment key={category.icon}>
            {category.name && (
              <Badge
                onClick={() => handleClick(category.name)}
                className={cn("cursor-pointer space-x-1", {
                  "ring-2 ring-offset-2 ring-accent":
                    category.name === categoryParams,
                })}
              >
                <ItemsLinksIcon id={category.icon} category={type} size={18} />
                <span>{category.name}</span>
              </Badge>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};
