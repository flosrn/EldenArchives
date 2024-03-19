import { Hero } from "@/features/landing/Hero";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Footer } from "@/features/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex h-fit flex-col gap-2">
      <div className="mt-16"></div>
      <LandingHeader />

      <Hero />

      <Footer />
    </div>
  );
}
