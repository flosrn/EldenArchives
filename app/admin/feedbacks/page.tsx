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
import { deleteFeedbacksAction } from "./delete-feedbacks.action";
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
      <LayoutHeader>
        <LayoutTitle>Feedbacks</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <DataTable
          title="Feedbacks"
          columns={columns}
          data={data}
          search={{ type: "feedbacks", column: "message" }}
          options={{ filters, column: "review", name: "Review" }}
          onDelete={deleteFeedbacksAction}
        />
      </LayoutContent>
    </Layout>
  );
}
