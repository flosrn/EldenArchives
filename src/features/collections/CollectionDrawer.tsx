"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Minus,
  Plus,
  StarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCollectionStore } from "@/features/collections/collection.store";

type CollectionDrawerProps = {
  id: number;
  name: string;
  image: string;
  category: string;
  description?: string;
};

export const CollectionDrawer = ({
  id,
  name,
  image,
  category,
  description,
}: CollectionDrawerProps) => {
  const [collection, addToCollection] = useCollectionStore((state) => [
    state.collection,
    state.addToCollection,
  ]);

  const handleAddToCollection = () => {
    console.log("Add to collection clicked");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button onClick={handleAddToCollection} className="px-3 shadow-none">
          <StarIcon className="mr-2 size-4" />
          Add to Collection
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>My collection</DrawerTitle>
            <DrawerDescription>Add items to your collection</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
              >
                <ArrowLeftIcon className="size-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center">
                  <Image src={image} alt={name} width={200} height={200} />
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  {name}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
              >
                <ArrowRightIcon className="size-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 line-clamp-3 h-[120px] text-sm">
              {description}
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
