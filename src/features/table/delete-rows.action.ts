"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";

export const deleteRowsAction = authAction(
  z.object({
    tableName: z.string(),
    ids: z.array(z.string()),
  }),
  async ({ tableName, ids }, ctx) => {
    const userId = ctx.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ActionError("You don't have an account!");
    }

    // @ts-expect-error: trust me
    const deleteMethod = prisma[tableName].deleteMany;
    try {
      await deleteMethod({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.log("error : ", error);
      throw new Error(`Failed to delete ${tableName}s`);
    }

    revalidatePath(`/admin/${tableName}s`);
  }
);
