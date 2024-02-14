import { LogoSvg } from "@/components/svg/LogoSvg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeaderBase } from "@/features/layout/HeaderBase";
import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";
import { AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { getError } from "../error/auth-error-mapping";
import { SignInProviders } from "./SignInProviders";

export default async function AuthSignInPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  const user = await auth();

  if (user) {
    redirect("/account");
  }

  return (
    <div className="flex h-full flex-col">
      <HeaderBase />
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <LogoSvg />
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="mt-8">
            <SignInProviders />
          </CardContent>
          {error ? (
            <Alert>
              <AlertTriangle size={16} />
              <AlertDescription>{error}</AlertDescription>
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
