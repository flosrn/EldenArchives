import { create } from "zustand";

type CategoriesState = {
  categories: { name: string; icon: number }[];
};

type CategoriesAction = {
  setCategories: (value: { name: string; icon: number }[]) => void;
};

export const useCategoriesStore = create<CategoriesAction & CategoriesState>()(
  (set) => ({
    categories: [],
    setCategories: (value) => set(() => ({ categories: value })),
  })
);
