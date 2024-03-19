import type { ReactNode } from "react";

import { ItemsNavigation } from "./ItemsNavigation";

export default async function RouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ItemsNavigation>{children}</ItemsNavigation>;
}
