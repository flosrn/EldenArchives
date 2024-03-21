"use client";

import { cloneElement, Fragment } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { DASHBOARD_LINKS } from "../../../app/dashboard/dashboard-links";
import type { NavigationLinkGroups } from "./navigation.type";

const useCurrentPath = (currentPath: string, links: NavigationLinkGroups[]) => {
  const pathSegments = currentPath.split("/");
  const allDashboardLinks = links.flatMap((section) => section.links);

  const linkMatchCounts = allDashboardLinks.map((link) => ({
    url: link.url,
    matchCount: link.url
      .split("/")
      .filter((segment, index) => segment === pathSegments[index]).length,
  }));

  const mostMatchingLink = linkMatchCounts.reduce(
    (maxMatchLink, currentLink) =>
      currentLink.matchCount > maxMatchLink.matchCount
        ? currentLink
        : maxMatchLink,
    { url: "", matchCount: 0 }
  );

  return mostMatchingLink.url;
};

export const DesktopVerticalMenu = ({
  links,
  className,
}: {
  links: NavigationLinkGroups[];
  className?: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  let currentPath = "";
  if (type) {
    const category = searchParams.get("category");
    currentPath = `${pathname}?type=${type}${
      category ? `&category=${category}` : ""
    }`;
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentPath = useCurrentPath(pathname, links);
  }

  return (
    <nav className={cn("flex flex-col h-full gap-4", className)}>
      {links.map((section, index) => (
        <Fragment key={index}>
          {section.title ? (
            <Typography variant="muted" className="px-2">
              {section.title}
            </Typography>
          ) : null}
          <div className="flex flex-col gap-2">
            {section.links.map((link) => {
              const isCurrent = currentPath === link.url;

              return (
                <Link
                  key={link.url}
                  className={cn(
                    "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                    "hover:bg-card",
                    {
                      "bg-accent/50 hover:bg-accent/80": isCurrent,
                    }
                  )}
                  href={link.url}
                >
                  {cloneElement(link.icon, {
                    className: "h-4 w-4",
                  })}
                  <span className="flex h-8 items-center gap-2 truncate rounded-md px-2 text-sm">
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
          {index < DASHBOARD_LINKS.length - 1 ? <Separator /> : null}
        </Fragment>
      ))}
    </nav>
  );
};
