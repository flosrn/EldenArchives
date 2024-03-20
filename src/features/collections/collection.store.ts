import { create } from "zustand";

type ItemCollection = {
  id: number;
  name: string;
  type: string;
  image: string;
  description?: string;
  category?: string;
};

type Collection = {
  name: string;
  tags: string[];
  type: string;
  notes?: string;
  image?: string;
  items: ItemCollection[];
};

type CollectionState = {
  collection: Collection;
};

type CollectionAction = {
  addToCollection: (item: ItemCollection) => void;
};

export const useCollectionStore = create<CollectionAction & CollectionState>()(
  (set) => ({
    collection: {
      name: "My Collection",
      tags: ["#tag1", "#tag2"],
      type: "item",
      items: [],
    },
    addToCollection: (item) =>
      set((state) => ({
        collection: {
          ...state.collection,
          items: [...state.collection.items, item],
        },
      })),
  })
);
