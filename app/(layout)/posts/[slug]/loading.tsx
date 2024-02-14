import { Loader } from "@/components/ui/loader";

/**
 * This page should never be seen by the user because everything is pre-rendered.
 */
export default async function RouteLoading() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader size={32} />
    </div>
  );
}
