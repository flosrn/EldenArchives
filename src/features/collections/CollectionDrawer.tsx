"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
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
import { cn } from "@/lib/utils";

type CollectionDrawerProps = {
  id: number;
  name: string;
  image: string;
  type: string;
  category: string;
  description?: string;
};

export const CollectionDrawer = ({
  id,
  name,
  image,
  type,
  category,
  description,
}: CollectionDrawerProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collection, addToCollection] = useCollectionStore((state) => [
    state.collection,
    state.addToCollection,
  ]);

  useEffect(() => {
    if (!api) return;

    // TODO: throttle the scroll event
    api.on("scroll", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setCurrentIndex(collection.items.length - 1);
  }, [collection]);

  const handleAddToCollection = () => {
    addToCollection({
      id,
      name,
      image,
      type,
      category,
      description,
    });
  };

  const handleClickOnCard = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    api?.scrollTo(index);
    setCurrentIndex(index);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button onClick={handleAddToCollection} className="px-3 shadow-none">
          <StarIcon className="size-4 lg:mr-2" />
          <span className="hidden lg:block">Add to Favorites</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full flex-col items-center justify-center">
          <DrawerHeader className="flex max-w-sm flex-col items-center justify-center">
            <DrawerTitle>Favoris</DrawerTitle>
            <DrawerDescription className="text-center">
              Les favoris vous permettent de sauvegarder vos objets préférés
              dans une collection pour les retrouver plus tard.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center justify-center p-4 pb-0">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                dragFree: true,
                containScroll: false,
                startIndex: collection.items.length - 1,
              }}
              className="w-full max-w-lg"
            >
              <CarouselContent>
                {collection.items.map((item, index) => (
                  <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card
                        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                          handleClickOnCard(event, index)
                        }
                        className={cn("cursor-pointer")}
                      >
                        <CardContent className="relative flex aspect-square items-center justify-center p-6">
                          <span className="absolute left-1 top-1 text-xs font-semibold">
                            {index + 1}
                          </span>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                onClick={() => {
                  api?.scrollPrev();
                  setCurrentIndex(currentIndex - 1);
                }}
              />
              <CarouselNext
                onClick={() => {
                  api?.scrollNext();
                  setCurrentIndex(currentIndex + 1);
                }}
              />
            </Carousel>
            <div className="my-4 line-clamp-6 h-[120px] max-w-sm px-4 text-center text-sm">
              {collection.items[currentIndex]?.description}
            </div>
          </div>
          <DrawerFooter className="flex-row">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button>Create collection</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
