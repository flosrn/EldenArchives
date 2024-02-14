import { Skeleton } from "@/components/ui/skeleton";
import { Layout, LayoutContent } from "@/features/page/layout";

export default function RouteLoading() {
  return (
    <Layout>
      <LayoutContent className="space-y-6">
        <Skeleton className="h-16" />
        <div className="space-y-4">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      </LayoutContent>
    </Layout>
  );
}
