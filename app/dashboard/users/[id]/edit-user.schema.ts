import { z } from "zod";

export const UserFormSchema = z.object({
  emailVerified: z.boolean(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
