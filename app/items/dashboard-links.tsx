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
        title: "Home",
        icon: <LayoutDashboard />,
        url: "/home",
      },
    ],
  },
  {
    title: "Items",
    links: [
      {
        title: "Armes",
        icon: <User2 />,
        url: "/items?type=armaments",
      },
      {
        title: "Armures",
        icon: <MessageSquareWarning />,
        url: "/items?type=armor",
      },
      {
        title: "Sorts",
        icon: <MessageSquareWarning />,
        url: "/items?type=spells",
      },
      {
        title: "Talismans",
        icon: <MessageSquareWarning />,
        url: "/items?type=talismans",
      },
      {
        title: "Cendres de guerre",
        icon: <MessageSquareWarning />,
        url: "/items?type=ashes-of-war",
      },
      {
        title: "Cendres d'esprit",
        icon: <MessageSquareWarning />,
        url: "/items?type=spirit-ashes",
      },
      {
        title: "Matériaux de fabrication",
        icon: <MessageSquareWarning />,
        url: "/items?type=crafting-materials",
      },
      {
        title: "Matériaux de renforcement",
        icon: <MessageSquareWarning />,
        url: "/items?type=bolstering-materials",
      },
      {
        title: "Outils",
        icon: <MessageSquareWarning />,
        url: "/items?type=tools",
      },
      {
        title: "Shop",
        icon: <MessageSquareWarning />,
        url: "/items?type=shop",
      },
      {
        title: "Keys",
        icon: <MessageSquareWarning />,
        url: "/items?type=keys",
      },
      {
        title: "Info",
        icon: <MessageSquareWarning />,
        url: "/items?type=info",
      },
      {
        title: "Gestures",
        icon: <MessageSquareWarning />,
        url: "/items?type=gestures",
      },
      {
        title: "Munitions",
        icon: <MessageSquareWarning />,
        url: "/items?type=ammo",
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
