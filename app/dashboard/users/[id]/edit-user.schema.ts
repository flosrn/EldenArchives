import { z } from "zod";

export const UserFormSchema = z.object({
  emailVerified: z.date().nullable(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
