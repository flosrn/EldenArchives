"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";

export const deleteFeedbackAction = authAction(z.string(), async (id, ctx) => {
  const userId = ctx.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ActionError("You don't have an account!");
  }

  await prisma.feedback.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/feedbacks");
});
