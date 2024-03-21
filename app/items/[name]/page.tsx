import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToFavoriteButton } from "@/features/favorites/AddToFavoriteButton";
import { FavoritesDrawer } from "@/features/favorites/FavoritesDrawer";
import {
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

import type { Item } from "../item.types";
import { ItemImage } from "./ItemImage";

const fetchItem = async (
  name: string,
  type: string
): Promise<{ item: Item }> => {
  const response = await fetch(
    `https://api.erdb.wiki/v1/latest/${type}/${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const item = await response.json();

  const { titles, descriptions } = await loadTranslations(type);
  const itemWithTranslation = getItemsWithTranslations({
    items: [item],
    type,
    titles,
    descriptions,
  });

  return { item: itemWithTranslation[0] };
};

export default async function RoutePage({
  params: { name },
  searchParams: { type, category },
}: PageParams<{
  name: string;
  type: string;
  category: string;
}>) {
  const { item } = await fetchItem(name, type as string);
  const imageUrl = `https://assets.erdb.workers.dev/icons/${type}/${item.icon}/high`;

  return (
    <Layout className="justify-between [&>div]:w-full">
      <LayoutHeader className="w-full flex-row items-end justify-between">
        <div className="flex flex-col gap-2">
          <LayoutTitle>{item.name}</LayoutTitle>
          <BreadcrumbNavWithQueryParams currentPageName={item.name} />
        </div>
        <AddToFavoriteButton
          size="large"
          item={item}
          type={type as string}
          image={imageUrl}
        />
      </LayoutHeader>
      <LayoutContent>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <ItemImage src={imageUrl} alt={item.name} />
          </div>
          <Card className="h-fit py-5 lg:py-10">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.description}</p>
              <div className="mt-4">{/*<p>FP cost: {item.fp_cost}</p>*/}</div>
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
