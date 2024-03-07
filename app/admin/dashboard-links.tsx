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
        url: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Tables",
    links: [
      {
        title: "Users",
        icon: <User2 />,
        url: "/admin/users",
      },
      {
        title: "Feedbacks",
        icon: <MessageSquareWarning />,
        url: "/admin/feedbacks",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Layout page",
        icon: <LayoutPanelLeft />,
        url: "/admin/layout-page",
      },
    ],
  },
];
