"use server";

import prisma from "@/lib/prisma";
import { adminAction } from "@/lib/server-actions/safe-actions";

import { UserFormSchema } from "./edit-user.schema";

export const updateUserAction = adminAction(
  UserFormSchema,
  async (input, ctx) => {
    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        emailVerified: input.emailVerified ? new Date() : null,
        role: input.role,
      },
    });

    return user;
  }
);
