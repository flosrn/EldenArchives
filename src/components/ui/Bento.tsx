import { cn } from "@/lib/utils";
import { Typography } from "./typography";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-card border-border border justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="flex flex-col gap-2">
        {icon}
        <Typography variant="large">{title}</Typography>
        <Typography variant="muted">{description}</Typography>
      </div>
    </div>
  );
};
