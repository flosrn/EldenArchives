"use client";

import { DotPattern } from "@/components/svg/DotPattern";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { ClientMarkdown } from "@/features/markdown/ClientMarkdown";
import type { ReactNode } from "react";
import { SectionLayout } from "./SectionLayout";

export const FeaturesSection = ({
  features,
}: {
  features: FeatureLineProps[];
}) => {
  return (
    <SectionLayout size="sm" className="relative " id="features">
      <div className="relative flex flex-col gap-16 lg:gap-28">
        <div className="flex flex-col items-center gap-2">
          <Badge>The features you NEED.</Badge>
          <Typography variant="h2" className="m-auto max-w-xl text-center">
            More than a post schedulure, we will help you <u>grow</u>.
          </Typography>
          <Typography
            variant="muted"
            className="m-auto max-w-lg text-center text-base"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            consequuntur! Similique, nulla placeat in expedita omnis ab error
            eaque esse a doloremque, iusto libero eligendi, animi minus
            architecto. Modi, consectetur?
          </Typography>
        </div>
        {features.map((f, i) => {
          return (
            <FeatureLine
              key={i}
              badge={f.badge}
              title={f.title}
              description={f.description}
              component={f.component}
            />
          );
        })}
      </div>
    </SectionLayout>
  );
};

type FeatureLineProps = {
  badge: string;
  title: string;
  description: string;
  component: ReactNode;
};

export const FeatureLine = (props: FeatureLineProps) => {
  return (
    <div className="flex items-center gap-4 odd:flex-row-reverse max-lg:flex-col">
      <div className="flex flex-1 flex-col items-start gap-2">
        <Badge color="pink">{props.badge}</Badge>
        <Typography variant="h3" className="">
          {props.title}
        </Typography>
        <ClientMarkdown className="prose-sm">
          {props.description}
        </ClientMarkdown>
      </div>
      <div className="w-full max-w-sm">
        <DotPattern>{props.component}</DotPattern>
      </div>
    </div>
  );
};
