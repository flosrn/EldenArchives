import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import type { Pluggable } from "unified";

export const rehypePlugins: Pluggable[] = [
  [
    rehypePrism,
    {
      ignoreMissing: true,
    },
  ],
];

export const remarkPlugins = [remarkGfm];
