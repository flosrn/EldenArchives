import { create } from "zustand";

type Favorite = {
  id: number;
  name: string;
  type: string;
  image: string;
  icon?: number;
  description?: string;
  category?: string;
};

type FavoritesState = {
  favorites: Favorite[];
};

type FavoritesAction = {
  addToFavorites: (item: Favorite) => void;
  removeFromFavorites: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesAction & FavoritesState>()(
  (set) => ({
    favorites: [],
    addToFavorites: (item) =>
      set((state) => ({
        favorites: [...state.favorites, item],
      })),
    removeFromFavorites: (id) => {
      set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== id),
      }));
    },
  })
);
