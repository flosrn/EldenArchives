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
  const path = pathname.split("/")[1];
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const paths = [path, type, category].filter(Boolean) as string[];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          let pathLabel = path[0].toUpperCase() + path.slice(1);
          const href = `${pathname}?type=${type}`;

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
