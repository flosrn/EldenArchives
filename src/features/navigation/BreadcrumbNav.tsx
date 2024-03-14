"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbNavProps = {
  currentPageName?: string | null;
};

export const BreadcrumbNav = ({ currentPageName }: BreadcrumbNavProps) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          let pathLabel = path[0].toUpperCase() + path.slice(1);
          const href = `/${paths.slice(0, index + 1).join("/")}`;

          if (isLast && currentPageName) {
            pathLabel = currentPageName;
          }

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{pathLabel}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{pathLabel}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
