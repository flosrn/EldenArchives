import { logger } from "@/lib/logger";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const StripeWebhookSchema = z.object({
  type: z.string(),
  created_at: z.string(),
  data: z.any(),
});

/**
 * Resends webhooks
 *
 * @docs How it work https://resend.com/docs/dashboard/webhooks/introduction
 * @docs Event type https://resend.com/docs/dashboard/webhooks/event-types
 */
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const event = StripeWebhookSchema.parse(body);

  switch (event.type) {
    case "email.complained":
      logger.warn("Email complained", event.data);
      break;
    case "email.bounced":
      logger.warn("Email bounced", event.data);
      break;
  }

  NextResponse.redirect("");
  return NextResponse.json({
    ok: true,
  });
};
