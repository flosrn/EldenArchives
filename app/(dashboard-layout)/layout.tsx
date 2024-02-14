import type { LayoutParams } from "@/types/next";
import { DashboardNavigation } from "./DashboardNavigation";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return <DashboardNavigation>{props.children}</DashboardNavigation>;
}
