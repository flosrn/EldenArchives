"use client";

import * as React from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/features/favorites/favorites.store";
import { cn } from "@/lib/utils";

import type { Item } from "../../../app/items/item.types";

export type AddToFavoriteButtonProps = {
  item: Item;
  type: string;
  image: string;
  size?: "small" | "large";
  className?: string;
};

export const AddToFavoriteButton = ({
  item,
  type,
  image,
  size = "small",
  className,
}: AddToFavoriteButtonProps) => {
  const [addToFavorites] = useFavoritesStore((state) => [state.addToFavorites]);

  const handleAddToCollection = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    addToFavorites({
      id: item.id,
      name: item.name,
      type: type,
      image: image,
      description: item.description,
      category: item.category,
    });
    toast.success("New item added to favorites", {
      position: "top-center",
    });
  };

  return (
    <Button
      onClick={handleAddToCollection}
      className={cn("px-3 shadow-none", className)}
    >
      <PlusCircle className="size-4" />
      {size === "large" && (
        <span className="hidden lg:ml-2 lg:block">Add to Favorites</span>
      )}
    </Button>
  );
};
