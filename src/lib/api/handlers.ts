import { NextResponse } from "next/server";
import { auth } from "../auth/helper";
import type { HandleReturnedServerErrorFn } from "./createHandler";
import { createSafeHandler } from "./createHandler";

export class HandlerError extends Error {
  status = 400;
  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }
  }
}

const handleReturnedServerError: HandleReturnedServerErrorFn = (e) => {
  if (e instanceof HandlerError) {
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: e.status,
      },
    );
  }

  return "An unexpected error occurred.";
};

export const handler = createSafeHandler({
  handleReturnedServerError,
});

export const authHandler = createSafeHandler({
  handleReturnedServerError,

  async middleware() {
    const user = await auth();

    if (!user) {
      throw new HandlerError("Session not found!", 401);
    }

    if (!user.id || !user.email) {
      throw new HandlerError("Session is not valid!", 401);
    }

    return {
      user: user as {
        id: string;
        email: string;
        image?: string;
        name?: string;
      },
    };
  },
});
