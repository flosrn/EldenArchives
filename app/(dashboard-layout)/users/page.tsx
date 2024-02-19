import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import prisma from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import type { User } from "@prisma/client";

import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<User[]> {
  return await prisma.user.findMany();
}

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getData();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Users</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <DataTable columns={columns} data={data} />
      </LayoutContent>
    </Layout>
  );
}
