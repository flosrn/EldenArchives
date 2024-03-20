import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import type { PageParams } from "@/types/next";

export default async function RoutePage({
  params: { id },
  searchParams,
}: PageParams<{
  id: string;
}>) {
  console.log("id : ", id);
  console.log("searchParams : ", searchParams);
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{id}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent></LayoutContent>
    </Layout>
  );
}
