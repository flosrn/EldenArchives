import Image from "next/image";

import { Hero } from "@/features/landing/Hero";
import { LandingHeader } from "@/features/landing/LandingHeader";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
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
