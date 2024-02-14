import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import Link from "next/link";

export default function SuccessPaymentPage() {
  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Thank You for Your Purchase!</LayoutTitle>
          <LayoutDescription>
            Your payment was successful! You now have full access to all our
            premium resources. If you have any questions, we're here to help.
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
}
