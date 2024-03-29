import Link from "next/link";
import { Rocket } from "lucide-react";

import { CircleSvg } from "@/components/svg/CircleSvg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Typography } from "../../components/ui/typography";

export const Hero = () => {
  return (
    <main className="relative flex min-h-[700px] max-w-2xl items-center gap-4 px-8 lg:my-16 lg:ml-32">
      <div className="relative flex flex-1 flex-col items-start gap-4 lg:gap-6 xl:gap-8">
        <Typography variant="h1" className="!leading-tight">
          Explorez le Lore de{" "}
          <span className="inline-block -rotate-2 bg-foreground text-background">
            Elden{" "}
            <span className="relative inline-block">
              <span>Ring</span>
              <CircleSvg className="fill-primary" />
            </span>
          </span>
        </Typography>
        <Typography variant="large">
          Une plateforme communautaire pour explorer les objets, les armes, le
          lore, partager des théories et bien plus encore.
        </Typography>

        <Typography variant="large">Et en Français ! 🇫🇷</Typography>

        <Link
          href="/items?type=armor"
          className={cn(buttonVariants({ size: "lg", variant: "default" }))}
        >
          <Rocket size={20} className="mr-2" /> Explore maintenant
        </Link>

        {/*<ReviewSmall*/}
        {/*  stars={5}*/}
        {/*  avatars={[*/}
        {/*    "https://i.pravatar.cc/300?u=1",*/}
        {/*    "https://i.pravatar.cc/300?u=2",*/}
        {/*    "https://i.pravatar.cc/300?u=3",*/}
        {/*    "https://i.pravatar.cc/300?u=4",*/}
        {/*    "https://i.pravatar.cc/300?u=5",*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  1222+ user write with it*/}
        {/*</ReviewSmall>*/}
      </div>
      {/*<div className="flex flex-1 justify-end">*/}
      {/*  <img*/}
      {/*    src="/images/hero.png"*/}
      {/*    className="max-w-lg object-contain max-md:max-w-md"*/}
      {/*    alt="Hero images"*/}
      {/*  />*/}
      {/*</div>*/}
    </main>
  );
};
