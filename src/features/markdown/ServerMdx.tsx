import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";
import { ErrorBoundary } from "../../components/utils/ErrorBoundaries";
import { rehypePlugins, remarkPlugins } from "./markdown.config";

export type ServerMdxProps = {
  source: string;
  className?: string;
};

// * If you want to add custom component, such as an "EmailForm", you can add it to the MdxComponent object.
const MdxComponent = {} satisfies Record<string, React.ComponentType>;

export const ServerMdx = (props: ServerMdxProps) => {
  return (
    <div className={cn("prose dark:prose-invert", props.className)}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RenderMdx {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const RenderMdx = (props: ServerMdxProps) => {
  return (
    <MDXRemote
      source={props.source}
      components={MdxComponent}
      options={{
        mdxOptions: {
          // * We need to use `as never` because `MDXRemote` has legacy version of "unified"
          remarkPlugins: remarkPlugins,
          rehypePlugins: rehypePlugins as never,
          format: "mdx",
        },
      }}
    />
  );
};
