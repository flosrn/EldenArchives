import { z } from "zod";

export const ContactFeedbackSchema = z.object({
  email: z.string().optional(),
  review: z.string().optional(),
  message: z.string(),
});

export type ContactFeedbackSchemaType = z.infer<typeof ContactFeedbackSchema>;
