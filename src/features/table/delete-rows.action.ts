"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { ActionError, adminAction } from "@/lib/server-actions/safe-actions";

const allowedTableNames = ["feedback"];

export const deleteRowsAction = adminAction(
  z.object({
    tableName: z.string(),
    ids: z.array(z.string()),
  }),
  async ({ tableName, ids }) => {
    if (!allowedTableNames.includes(tableName)) {
      throw new ActionError("Invalid table name");
    }

    // @ts-expect-error: expected TypeScript error due to uncertainty in determining type of deleteMany method based on tableName string.
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
      throw new ActionError(`Failed to delete ${tableName}s`);
    }

    revalidatePath(`/admin/${tableName}s`);
  }
);
