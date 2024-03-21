"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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

export const BreadcrumbNavWithQueryParams = ({
  currentPageName,
}: BreadcrumbNavProps) => {
  const pathname = usePathname();
  const isNested = pathname.split("/").length > 2;

  const basePath = pathname.split("/")[1];
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const isSamePage =
    currentPageName?.toLowerCase() === type || currentPageName === category;
  let paths = [basePath, type, category, currentPageName].filter(
    Boolean
  ) as string[];
  if (isSamePage) {
    paths = paths.slice(0, -1);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          let pathLabel = path[0].toUpperCase() + path.slice(1);
          const href = `/${basePath}?type=${type}${category && (index === paths.length - 1 || (isNested && index === paths.length - 2)) ? `&category=${category}` : ""}`;

          if (isLast && currentPageName) {
            pathLabel = currentPageName;
          }

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{pathLabel}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{pathLabel}</Link>
                  </BreadcrumbLink>
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
