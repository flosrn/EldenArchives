import type { Feedback } from "@prisma/client";

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

async function getData(): Promise<Feedback[]> {
  return prisma.feedback.findMany();
}

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getData();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Feedbacks</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <DataTable
          columns={columns}
          data={data}
          search={{ type: "feedbacks", column: "message" }}
        />
      </LayoutContent>
    </Layout>
  );
}
