import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import { requiredAuth } from "@/lib/auth/helper";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function DeleteProfilePage() {
  const user = await requiredAuth();

  if (!user.stripeCustomerId) {
    return (
      <Card variant="error">
        <CardHeader>
          <CardTitle>You account is not linked to a billing account</CardTitle>
          <CardDescription>
            You can't do nothing. Please contact the support.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <ContactSupportDialog />
        </CardFooter>
      </Card>
    );
  }

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${getServerUrl()}/account/billing`,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Typography>
          Plan : <Typography variant="code">{user.plan}</Typography>
        </Typography>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          href={stripeSession.url}
        >
          Update billing informations
        </Link>
      </CardContent>
    </Card>
  );
}
