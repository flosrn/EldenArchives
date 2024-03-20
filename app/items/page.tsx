import fs from "fs/promises";
import path from "path";
import React from "react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ItemCategoriesBadges } from "@/features/items/ItemCategoriesBadges";
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
import type { Translation } from "./translation.types";

type Translations = {
  titles: Translation[];
  descriptions: Translation[];
};

const loadTranslations = async (
  type: string | string[]
): Promise<Translations> => {
  let itemType = type;
  if (
    type === "spells" ||
    type === "spirit-ashes" ||
    type === "tools" ||
    type === "shop" ||
    type === "keys" ||
    type === "info" ||
    type === "gestures" ||
    type === "crafting-materials" ||
    type === "bolstering-materials"
  ) {
    itemType = "goods";
  }
  if (type === "ashes-of-war") {
    itemType = "sword-arts";
  }
  if (type === "ammo") {
    itemType = "armaments";
  }

  path.join(process.cwd(), "content/translations");
  const titlesFile = await fs.readFile(
    `${process.cwd()}/content/translations/titles/${itemType}.json`,
    "utf8"
  );
  const descriptionsFile = await fs.readFile(
    `${process.cwd()}/content/translations/descriptions/${itemType}.json`,
    "utf8"
  );
  const titles = JSON.parse(titlesFile).Fmg.Entries;
  const descriptions = JSON.parse(descriptionsFile).Fmg.Entries;
  return {
    titles,
    descriptions,
  };
};

const fetchItems = async (
  type: string | string[],
  category: string | string[]
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
  const categories = Object.keys(items)
    .map((key) => {
      const item: Item = items[key];
      return { name: item.category, icon: item.icon };
    })
    .filter((item, index, self) => {
      return index === self.findIndex((t) => t.name === item.name);
    });

  const { titles, descriptions } = await loadTranslations(type);

  const itemsWithTranslation = Object.keys(items).map((key) => {
    const item = items[key];
    if (type === "ashes-of-war") {
      const itemId = item.id.toString().slice(0, -2);
      item.id = Number(itemId);
    }
    const titleTranslation = titles.find(
      (translation) => translation.ID === item.id
    );
    const descriptionTranslation = descriptions.find(
      (translation) => translation.ID === item.id
    );
    return {
      ...item,
      name: titleTranslation ? titleTranslation.Text : null,
      description: descriptionTranslation ? descriptionTranslation.Text : null,
    };
  });

  return { items: itemsWithTranslation, categories };
};

export default async function RoutePage({
  searchParams: { type, category, search },
}: PageParams<{}>) {
  const { items, categories } = await fetchItems(type || "", category || "");

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
            return (
              <Card key={key} className="space-y-8">
                <CardTitle>
                  {item.category && categories.length > 1 && (
                    <Badge className="ml-1">{item.category}</Badge>
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
              </Card>
            );
          })}
        </div>
      </LayoutContent>
    </Layout>
  );
}
