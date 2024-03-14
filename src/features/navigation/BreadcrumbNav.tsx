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

export type BreadcrumbNavProps = {};

export const BreadcrumbNav = (props: BreadcrumbNavProps) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const pathLabel = path[0].toUpperCase() + path.slice(1);
          return (
            <React.Fragment key={path}>
              <BreadcrumbItem>
                {index === paths.length - 1 ? (
                  <BreadcrumbPage>{pathLabel}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/${path}`}>{pathLabel}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
