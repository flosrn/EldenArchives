import type { LayoutParams } from "@/types/next";

import { ItemsNavigation } from "./ItemsNavigation";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return <ItemsNavigation>{props.children}</ItemsNavigation>;
}
