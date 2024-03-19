import { HeaderBase } from "@/features/layout/HeaderBase";
import { Page404 } from "@/features/page/Page404";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Page404 />
      </div>
    </div>
  );
}
