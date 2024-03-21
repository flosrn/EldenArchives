import Image from "next/image";

import { Hero } from "@/features/landing/Hero";
import { LandingHeader } from "@/features/landing/LandingHeader";

export default function HomePage() {
  return (
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    <div className="flex h-dvh h-screen flex-col gap-2 overflow-hidden">
      <Image
        src="/images/Elden_Ring_Erdtree_4k.jpg"
        alt="Elden Ring Erdtree"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="absolute left-0 top-0 size-full bg-background/50" />
      <div className="mt-16"></div>
      <LandingHeader />
      <Hero />
    </div>
  );
}
