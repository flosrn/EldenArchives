"use server";

import { auth } from "@/lib/auth/helper";
import { ActionError, action } from "@/lib/server-actions/safe-actions";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const BuyButtonSchema = z.object({
  priceId: z.string(),
});

export const buyButtonAction = action(BuyButtonSchema, async (data) => {
  const { priceId } = data;

  const user = await auth();

  const stripeCustomerId = user?.stripeCustomerId ?? undefined;

  const price = await stripe.prices.retrieve(priceId);

  const priceType = price.type;

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: priceType === "one_time" ? "payment" : "subscription",
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${getServerUrl()}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getServerUrl()}/payment/cancel`,
  });

  if (!session.url) {
    throw new ActionError("Something went wrong while creating the session.");
  }

  return { url: session.url };
});
