import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Please provide an email address" })
    .email({ message: "Please provide a valid email address" }),
});

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
