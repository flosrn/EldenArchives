import type { User } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import prisma from "@/lib/prisma";
import type { PageParams } from "@/types/next";

import { columns } from "./columns";
import { options } from "./options";

async function getData(): Promise<User[]> {
  return prisma.user.findMany();
}

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getData();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Users</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <DataTable
          columns={columns}
          data={data}
          search={{ type: "users", column: "name" }}
          options={options}
        />
      </LayoutContent>
    </Layout>
  );
}
