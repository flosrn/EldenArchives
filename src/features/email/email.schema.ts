import { z } from "zod";

export const EmailActionSchema = z.object({
  email: z.string().email(),
});

export type EmailActionSchemaType = z.infer<typeof EmailActionSchema>;
