import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

/**
 * This function take a Stripe customer object and find the user in the database
 *
 * - If the user is found, it returns the user
 * - If the user is not found, it creates a new user and returns it
 *
 * @param stripeCustomer The customer object from Stripe
 * @returns a valid user from the database
 */
export const findUserFromCustomer = async (
  stripeCustomer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
) => {
  let stripeCustomerId: string;

  if (typeof stripeCustomer === "string") {
    stripeCustomerId = stripeCustomer;
  } else if (stripeCustomer) {
    stripeCustomerId = stripeCustomer.id;
  } else {
    throw new Error("Invalid customer");
  }

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        stripeCustomerId,
      },
    });
    return user;
  } catch {}

  const customer = await stripe.customers.retrieve(stripeCustomerId);
  if (customer.deleted) {
    throw new Error("Invalid customer");
  }

  const email = customer.email;
  const name = customer.name ?? undefined;

  if (!email) {
    throw new Error("Invalid customer");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      stripeCustomerId,
    },
  });

  return user;
};
