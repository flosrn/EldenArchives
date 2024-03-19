import type { ReactNode } from "react";

import { DashboardNavigation } from "./DashboardNavigation";

export default async function RouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardNavigation>{children}</DashboardNavigation>;
}
