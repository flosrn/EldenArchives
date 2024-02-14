import { auth } from "@/lib/auth/helper";
import { LoggedInButton, SignInButton } from "./SignInButton";

export const AuthButton = async () => {
  const user = await auth();

  if (user) {
    return <LoggedInButton user={user} />;
  }

  return <SignInButton />;
};
