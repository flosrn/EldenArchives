import { CircleSvg } from "@/components/svg/CircleSvg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { Typography } from "../../components/ui/typography";
import { ReviewSmall } from "./review/ReviewSmall";

export const Hero = () => {
  return (
    <main className="relative m-auto my-12 flex min-h-[700px] max-w-7xl items-center gap-4 px-8 max-lg:flex-col">
      <div className="relative flex flex-1 flex-col items-start gap-4 lg:gap-6 xl:gap-8">
        <Typography variant="h1" className="!leading-tight">
          Write the best content and{" "}
          <span className="inline-block -rotate-2 bg-foreground text-background">
            Grow your{" "}
            <span className="relative inline-block">
              <span>business</span>
              <CircleSvg className="fill-primary" />
            </span>
          </span>
        </Typography>
        <Typography variant="large">
          Build for Thread, create, schedule and publish your content to your
          account with AI.
        </Typography>

        <Link
          href="#pricing"
          className={cn(buttonVariants({ size: "lg", variant: "default" }))}
        >
          <Rocket size={20} className="mr-2" /> Rejoins maintenant
        </Link>

        <ReviewSmall
          stars={5}
          avatars={[
            "https://i.pravatar.cc/300?u=1",
            "https://i.pravatar.cc/300?u=2",
            "https://i.pravatar.cc/300?u=3",
            "https://i.pravatar.cc/300?u=4",
            "https://i.pravatar.cc/300?u=5",
          ]}
        >
          1222+ user write with it
        </ReviewSmall>
      </div>
      <div className="flex flex-1 justify-end">
        <img
          src="/images/hero.png"
          className="max-w-lg object-contain max-md:max-w-md"
          alt="Hero images"
        />
      </div>
    </main>
  );
};
