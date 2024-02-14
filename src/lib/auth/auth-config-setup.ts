import type { User } from "next-auth";
import { env } from "../env";
import { resend } from "../mail/resend";
import { stripe } from "../stripe";

export const setupStripeCustomer = async (user: User) => {
  if (!user.email) {
    return;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name ?? undefined,
  });

  return customer.id;
};

export const setupResendCustomer = async (user: User) => {
  if (!user.email) {
    return;
  }

  if (!env.RESEND_AUDIENCE_ID) {
    return;
  }

  const contact = await resend.contacts.create({
    audienceId: env.RESEND_AUDIENCE_ID,
    email: user.email,
    firstName: user.name ?? "",
    unsubscribed: false,
  });

  if (!contact.data) return;

  return contact.data.id;
};
