"use server";

import { sendEmail } from "@/lib/mail/sendEmail";
import prisma from "@/lib/prisma";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";
import { stripe } from "@/lib/stripe";
import { SiteConfig } from "@/site-config";
import { z } from "zod";
import DeleteAccountEmail from "../../../../emails/DeleteAccountEmail";

export const deleteAccountAction = authAction(z.any(), async (_, ctx) => {
  const userId = ctx.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ActionError("You don't have an account!");
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  if (user.stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
    });

    for (const subscription of subscriptions.data) {
      await stripe.subscriptions.cancel(subscription.id);
    }

    await stripe.customers.del(user.stripeCustomerId);
  }

  await sendEmail({
    from: SiteConfig.email.from,
    subject: "Your account has been deleted",
    to: user.email,
    react: DeleteAccountEmail({
      email: user.email,
    }),
  });
});
