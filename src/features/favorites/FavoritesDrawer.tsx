"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlusCircle, SaveIcon, StarIcon, XCircle } from "lucide-react";
import { toast } from "sonner";

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
import { useFavoritesStore } from "@/features/favorites/favorites.store";
import { cn } from "@/lib/utils";

type FavoritesDrawerProps = {};

export const FavoritesDrawer = (props: FavoritesDrawerProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, removeFromFavorites] = useFavoritesStore((state) => [
    state.favorites,
    state.removeFromFavorites,
  ]);

  useEffect(() => {
    if (!api) return;

    // Maybe throttle the scroll event if there is a performance issue
    // https://www.embla-carousel.com/api/events/#scroll
    api.on("scroll", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    setCurrentIndex(favorites.length - 1);
  }, [favorites]);

  const handleClickOnCard = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    api?.scrollTo(index);
    setCurrentIndex(index);
  };

  const handleDeleteItem = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    removeFromFavorites(favorites[currentIndex].id);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          onClick={() => toast.dismiss()}
          variant="outline"
          size="icon"
          className="fixed bottom-[22px] right-4 size-12 lg:bottom-9 lg:right-10"
        >
          <span className="absolute -top-2 right-0 rounded-full bg-primary px-2 text-[9px] text-primary-foreground">
            {favorites.length}
          </span>
          <StarIcon size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full flex-col items-center justify-center">
          <DrawerHeader className="flex max-w-sm flex-col items-center justify-center">
            <DrawerTitle>Favoris</DrawerTitle>
            <DrawerDescription className="text-center">
              Les favoris vous permettent de sauvegarder vos objets préférés.
              Cliquez sur le bouton sauvegarder pour les retrouver plus tard.
            </DrawerDescription>
          </DrawerHeader>
          <div
            data-vaul-no-drag
            className="flex flex-col items-center justify-center p-4 pb-0"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                dragFree: true,
                containScroll: false,
                startIndex: favorites.length > 0 ? favorites.length - 1 : 1,
              }}
              data-vaul-no-drag
              className="w-full max-w-lg"
            >
              <CarouselContent data-vaul-no-drag>
                {favorites.length > 0
                  ? favorites.map((item, index) => (
                      <CarouselItem
                        key={index}
                        data-vaul-no-drag
                        className="basis-1/2 lg:basis-1/3"
                      >
                        <div data-vaul-no-drag className="p-1">
                          <Card
                            data-vaul-no-drag
                            onClick={(
                              event: React.MouseEvent<HTMLDivElement>
                            ) => handleClickOnCard(event, index)}
                            className={cn("cursor-pointer")}
                          >
                            <CardContent
                              data-vaul-no-drag
                              className="relative flex aspect-square items-center justify-center p-6"
                            >
                              <motion.div
                                onClick={handleDeleteItem}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute -right-1 -top-1"
                              >
                                <XCircle size={16} className="" />
                              </motion.div>
                              <span className="absolute bottom-1 left-1 text-xs font-semibold">
                                {index + 1}
                              </span>
                              <Image
                                data-vaul-no-drag
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))
                  : Array.from({ length: 6 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        data-vaul-no-drag
                        className="basis-1/2 lg:basis-1/3"
                      >
                        <div data-vaul-no-drag className="p-1">
                          <Card
                            data-vaul-no-drag
                            onClick={(
                              event: React.MouseEvent<HTMLDivElement>
                            ) => handleClickOnCard(event, index)}
                            className={cn("cursor-pointer")}
                          >
                            <CardContent
                              data-vaul-no-drag
                              className="relative flex aspect-square items-center justify-center p-6"
                            ></CardContent>
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
            <div
              data-vaul-no-drag
              className="my-4 line-clamp-6 h-[120px] max-w-sm px-4 text-center text-sm"
            >
              {favorites.length > 0 ? (
                favorites[currentIndex]?.description
              ) : (
                <p>
                  Vous n'avez pas encore d'objets dans vos favoris. Cliquez sur
                  le bouton <PlusCircle size={16} className="inline" /> pour
                  ajouter un objet à vos favoris.
                </p>
              )}
            </div>
          </div>
          <DrawerFooter className="flex-row">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              onClick={() =>
                toast.warning("Feature currently in development, stay tuned!", {
                  position: "top-center",
                })
              }
              disabled={favorites.length === 0}
              className="ml-2"
            >
              <SaveIcon className="mr-2" size={16} />
              Save
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
