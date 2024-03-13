import { createSafeActionClient } from "next-safe-action";
import { Role, type User } from "@prisma/client";

import { auth } from "../auth/helper";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type HandleReturnedServerError = (e: Error) => string;

const handleReturnedServerError: HandleReturnedServerError = (e) => {
  if (e instanceof ActionError) {
    return e.message;
  }

  return "An unexpected error occurred.";
};

const getUser = async () => {
  const user = await auth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  // In the real world, you would check if the session is valid by querying a database.
  // We'll keep it very simple here.

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

/*
 * The `action` is a safe action that verify the shape of the input provided.
 * It will throw an `ActionError` if the input is not valid.
 */
export const action = createSafeActionClient({
  handleReturnedServerError,
});

/*
 * The `authAction` is a safe action that requires the user to be logged in.
 * It will throw an `ActionError` if the user is not logged in.
 */
export const authAction = createSafeActionClient({
  handleReturnedServerError,

  async middleware() {
    const user = await getUser();

    return {
      user: user as User,
    };
  },
});

/*
 * The `adminAction` is a safe action that requires the user to be logged in and have the role of an admin.
 * It will throw an `ActionError` if the user is not logged in or if the user is not an admin.
 */
export const adminAction = createSafeActionClient({
  handleReturnedServerError,

  async middleware() {
    const user = await getUser();

    if (user.role !== Role.ADMIN) {
      throw new ActionError("You are not authorized to perform this action!");
    }

    return {
      user: user as User,
    };
  },
});
