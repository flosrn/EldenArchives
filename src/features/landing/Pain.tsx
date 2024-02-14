"use client";

import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "./SectionLayout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className=" flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">I love posting on Threads...</Typography>
        <Typography variant="large">
          But I loose my time going and publishing each days
        </Typography>
        <div className="flex items-start gap-4">
          <div className="flex-1 rounded bg-red-500/30 p-4">
            <Typography variant="h3" className="text-red-500">
              😞 Posting without Threader
            </Typography>
            <ul className="ml-4 mt-4 flex list-disc flex-col gap-2 text-lg text-foreground/80">
              <li>Going on Thread every day to post</li>
              <li>Be distracted when I go on the app</li>
              <li>Losing track of my post</li>
              <li>Incosistent</li>
            </ul>
          </div>
          <div className="flex-1 rounded bg-green-500/30 p-4">
            <Typography variant="h3" className="text-green-500">
              😎 Posting WITH Threader
            </Typography>
            <ul className="ml-4 mt-4 flex list-disc flex-col gap-2 text-lg text-foreground/80">
              <li>Schedule your post on the Threader UI</li>
              <li>Avoiding opening the app every day</li>
              <li>See excatly what you have scheduled</li>
              <li>Be consistent</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
