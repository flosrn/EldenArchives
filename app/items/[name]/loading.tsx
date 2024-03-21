import { Skeleton } from "@/components/ui/skeleton";
import { Layout, LayoutContent } from "@/features/page/Layout";

export default function RouteLoading() {
  return (
    <Layout>
      <LayoutContent className="space-y-4">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-[350px] w-full" />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}
