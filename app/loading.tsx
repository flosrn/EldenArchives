"use client";

import { Loader } from "@/components/ui/loader";
import { HeaderBase } from "@/features/layout/HeaderBase";

export default function LoadingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    </div>
  );
}
