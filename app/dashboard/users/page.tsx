import type { User } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/Layout";
import prisma from "@/lib/prisma";
import type { PageParams } from "@/types/next";

import { columns } from "./columns";
import { filters } from "./filters";

async function getData(): Promise<User[]> {
  return prisma.user.findMany();
}

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getData();
  return (
    <Layout>
      <LayoutHeader withNav>
        <LayoutTitle>Users</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <DataTable
          tableName="users"
          columns={columns}
          data={data}
          search={{ type: "users", column: "name" }}
          options={{ filters, column: "plan", name: "Plan" }}
        />
      </LayoutContent>
    </Layout>
  );
}
