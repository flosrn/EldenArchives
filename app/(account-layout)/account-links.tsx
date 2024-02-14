import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { AlertCircle, Coins, Mail, User2 } from "lucide-react";

export const ACCOUNT_LINKS: NavigationLinkGroups[] = [
  {
    title: "PERSONAL INFORMATION",
    links: [
      { url: "/account", title: "Profile", icon: <User2 /> },
      {
        url: "/account/delete",
        title: "Delete profile",
        icon: <AlertCircle />,
      },
      { url: "/account/billing", title: "Billing", icon: <Coins /> },
    ],
  },
  {
    title: "EMAIL SETTINGS",
    links: [{ url: "/account/email", title: "Settings", icon: <Mail /> }],
  },
];
