import { Skeleton } from "@/components/ui/skeleton";
import type { LayoutParams } from "@/types/next";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return <Skeleton className="h-12" />;
}
