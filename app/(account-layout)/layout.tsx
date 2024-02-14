import type { LayoutParams } from "@/types/next";
import { AccountNavigation } from "./AccountNavigation";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return <AccountNavigation>{props.children}</AccountNavigation>;
}
