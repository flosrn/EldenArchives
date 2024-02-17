import { LayoutDashboard, User2 } from "lucide-react";

import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";

export const DASHBOARD_LINKS: NavigationLinkGroups[] = [
  {
    links: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard />,
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Users",
        icon: <User2 />,
        url: "/users",
      },
    ],
  },
];
