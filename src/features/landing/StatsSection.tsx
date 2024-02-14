"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionLayout } from "./SectionLayout";

type StatProps = {
  number: number;
  suffix: string;
  text: string;
}

const stats: StatProps[] = [
  {
    number: 476,
    suffix: "K",
    text: "Threads scheduled every month.",
  },
  {
    number: 1.44,
    suffix: "K",
    text: "Users that use our platform.",
  },
  {
    number: 1.5,
    suffix: "M+",
    text: "Interactions with posts created by our users.",
  },
  {
    number: 192,
    suffix: "K",
    text: "Users impacted by our published posts.",
  },
];

export default function StatsSection() {
  return (
    <SectionLayout spacing="sm">
      <div className="grid max-w-sm items-start gap-12 sm:grid-cols-2 md:-mx-5 md:max-w-none md:grid-cols-4 md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center md:px-5">
            <h4 className="mb-2 text-2xl font-bold tabular-nums md:text-3xl">
              <Counter from={0} to={stat.number} />

              {stat.suffix}
            </h4>
            <p className="text-sm text-muted-foreground">{stat.text}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

function Counter({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",

      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}
