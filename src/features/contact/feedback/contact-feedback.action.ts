"use server";

import { auth } from "@/lib/auth/helper";
import { sendEmail } from "@/lib/mail/sendEmail";
import prisma from "@/lib/prisma";
import { action } from "@/lib/server-actions/safe-actions";
import { SiteConfig } from "@/site-config";
import { ContactFeedbackSchema } from "./contact-feedback.schema";

export const contactSupportAction = action(
  ContactFeedbackSchema,
  async (data) => {
    const user = await auth();

    const email = user?.email ?? data.email;

    const feedback = await prisma.feedback.create({
      data: {
        message: data.message,
        review: Number(data.review) || 0,
        userId: user?.id,
        email,
      },
    });

    await sendEmail({
      from: SiteConfig.email.from,
      to: SiteConfig.email.contact,
      subject: `New feedback from ${email}`,
      text: `Review: ${feedback.review}\n\nMessage: ${feedback.message}`,
    });

    return { message: "Your feedback has been sent to support." };
  }
);
