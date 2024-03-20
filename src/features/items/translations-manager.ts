import fs from "fs/promises";
import path from "path";

import type { Item } from "../../../app/items/item.types";
import type { Translation } from "./translation.types";

type Translations = {
  titles: Translation[];
  descriptions: Translation[];
};

export const loadTranslations = async (
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

export const getItemsWithTranslations = ({
  items,
  type,
  titles,
  descriptions,
}: {
  items: Item[];
  type: string;
  titles: Translation[];
  descriptions: Translation[];
}): Item[] => {
  return Object.keys(items).map((key) => {
    const item = items[key as keyof typeof items] as Item;
    if (type === "ashes-of-war") {
      const itemId = item.id.toString().slice(0, -2);
      item.id = Number(itemId);
    }
    const title = titles.find((t) => t.ID === item.id);
    const description = descriptions.find((d) => d.ID === item.id);
    return {
      ...item,
      name: title?.Text || item.name,
      description: description?.Text || item.description,
    };
  });
};

export const getCategories = (
  items: Item[]
): { name: string; icon: number }[] => {
  return Object.keys(items)
    .map((key) => {
      const item = items[key as keyof typeof items] as Item;
      return { name: item.category, icon: item.icon };
    })
    .filter((item, index, self) => {
      return index === self.findIndex((t) => t.name === item.name);
    });
};
