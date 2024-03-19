import { promises as fs } from "fs";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import type { PageParams } from "@/types/next";

import type { Item } from "./item.types";
import type { Translation } from "./translation.types";

type Translations = {
  titles: Translation[];
  descriptions: Translation[];
};

const loadTranslations = async (type: string): Promise<Translations> => {
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
  const titlesFile = await fs.readFile(
    `${process.cwd()}/public/translations/titles/${itemType}.json`,
    "utf8"
  );
  const descriptionsFile = await fs.readFile(
    `${process.cwd()}/public/translations/descriptions/${itemType}.json`,
    "utf8"
  );
  const titles = JSON.parse(titlesFile).Fmg.Entries;
  const descriptions = JSON.parse(descriptionsFile).Fmg.Entries;
  return {
    titles,
    descriptions,
  };
};

const fetchItems = async (type: string): Promise<Item[]> => {
  const response = await fetch(`https://api.erdb.wiki/v1/latest/${type}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const items = await response.json();
  console.log("items : ", items);
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

  return itemsWithTranslation;
};

export default async function RoutePage({
  searchParams: { type },
}: PageParams<{}>) {
  console.log("type : ", type);
  const items = await fetchItems(type);
  // console.log("items : ", items);
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Items</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(items).map((key) => {
            const item = items[key];
            const imageUrl = `https://assets.erdb.workers.dev/icons/${type}/${item.icon}/low`;
            return (
              <Card key={key} className="space-y-8">
                <CardTitle>
                  <Badge>{item.id}</Badge>
                  <div className="mt-8 flex justify-center">
                    <Avatar className="size-28 overflow-visible">
                      {imageUrl ? <AvatarImage src={imageUrl} /> : null}
                      <AvatarFallback>
                        {item?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
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
                        .map((paragraph, index) => (
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
