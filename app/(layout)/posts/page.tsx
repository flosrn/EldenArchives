import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import { getPosts, getPostsTags } from "@/features/posts/post-manager";
import { PostCard } from "@/features/posts/PostCard";
import type { PageParams } from "@/types/next";

const getTags = (
  params: string | string[] | undefined
): string[] | undefined => {
  if (Array.isArray(params)) {
    return params;
  }
  if (typeof params === "string") {
    return [params];
  }
  return undefined;
};

export default async function RoutePage(props: PageParams<{}>) {
  const activeTags = getTags(props.searchParams.tag);
  const tags = await getPostsTags();
  const posts = await getPosts(activeTags);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Blog</LayoutTitle>
        {activeTags ? (
          <LayoutDescription>
            Posts tagged with: {activeTags.join(", ")}
          </LayoutDescription>
        ) : null}
      </LayoutHeader>
      <LayoutContent className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={{
              pathname: "/posts",
              query: {
                tag: tag,
              },
            }}
          >
            <Badge
              variant={
                activeTags && activeTags.includes(tag) ? "default" : "outline"
              }
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </LayoutContent>

      {posts.length === 0 ? (
        <LayoutContent className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center rounded-lg border-2 border-dashed p-4 lg:gap-6 lg:p-8">
            <FileQuestion />
            <Typography variant="h2">No posts found</Typography>
            <Link className={buttonVariants({ variant: "link" })} href="/posts">
              View all posts
            </Link>
          </div>
        </LayoutContent>
      ) : (
        <LayoutContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </LayoutContent>
      )}
    </Layout>
  );
}
