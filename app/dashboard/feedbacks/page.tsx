import type { Feedback, User } from "@prisma/client";

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
import { FeedbackInfo } from "./FeedbackInfo";
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
  return (
    <Layout>
      <LayoutHeader withNav>
        <LayoutTitle>Feedbacks</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <FeedbackInfo data={data} />
        <DataTable
          tableName="feedback"
          columns={columns}
          data={data}
          search={{ type: "feedbacks", column: "message" }}
          options={{
            filters,
            column: "review",
            name: "Review",
            hasDateFilter: true,
          }}
        />
      </LayoutContent>
    </Layout>
  );
}
