"use server";

import { sendEmail } from "@/lib/mail/sendEmail";
import { action } from "@/lib/server-actions/safe-actions";
import { SiteConfig } from "@/site-config";
import { ContactSupportSchema } from "./contact-support.schema";

export const contactSupportAction = action(
  ContactSupportSchema,
  async (data) => {
    await sendEmail({
      from: SiteConfig.email.from,
      to: SiteConfig.email.contact,
      subject: `Support needed from ${data.email} - ${data.subject}`,
      text: data.message,
    });
    return { message: "Your message has been sent to support." };
  }
);
