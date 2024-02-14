import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { PropsWithChildren } from "react";

export type ReviewSmallProps = PropsWithChildren<{
  /**
   * An array of URLs to users avatar.
   */
  avatars: string[];
  /**
   * The number of stars to display.
   */
  stars: number;
}>;

export const ReviewSmall = (props: ReviewSmallProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        {props.avatars.map((avatar) => (
          <Avatar
            key={avatar}
            className="-mr-4 size-12 border-4 border-background last:mr-0"
          >
            <AvatarFallback>A</AvatarFallback>
            <AvatarImage src={avatar} alt="avatar" />
          </Avatar>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const isFilled = i < props.stars;
            return (
              <Star
                size={20}
                className="text-yellow-400"
                fill={isFilled ? "currentColor" : undefined}
                key={i}
              />
            );
          })}
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
