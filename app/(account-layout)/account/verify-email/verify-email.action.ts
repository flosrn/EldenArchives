"use server";

import { sendEmail } from "@/lib/mail/sendEmail";
import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";
import { getServerUrl } from "@/lib/server-url";
import VerifyEmail from "@email/VerifyEmail";
import { nanoid } from "nanoid";
import { z } from "zod";

export const createVerifyEmailAction = authAction(
  z.string(),
  async (_, { user }) => {
    if (user.emailVerified) {
      throw new ActionError("Email is already verified");
    }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        token: nanoid(32),
      },
    });

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      react: VerifyEmail({
        url: `${getServerUrl()}/account/verify-email?token=${
          verificationToken.token
        }`,
      }),
    });
  }
);
