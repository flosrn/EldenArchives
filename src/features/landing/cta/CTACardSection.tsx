"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { usePlausible } from "next-plausible";
import Link from "next/link";
import { SectionLayout } from "../SectionLayout";

export default function CTASectionCard() {
  const plausible = usePlausible();

  return (
    <SectionLayout>
      <Card className="relative isolate overflow-hidden px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <Typography variant="h2">It's time to start.</Typography>
        <Typography variant="base" className="mt-4 text-muted-foreground">
          Create an account and start posting today.
        </Typography>
        <div className="mt-10 flex items-center justify-center gap-6">
          <Link
            onClick={() => {
              plausible("CTASectionCard+ClickJoin");
            }}
            href="#pricing"
            className={buttonVariants({ size: "lg" })}
          >
            Get started
          </Link>
        </div>
      </Card>
    </SectionLayout>
  );
}
