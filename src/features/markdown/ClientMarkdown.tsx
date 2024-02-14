import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

export type ClientMarkdownProps = ComponentPropsWithoutRef<typeof Markdown>;

export const ClientMarkdown = ({
  children,
  className,
  ...props
}: ClientMarkdownProps) => {
  return (
    <Markdown
      rehypePlugins={rehypePlugins}
      remarkPlugins={remarkPlugins as never}
      className={cn("prose dark:prose-invert", className)}
      {...props}
    >
      {children}
    </Markdown>
  );
};
