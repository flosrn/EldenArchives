import { Skeleton } from "@/components/ui/skeleton";
import { Layout, LayoutContent } from "@/features/page/Layout";

export default function RouteLoading() {
  return (
    <Layout>
      <LayoutContent className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="flex items-end">
            <Skeleton className="h-10 w-[195px]" />
          </div>
        </div>
        <Skeleton className="h-6 w-1/3" />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-[350px]" />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}
