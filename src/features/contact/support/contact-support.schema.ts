import { z } from "zod";

export const ContactSupportSchema = z.object({
  email: z.string(),
  subject: z.string(),
  message: z.string(),
});

export type ContactSupportSchemaType = z.infer<typeof ContactSupportSchema>;
