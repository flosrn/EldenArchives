"use server";

import {
  hashStringWithSalt,
  validatePassword,
} from "@/lib/auth/credentials-provider";
import { requiredAuth } from "@/lib/auth/helper";
import { env } from "@/lib/env";
import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";
import {
  EditPasswordFormSchema,
  ProfileFormSchema,
} from "./edit-profile.schema";

export const updateProfileAction = authAction(
  ProfileFormSchema,
  async (input, ctx) => {
    const previousEmail = ctx.user.email;

    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name: input.name,
        email: input.email,
        emailVerified: previousEmail === input.email ? undefined : null,
      },
    });

    return user;
  },
);

export const editPasswordAction = authAction(
  EditPasswordFormSchema,
  async (input, ctx) => {
    const user = await requiredAuth();
    const { passwordHash } = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        passwordHash: true,
      },
    });

    if (input.newPassword !== input.confirmPassword) {
      throw new ActionError("Passwords do not match");
    }

    if (
      hashStringWithSalt(input.currentPassword, env.NEXTAUTH_SECRET) !==
      passwordHash
    ) {
      throw new ActionError("Invalid current password");
    }

    if (!validatePassword(input.newPassword)) {
      throw new ActionError(
        "Invalid new password. Must be at least 8 characters, and contain at least one letter and one number",
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        passwordHash: hashStringWithSalt(
          input.newPassword,
          env.NEXTAUTH_SECRET,
        ),
      },
      select: {
        id: true,
      },
    });

    return updatedUser;
  },
);
