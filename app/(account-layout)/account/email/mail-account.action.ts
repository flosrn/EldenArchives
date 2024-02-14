"use server";

import { requiredAuth } from "@/lib/auth/helper";
import { env } from "@/lib/env";
import { resend } from "@/lib/mail/resend";
import { ActionError, authAction } from "@/lib/server-actions/safe-actions";
import { z } from "zod";

const ToggleSubscribedActionSchema = z.object({
  unsubscribed: z.boolean(),
});

export const toggleSubscribedAction = authAction(
  ToggleSubscribedActionSchema,
  async (data) => {
    const user = await requiredAuth();

    if (!user.resendContactId) {
      throw new ActionError("User has no resend contact");
    }

    if (!env.RESEND_AUDIENCE_ID) {
      throw new ActionError("RESEND_AUDIENCE_ID is not set");
    }

    const updateContact = await resend.contacts.update({
      audienceId: env.RESEND_AUDIENCE_ID,
      id: user.resendContactId,
      unsubscribed: data.unsubscribed,
    });

    return updateContact;
  }
);
