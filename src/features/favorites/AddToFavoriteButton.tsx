"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/features/favorites/favorites.store";
import { cn } from "@/lib/utils";

import type { Item } from "../../../app/items/item.types";

const toastOptions: {
  position: "bottom-right";
  className: string;
} = {
  position: "bottom-right",
  className: "right-12 max-w-[calc(100%-90px)] lg:max-w-full lg:right-16",
};

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
  const [favorites, addToFavorites] = useFavoritesStore((state) => [
    state.favorites,
    state.addToFavorites,
  ]);

  const handleAddToCollection = () => {
    const isAlreadyInFavorites = favorites.some(
      (favorite) => favorite.id === item.id
    );
    if (isAlreadyInFavorites) {
      toast.error("Item already in favorites", toastOptions);
      return;
    }

    addToFavorites({
      id: item.id,
      name: item.name,
      type: type,
      image: image,
      icon: item.icon,
      description: item.description,
      category: item.category,
    });
    toast.success("New item added to favorites", toastOptions);
  };

  const MotionButton = motion(Button);

  return (
    <MotionButton
      onClick={handleAddToCollection}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "shadow-none",
        {
          "p-2 size-8": size === "small",
          "p-3 h-12": size === "large",
        },
        className
      )}
    >
      <PlusCircle />
      {size === "large" && (
        <span className="hidden lg:ml-2 lg:block">Add to Favorites</span>
      )}
    </MotionButton>
  );
};
