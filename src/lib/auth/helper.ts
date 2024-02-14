import type { User } from "@prisma/client";
import { baseAuth } from "./auth";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const auth = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const requiredAuth = async () => {
  const user = await auth();

  if (!user) {
    throw new AuthError("You must be authenticated to access this resource.");
  }

  return user;
};
