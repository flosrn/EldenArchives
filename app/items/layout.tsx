import React, { type ReactNode } from "react";

import { FavoritesDrawer } from "@/features/favorites/FavoritesDrawer";

import { ItemsNavigation } from "./ItemsNavigation";

export default async function RouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ItemsNavigation>
      {children}
      <FavoritesDrawer />
    </ItemsNavigation>
  );
}
