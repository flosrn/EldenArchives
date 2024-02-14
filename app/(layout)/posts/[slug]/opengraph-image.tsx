import { getCurrentPost } from "@/features/posts/post-manager";
import { getOgImageFont } from "@/lib/og-image-font";
import type { PageParams } from "@/types/next";
import { ImageResponse } from "next/og";
import { PostSlugMetadataImage } from "./PostSlugMetadataImage";

export const alt = "Codeline information images";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage(
  props: PageParams<{ slug: string }>,
) {
  const post = await getCurrentPost(props.params.slug);

  if (!post) {
    return null;
  }

  return new ImageResponse(<PostSlugMetadataImage post={post} />, {
    // For convenience, we can re-use the exported opengraph-image
    // size config to also set the ImageResponse's width and height.
    ...size,
    fonts: await getOgImageFont(),
  });
}
