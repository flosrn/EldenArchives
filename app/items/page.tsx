import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AddToFavoriteButton } from "@/features/favorites/AddToFavoriteButton";
import { ItemCategoriesBadges } from "@/features/items/ItemCategoriesBadges";
import {
  getCategories,
  getItemsWithTranslations,
  loadTranslations,
} from "@/features/items/translations-manager";
import { BreadcrumbNavWithQueryParams } from "@/features/navigation/BreadcrumbNavWithQueryParams";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import type { PageParams } from "@/types/next";

import type { Item } from "./item.types";
import { ItemsSearch } from "./ItemsSearch";

const fetchItems = async (
  type: string,
  category: string
): Promise<{ items: Item[]; categories: { name: string; icon: number }[] }> => {
  const response = await fetch(
    `https://api.erdb.wiki/v1/latest/${type}/${
      category ? `?query=category%3A${category}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const items = await response.json();

  const categories = getCategories(items);
  const { titles, descriptions } = await loadTranslations(type);

  const itemsWithTranslation = getItemsWithTranslations({
    items,
    type,
    titles,
    descriptions,
  });

  return { items: itemsWithTranslation, categories };
};

export default async function RoutePage({
  searchParams: { type, category, search },
}: PageParams<{}>) {
  const { items, categories } = await fetchItems(
    type as string,
    category as string
  );

  if (search) {
    Object.keys(items).forEach((key) => {
      const item = items[key as keyof typeof items] as Item;
      if (
        !item.name.toLowerCase().includes((search as string).toLowerCase()) &&
        !item.description
          ?.toLowerCase()
          .includes((search as string).toLowerCase())
      ) {
        delete items[key as keyof typeof items];
      }
    });
  }

  const categoryTitle = (category as string | undefined)
    ?.split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const typeTitle = (type as string | undefined)
    ?.split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Layout className="justify-between">
      <LayoutHeader>
        <LayoutTitle>{categoryTitle || typeTitle}</LayoutTitle>
        <BreadcrumbNavWithQueryParams
          currentPageName={categoryTitle || typeTitle}
        />
      </LayoutHeader>
      <LayoutActions className="flex items-end gap-2">
        <ItemsSearch placeholder="Search items..." />
      </LayoutActions>
      <LayoutContent className="space-y-5">
        <ItemCategoriesBadges categories={categories} type={type as string} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(items).map((key) => {
            const item = items[key as keyof typeof items] as Item;
            if (!item.name && !item.description) return null;
            const imageUrl = `https://assets.erdb.workers.dev/icons/${type}/${item.icon}/low`;
            const itemPath = `/items/${item.englishName}?type=${type}${
              category ? `&category=${category}` : ""
            }`;
            return (
              <Card
                key={key}
                className="relative w-full hover:bg-muted/50 hover:shadow-lg"
              >
                <AddToFavoriteButton
                  item={item}
                  type={type as string}
                  image={imageUrl}
                  className="absolute right-1 top-1"
                />
                <Link href={itemPath}>
                  <div className="space-y-6">
                    <CardTitle>
                      {item.category && categories.length > 1 && (
                        <Badge variant="outline" className="ml-1">
                          {item.category}
                        </Badge>
                      )}
                      <div className="mt-8 flex justify-center">
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          width={130}
                          height={130}
                        />
                      </div>
                    </CardTitle>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <h3 className="text-center text-xl font-semibold tracking-tight">
                          {item.name}
                        </h3>
                        <div className="space-y-1 text-center text-sm">
                          {item.description
                            ?.split("\n\n")
                            .map((paragraph: string, index: number) => (
                              <p key={index} className="my-2">
                                {paragraph}
                              </p>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </LayoutContent>
    </Layout>
  );
}
