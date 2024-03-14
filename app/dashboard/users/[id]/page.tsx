import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import prisma from "@/lib/prisma";
import type { PageParams } from "@/types/next";

const getCurrentUser = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export default async function RoutePage({
  params,
}: PageParams<{ id: string }>) {
  const user = await getCurrentUser(params.id);
  return (
    <Layout>
      <LayoutHeader withNav currentPageName={user?.name}>
        <LayoutTitle>Edit</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>{user?.name}</LayoutContent>
    </Layout>
  );
}
