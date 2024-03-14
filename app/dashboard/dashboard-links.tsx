import {
  LayoutDashboard,
  LayoutPanelLeft,
  MessageSquareWarning,
  User2,
} from "lucide-react";

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
    title: "Tables",
    links: [
      {
        title: "Users",
        icon: <User2 />,
        url: "/dashboard/users",
      },
      {
        title: "Feedbacks",
        icon: <MessageSquareWarning />,
        url: "/dashboard/feedbacks",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Layout page",
        icon: <LayoutPanelLeft />,
        url: "/dashboard/layout-page",
      },
    ],
  },
];
