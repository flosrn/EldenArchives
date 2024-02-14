"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { BuyButton } from "@/features/stripe/BuyButton";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type PricingCardProps = {
  isPopular?: boolean;
  type: "monthly" | "yearly" | "one-time";
  id: string;
  title: string;
  subtitle: string;
  price: number;
  barredPrice?: number;
  currency?: string;
  features: string[];
  cta: string;
  ctaSubtitle: string;
  priceId: string;
  className?: string;
};

export const PricingCard = (props: PricingCardProps) => {
  return (
    <Card
      className={cn(
        "border-[0.5px] h-fit lg:rounded-3xl rounded-3xl flex-1 p-6 ring-1 ring-gray-900/10 sm:p-8",
        {
          "relative bg-background shadow-2xl": props.isPopular,
          "bg-background/60 sm:mx-8 lg:mx-0": !props.isPopular,
        },
        props.className,
      )}
    >
      {props.isPopular ? (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <Badge className="-translate-y-1/2">Popular</Badge>
        </div>
      ) : null}
      <CardHeader className="flex flex-col items-start gap-6 lg:gap-8">
        <p className="gap-4 text-lg font-bold uppercase text-primary">
          {props.title}
        </p>
        <div className="flex items-end justify-center gap-2">
          <p className="text-5xl font-extrabold">${props.price}</p>
          <Typography variant="base">{props.currency ?? "USD"}</Typography>

          {props.barredPrice ? (
            <div className="relative self-start">
              <p className="text-lg font-bold">${props.barredPrice}</p>
              <div className="absolute top-1/2 h-0.5 w-full rotate-45 bg-red-500" />
            </div>
          ) : null}
        </div>
        <Typography variant="muted">{props.subtitle}</Typography>
        <Separator />
        <ul className="flex w-full flex-col gap-3 lg:gap-4">
          {props.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-1">
              <Check className="text-green-500" size={20} />
              <Typography variant="muted" className="flex-1">
                {" "}
                {feature}
              </Typography>
            </li>
          ))}
        </ul>
      </CardHeader>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <BuyButton
          variant={props.isPopular ? "default" : "outline"}
          priceId={props.priceId}
        >
          {props.cta}
        </BuyButton>
        <Typography variant="muted">{props.ctaSubtitle}</Typography>
      </CardFooter>
    </Card>
  );
};
