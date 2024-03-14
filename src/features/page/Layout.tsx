import type { ComponentPropsWithoutRef } from "react";

import { Typography } from "@/components/ui/typography";
import { BreadcrumbNav } from "@/features/navigation/BreadcrumbNav";
import { cn } from "@/lib/utils";

export const Layout = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "max-w-6xl flex-wrap w-full flex gap-4 m-auto px-4 mt-4",
        props.className
      )}
    />
  );
};

export const LayoutHeader = ({
  withNav,
  ...props
}: { withNav?: boolean } & ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn({ "space-y-2 mb-2": withNav })}>
      <div
        {...props}
        className={cn(
          "flex items-start gap-2 flex-col w-full md:flex-1 min-w-[200px]",
          props.className
        )}
      />
      {withNav && <BreadcrumbNav />}
    </div>
  );
};

export const LayoutTitle = (props: ComponentPropsWithoutRef<"h1">) => {
  return <Typography {...props} variant="h2" className={cn(props.className)} />;
};

export const LayoutDescription = (props: ComponentPropsWithoutRef<"p">) => {
  return <Typography {...props} className={cn(props.className)} />;
};

export const LayoutActions = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={cn("flex items-center", props.className)} />
  );
};

export const LayoutContent = (props: ComponentPropsWithoutRef<"div">) => {
  return <div {...props} className={cn("w-full", props.className)} />;
};
