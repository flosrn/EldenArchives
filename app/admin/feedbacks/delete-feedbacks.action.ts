"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";

export const deleteFeedbacksAction = authAction(
  z.array(z.string()),
  async (ids, ctx) => {
    const userId = ctx.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ActionError("You don't have an account!");
    }

    console.log("ids : ", ids);

    // await prisma.feedback.deleteMany({
    //   where: {
    //     id: {
    //       in: ids,
    //     },
    //   },
    // });

    revalidatePath("/admin/feedbacks");
  }
);
