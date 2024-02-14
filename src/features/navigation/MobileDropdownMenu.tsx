"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Fragment, cloneElement, useState } from "react";
import { DASHBOARD_LINKS } from "../../../app/(dashboard-layout)/dashboard-links";
import type { NavigationLinkGroups } from "./navigation.type";

export const MobileDropdownMenu = ({
  links,
  className,
}: {
  links: NavigationLinkGroups[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          width: "calc(100vw - 2rem)",
          marginRight: "1rem",
        }}
      >
        {links.map((section, index) => (
          <Fragment key={index}>
            {section.title ? (
              <DropdownMenuLabel className="text-muted-foreground">
                {section.title}
              </DropdownMenuLabel>
            ) : null}
            {section.links.map((link) => (
              <DropdownMenuItem key={link.url} asChild>
                <Typography
                  as={Link}
                  variant="large"
                  className="flex items-center gap-2 text-base"
                  href={link.url}
                  onClick={() => setOpen(false)}
                >
                  {cloneElement(link.icon, {
                    className: "h-4 w-4",
                  })}
                  <span>{link.title}</span>
                </Typography>
              </DropdownMenuItem>
            ))}
            {index < DASHBOARD_LINKS.length - 1 ? (
              <DropdownMenuSeparator />
            ) : null}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
