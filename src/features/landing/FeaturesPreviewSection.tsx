"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { SectionLayout } from "./SectionLayout";

type Feature = {
  label: string;
  icon: ReactNode;
  gif: string;
  description: string;
}

export type FeaturesPreviewProps = {
  features: Feature[];
}

export const FeaturesPreviewSection = (props: FeaturesPreviewProps) => {
  const [currentFeature, setCurrentFeature] = useState<number>(0);

  return (
    <SectionLayout
      size="lg"
      variant="default"
      className="flex flex-col gap-8 lg:gap-16"
    >
      <Typography variant="h2" className="text-5xl">
        Tout ce qu'il te faut pour créer une application rapidement
      </Typography>
      <div
        className="mt-4 flex flex-1 gap-4 px-2 max-lg:flex-col"
        style={{ height: 500 }}
      >
        <div className="flex flex-1 flex-col gap-8 lg:gap-12">
          {props.features.map((feature, i) => {
            const isSelected = i === currentFeature;
            return (
              <div key={feature.label}>
                <button
                  className={cn("flex items-center gap-2", {
                    "text-primary": isSelected,
                  })}
                  onClick={() => {
                    setCurrentFeature(i);
                  }}
                >
                  {feature.icon}
                  <Typography variant="large">{feature.label}</Typography>
                </button>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      key="feature-description"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="h-4" />
                      <Typography variant="base">
                        {feature.description}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="flex-1" style={{ maxWidth: 500 }}>
          <AspectRatio ratio={1}>
            <AnimatePresence mode="wait">
              <motion.img
                key={props.features[currentFeature].gif}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                alt="feature-preview"
                src={props.features[currentFeature].gif}
                className="size-full overflow-hidden rounded-md object-contain object-center"
              />
            </AnimatePresence>
          </AspectRatio>
        </div>
      </div>
    </SectionLayout>
  );
};
