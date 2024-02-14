import { Header } from "@/features/layout/Header";
import { Page404 } from "@/features/page/Page404";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <Page404 />
      </div>
    </div>
  );
}
