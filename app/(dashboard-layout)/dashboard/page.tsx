import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-wrap items-start gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-light">
                Thread Created
              </CardTitle>
              <CardTitle>201</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-light">
                Thread Published
              </CardTitle>
              <CardTitle>177</CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg font-light">Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Link
                className={buttonVariants({ size: "sm", variant: "outline" })}
                href="/dashboard/posts/new"
              >
                New post
              </Link>
            </CardContent>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
}
