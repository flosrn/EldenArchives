import type { Feedback, User } from "@prisma/client";

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
import { filters } from "./filters";

export type FeedbackWithUser = Feedback & {
  user: User | null;
};

async function getData(): Promise<FeedbackWithUser[]> {
  return prisma.feedback.findMany({
    include: {
      user: true,
    },
  });
}

export default async function RoutePage(props: PageParams<{}>) {
  const data = await getData();
  console.log("data : ", data);
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
          options={{ filters, column: "review", name: "Review" }}
        />
      </LayoutContent>
    </Layout>
  );
}
