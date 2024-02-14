import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
import { Typography } from "../../components/ui/typography";

export function Page404() {
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="space-y-3 text-center">
        <Typography variant="code">404</Typography>
        <Typography variant="h1">Page not found</Typography>
        <Typography variant="base">
          Sorry, we couldn't find the page you're looking for.
        </Typography>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className={buttonVariants({ variant: "invert" })}>
          Go back home
        </Link>
        <ContactSupportDialog />
      </div>
    </main>
  );
}
