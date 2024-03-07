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
        url: "/users",
      },
      {
        title: "Feedbacks",
        icon: <MessageSquareWarning />,
        url: "/feedbacks",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Layout page",
        icon: <LayoutPanelLeft />,
        url: "/layout-page",
      },
    ],
  },
];
